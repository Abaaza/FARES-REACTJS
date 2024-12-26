import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#fff", // Set your background color here
        color: "white", // Optional: set default text color
      },
    },
  },
});

export default theme;
