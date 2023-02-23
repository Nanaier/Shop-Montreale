import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Navigation from "../Navigation/Navigation";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});
export default function ToggleColorMode() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Navigation />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
