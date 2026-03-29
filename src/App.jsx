import React from "react";
import Timetable from "./components/timetable/Timetable";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#0A0000", paper: "#100404" },
    text: { primary: "#D4B483", secondary: "#9A7B4A" },
    primary: { main: "#C0192A" },
  },
  typography: {
    fontFamily: "'Bebas Neue', 'Anton', sans-serif",
  },
});

function App() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Anton&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Timetable />
      </ThemeProvider>
    </>
  );
}

export default App;
