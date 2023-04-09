/* eslint-disable require-await */
import merge from "lodash-es/merge";
import cuid from "cuid";

import ApiCallError from "./errors/apiCallError";
import ApiTimeoutError from "./errors/apiTimeoutError";
import defaultConfig from "./defaultConfig";

const executeMethod = Symbol("execute");
const baseConfig = Symbol("baseConfig");

// let appStore;

// export const apiService = (store) => {
//   appStore = store;
// };

const handleServerErrors = (data, reject, status, statusText) => {
  const { info: { code } = {} } = data;
  if (code) {
    reject(new ApiCallError(data.info.message, status, code));
  }

  reject(new ApiCallError(statusText, status));
};

/**
 * Internal execute fetch call.
 *
 * @function
 * @param {Integer} timeout Request timeout value.
 * @param {Request} request Fetch Request param.
 * @returns {Promise<Response>} Fetch result.
 */
export const execute = async (timeout, request) =>
  new Promise((resolve, reject) => {
    let timeoutId = undefined;

    const timer = new Promise((resolve) => {
      timeoutId = setTimeout(resolve, timeout, {
        timeout: true,
      });
    });

    Promise.race([timer, window.fetch(request)])
      .then((response) => {
        clearTimeout(timeoutId);

        if (response.timeout) {
          return reject(new ApiTimeoutError("Timed Out Executing Api Call"));
        }

        if (!response.ok) {
          const { statusText, status } = response;

          if (503 === status || 500 === status) {
            return response.json().then((data) => {
              handleServerErrors(data, reject, status, statusText);
            });
          }

          return reject(new ApiCallError(statusText, status));
        }

        resolve(response);
      })
      .catch((error) => {
        clearTimeout(timeoutId);

        reject(error);
      });
  });

export const getCsrfToken = () =>
  localStorage.getItem("RANDOLI_APP_DIRECTOR_STATEFUL");

export const getAuthorizationToken = () =>
  `Bearer ${localStorage.getItem("RANDOLI_USER_ACCESS_TOKEN")}`;

export const generateMandatoryHeaders = () => {
  const { userAgent } = window.navigator;

  const mandatoryHeaders = {
    headers: {
      Authorization: getAuthorizationToken(),
      "randoli-correlation-id": cuid(),
      "randoli-requested-at": Date.now(),
      "randoli-requested-by": getCsrfToken(),
      "randoli-requested-id": "appdirector",
    },
  };

  // if user agent is IE --> disable cache
  if (userAgent.includes("MSIE") || userAgent.includes("Trident")) {
    mandatoryHeaders.headers.Expires = 0;
    mandatoryHeaders.headers.Pragma = "no-cache";
    mandatoryHeaders.headers["Cache-Control"] =
      "no-cache, no-store, must-revalidate";
  }

  return mandatoryHeaders;
};

const Api = class {
  constructor(base) {
    this[baseConfig] = base;
    this[executeMethod] = async (timeout, request) => {
      return execute(timeout, request);
    };

    this.invoke = async (method, url, data, config = {}) => {
      const options = merge(
        { method, body: data },
        this[baseConfig],
        config,
        generateMandatoryHeaders()
      );

      delete options["baseUrl"];
      delete options.headers["Authorization"];

      const request = new Request(url, options);

      const timeout = config.timeout || this[baseConfig].timeout;
      return this[executeMethod](timeout, request);
    };

    ["delete", "get", "head", "options"].forEach((method) => {
      this[method] = async (url, config = {}) => {
        const options = merge(
          { method: method.toUpperCase() },
          this[baseConfig],
          config,
          generateMandatoryHeaders()
        );

        const request = new Request(
          `${this[baseConfig].baseUrl}/${url}`,
          options
        );

        const timeout = config.timeout || this[baseConfig].timeout;

        return this[executeMethod](timeout, request);
      };
    });

    ["post", "put", "patch"].forEach((method) => {
      this[method] = async (url, data, config = {}) => {
        const options = merge(
          { method: method.toUpperCase(), body: data },
          this[baseConfig],
          config,
          generateMandatoryHeaders()
        );

        const request = new Request(
          `${this[baseConfig].baseUrl}/${url}`,
          options
        );

        const timeout = config.timeout || this[baseConfig].timeout;
        return this[executeMethod](timeout, request);
      };
    });

    this.upload = async (url, data, config = {}) => {
      // TODO Support for other methods such as PUT
      const method = "POST";

      // Remove content-type: Application/json such that browser will append multiparty/form-data with the boundary
      const { headers, ...rest } = this[baseConfig];
      const options = merge(
        { method, body: data },
        rest,
        config,
        generateMandatoryHeaders()
      );

      const request = new Request(
        `${this[baseConfig].baseUrl}/${url}`,
        options
      );

      const timeout = config.timeout || this[baseConfig].timeout;
      return this[executeMethod](timeout, request);
    };
  }
};

export default new Api(defaultConfig);
