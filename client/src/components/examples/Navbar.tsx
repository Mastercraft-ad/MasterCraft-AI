import { Navbar } from "../Navbar";
import { ThemeProvider } from "../ThemeProvider";
import { Router } from "wouter";

export default function NavbarExample() {
  return (
    <ThemeProvider>
      <Router>
        <Navbar />
        <div className="p-8">
          <p className="text-muted-foreground">Navigation bar is displayed above. Try the mobile menu by resizing the window.</p>
        </div>
      </Router>
    </ThemeProvider>
  );
}
