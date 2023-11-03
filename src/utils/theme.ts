import { extendTheme } from "@chakra-ui/react";

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px)",
  color: "blue.300",
};
const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};
export const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        color: "gray.600",
        lineHeight: "tall",
        bg: "secondary.100",
        // position:'relative',
        height: "100%",
        // bg: "transparent",
        // overflow: 'scroll',
      },
    },
  },

  colors: {
    primary: {
      50: "#E6F0FE",
      100: "#31A7E1",
      200: "#2c2e7e",
      300: "#1B76D2",
      // ...
      900: "#1a202c",
    },
    secondary: {
      100: "#F7F8FC",
    },
    muted: {
      100: "#CFCFCF",
      200: "#797979",
    },
    tabActive: {
      100: "#EF8F41",
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
});
