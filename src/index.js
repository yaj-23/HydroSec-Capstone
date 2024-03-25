import React from 'react';
import ReactDOM from 'react-dom/client';

import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import { AuthContextProvider } from "./UserSession";

import './index.css';
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Homepage from './pages/homepage';
import Dashboard from './pages/dashboard';
import About from './pages/about';
import Admin from './pages/admin';
import QRAuth from './pages/qrauth';
import ClientSettings from './pages/settings';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/qrauth",
      element: <QRAuth/>
    },
    {
      path: "/settings",
      element: <ClientSettings />
    }
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);

