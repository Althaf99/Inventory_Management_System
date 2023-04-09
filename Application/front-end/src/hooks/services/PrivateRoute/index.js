import { Route, Navigate, useLocation } from "react-router-dom";

import { ErrorBoundry } from "react-error-boundary";

import ErrorFallback from "../../../components/ErrorFallback";

import { ROUTE_DASHBOARD } from "../../../constants";

const PrivateRoute = ({ component, path, exact = false, ...rest }) => {
  const location = useLocation;

  return (
    <Route
      path={path}
      exact={exact}
      {...rest}
      render={(props) =>
        location ? (
          <ErrorBoundry FallbackComponent={ErrorFallback} resetKeys={[path]}>
            <component {...props} />
          </ErrorBoundry>
        ) : (
          <Navigate
            to={{ pathname: ROUTE_DASHBOARD, state: { from: location } }}
          />
        )
      }
    ></Route>
  );
};
export default PrivateRoute;
