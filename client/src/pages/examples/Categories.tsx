import { ThemeProvider } from "../../components/ThemeProvider";
import { Router } from "wouter";
import Categories from "../Categories";

export default function CategoriesExample() {
  return (
    <ThemeProvider>
      <Router>
        <Categories />
      </Router>
    </ThemeProvider>
  );
}
