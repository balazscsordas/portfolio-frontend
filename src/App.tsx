import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutMePage from "./pages/AboutMePage";
import WeatherAppPage from "./pages/WeatherAppPage";
import CosmeticsWebsitePage from "./pages/CosmeticsWebsitePage";
import NoteCollectorPage from "./pages/NoteCollectorPage";
import AuthenticationPage from "./pages/AuthenticationPage";
import TrainerAppPage from "./pages/TrainerAppPage";
import GamePage from "./pages/GamePage";
import RequireAuth from './components/RequireAuth';
import { AuthProvider } from './context/AuthProvider';
import { ThemeProvider } from './context/ThemeProvider';
import axios from 'axios';
import { useEffect } from "react";

const App: React.FC = () => {

  useEffect(() => {
    sendFirstRequest();
  }, []);


  const sendFirstRequest = async () => {
      try {
          const url = process.env.REACT_APP_BASEURL + "/api/server-start-request";
          const response = await axios.get(url);
          console.log(response.data.message);
      }
      catch (err) {
          console.log(err);
      }
  }

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/about-me" element={<AboutMePage />} />
              <Route path="/weather-app" element={<WeatherAppPage />} />
              <Route path="/cosmetics-website" element={<CosmeticsWebsitePage />} />
              <Route path="/note-collector" element={<NoteCollectorPage />} />
              <Route path="/authentication" element={<AuthenticationPage />} />
              <Route path="/trainer-app" element={<TrainerAppPage/>}/>

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
