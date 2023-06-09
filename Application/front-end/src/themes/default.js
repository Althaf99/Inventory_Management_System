// import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const randoliBlue = "rgba(0, 24, 71, 1)"; // HEX - #001847
const randoliBlue2 = "rgba(15, 94, 247, 1)"; // HEX - #0f5ef7
// const randoliBlue3 = 'rgba(65, 152, 253, 1)';
const randoliBlue4 = "rgba(181, 189, 233, 1)"; // HEX - #b5bde9
const randoliAsh = "rgba(128, 140, 163, 1)"; // HEX - #808ca3

const ThemeDefault = createTheme({
  MuiDrawer: {
    paper: {
      width: "500px",
    },
  },
  MuiStepIcon: {
    root: {
      color: "#CDCFD5 !important",
    },
    active: {
      color: "#0F5EF7 !important",
    },
    completed: {
      color: "#36C994 !important",
    },
  },
  MuiAccordion: {
    root: {
      boxShadow: `0px 1px 8px 0px rgba(20, 46, 110, 0.1)`,
      borderRadius: "8px !important",
    },
  },
  MuiTab: {
    root: {
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "15px",
      lineHeight: "20px",
      paddingLeft: "0",
      // marginLeft: '40px',
      paddingRight: "0",
      // marginRight: '40px',
      color: `${randoliAsh} !important`,
      textTransform: "none",
      "&:hover": {
        color: `${randoliBlue2} !important`,
      },
      "&.Mui-selected": {
        color: `${randoliBlue2} !important`,
      },
    },
  },
  // .MuiSwitch-colorSecondary.Mui-checked
  MuiSwitch: {
    root: {
      color: `${randoliBlue4}`,
    },
    colorSecondary: {
      "&$checked": {
        color: `${randoliBlue2}`,
        "& + $track": {
          backgroundColor: `${randoliBlue2}`,
        },
      },
    },
  },
  MuiOutlinedInput: {
    input: {
      padding: "10.5px 14px",
    },
    notchedOutline: {
      borderColor: `${randoliBlue4}`,
    },
  },
  MuiCheckbox: {
    root: {
      color: `${randoliBlue4}`,
    },
    colorSecondary: {
      "&$checked": {
        color: `${randoliBlue2}`,
      },
    },
  },
  // MuiButton: {
  //   root: {
  //     minWidth: "166px",
  //     height: "40px",
  //     borderRadius: "4px",
  //     textTransform: "uppercase",
  //     "&:hover": {
  //       backgroundColor: `${randoliBlue2}`,
  //     },
  //   },
  //   contained: {
  //     fontFamily: "Nunito",
  //     fontStyle: "normal",
  //     fontWeight: "bold",
  //     fontSize: "14px",
  //     color: "white",
  //     backgroundColor: `${randoliBlue2}`,
  //   },
  // },
  MuiAccordionSummary: {
    root: {
      "&.Mui-expanded": {
        height: "65px",
        minHeight: "0px",
      },
    },
  },
  MuiFormHelperText: {
    contained: {
      margin: "0px !important",
    },
  },
  MuiTableRow: {
    root: {
      border: "1px solid transparent",
      "&.Mui-selected": {
        backgroundColor: "rgba(25, 118, 210, 0.25)",
        "&:hover": {
          backgroundColor: "rgba(25, 118, 210, 0.25) !important",
        },
      },
    },
    hover: {
      "&:hover": {
        backgroundColor: "white !important",
        border: `1px solid ${randoliBlue2}`,
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 768, //tab
      md: 1024, // laptop small
      lg: 1700, // laptop large
      xl: 2200, // high res large screens
      tablet: 768,
      laptop: 1024,
      desktop: 1366,
      dekstopL: 1920,
    },
  },
  props: {
    MuiTabs: {
      TabIndicatorProps: {
        style: { backgroundColor: `${randoliBlue2}` },
      },
    },
    MuiCheckbox: {
      disableFocusRipple: true,
      disableRipple: true,
    },
    MuiButton: {
      variant: "contained",
      disableFocusRipple: true,
      disableElevation: true,
      disableRipple: true,
    },
  },
  palette: {
    common: {
      blue: `${randoliBlue}`,
    },
    primary: {
      light: `${randoliBlue4}`,
      main: `${randoliBlue}`,
    },
    background: {
      default: "white",
    },
    grey: {
      650: `${randoliAsh}`,
    },
    divider: `${randoliBlue4}`,
  },
  typography: {
    fontFamily: ["Nunito", "Lato", "sans-serif", "Comfortaa", "cursive"].join(
      ","
    ),
  },
  mixins: {
    toolbar: {
      minHeight: "59px",
    },
  },
  appDirector: {
    appContainer: {
      paddingLeft: "40px",
      paddingRight: "40px",
    },
    drawer: {
      openWidth: "275px",
      closeWidth: "0px",
    },
    label: {
      color: randoliBlue,
      fontFamily: "Nunito",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "0.875rem",
      paddingBottom: "14px",
    },
    pageHeading: {
      fontWeight: "600",
      fontStyle: "normal",
      fontSize: "30px",
      lineHeight: "41px",
    },
    required: {
      color: "red",
    },
  },
});

export default ThemeDefault;
