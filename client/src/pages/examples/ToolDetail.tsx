import { ThemeProvider } from "../../components/ThemeProvider";
import { Router } from "wouter";
import ToolDetail from "../ToolDetail";

export default function ToolDetailExample() {
  return (
    <ThemeProvider>
      <Router>
        <ToolDetail />
      </Router>
    </ThemeProvider>
  );
}
