import { ThemeProvider } from "../../components/ThemeProvider";
import { Router } from "wouter";
import SubmitTool from "../SubmitTool";

export default function SubmitToolExample() {
  return (
    <ThemeProvider>
      <Router>
        <SubmitTool />
      </Router>
    </ThemeProvider>
  );
}
