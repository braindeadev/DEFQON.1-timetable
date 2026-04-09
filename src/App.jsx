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
    fontSize: 12, // Pienempi oletuskoko
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Timetable />
      </ThemeProvider>
    </>
  );
}



export default App;