import { ThemeProvider } from "../../components/ThemeProvider";
import { Router } from "wouter";
import Home from "../Home";

export default function HomeExample() {
  return (
    <ThemeProvider>
      <Router>
        <Home />
      </Router>
    </ThemeProvider>
  );
}
