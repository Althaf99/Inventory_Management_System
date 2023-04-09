export default class ApiCallError extends Error {
  constructor(message, statusCode, serviceCode) {
    super(message);

    this.name = 'ApiCallError';
    this.statusCode = statusCode;
    this.code = serviceCode;

    Error(this, this.constructor);
  }
}
