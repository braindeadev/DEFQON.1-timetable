import React from "react";
import Timetable from "./assets/components/Timetable";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#1e1e1e", paper: "#2c2c2c" },
    text: { primary: "#e0e0e0", secondary: "#aaa" },
    primary: { main: "#90caf9" },
  },
  typography: {
    fontFamily: "'Orbitron', sans-serif",

  },
});


function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Timetable />
    </ThemeProvider>
  );
}

export default App;