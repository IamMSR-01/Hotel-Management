import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AppProvider>
          <App />
        </AppProvider>
      </ClerkProvider>
    </BrowserRouter>
  </React.StrictMode>
);
