import { AppRouter } from "../AppRouter";
import { RouterProvider } from "react-router-dom";
import ThemeDefault from "../../themes/default";
import "react-datepicker/dist/react-datepicker.css";

import { ThemeProvider, CssBaseline, Grid } from "@material-ui/core";

const App = () => {
  const router = AppRouter();
  return (
    <ThemeProvider theme={ThemeDefault}>
      <CssBaseline />
      <RouterProvider router={router.router} />
    </ThemeProvider>
  );
};

export default App;
