import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutMePage from "./pages/AboutMePage";
import CalculatorPage from "./pages/CalculatorPage";
import WeatherAppPage from "./pages/WeatherAppPage";
import CosmeticsWebsitePage from "./pages/CosmeticsWebsitePage";
import ToDoAppPage from "./pages/ToDoAppPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import GamePage from "./pages/GamePage";
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about-me" element={<AboutMePage />} />
              <Route path="/calculator" element={<CalculatorPage />} />
              <Route path="/weather-app" element={<WeatherAppPage />} />
              <Route path="/cosmetics-website" element={<CosmeticsWebsitePage />} />
              <Route path="/to-do-app" element={<ToDoAppPage />} />
              <Route path="/authentication" element={<AuthenticationPage />} />

              <Route element={<RequireAuth />}>
                <Route path="/game" element={<GamePage />} />
              </Route>
            </Route>
          </Routes>        
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
