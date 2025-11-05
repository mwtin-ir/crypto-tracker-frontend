import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";
import "./styles/fonts.css";
import React from "react";
import { ThemeProvider } from "./utils/Context/ThemeProvider";
import { CoinsProvider } from "./utils/Context/getAllCoinProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./utils/Context/UserProvider";
import ToasterPopUp from "./components/Toaster";

function App() {
  return (
    <BrowserRouter>
      <UserProvider> 
        <CoinsProvider>
          <ThemeProvider>
            <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_AUTH_CLIENTID}>
              <ToasterPopUp/>
              <Routes />
            </GoogleOAuthProvider>
          </ThemeProvider>
        </CoinsProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
