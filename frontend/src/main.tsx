import React from "react";
import { RouterProvider } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import './index.css'
import router from "./routers/router";
import { AuthProvider } from "./context/auth-context";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
