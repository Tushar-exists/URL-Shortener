// URL-SHORTENER/src/App.jsx
import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import UrlProvider from "./context";

import AppLayout from "./layouts/app-layout";
import RequireAuth from "./components/require-auth";

import RedirectLink from "./pages/redirect-link";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import LinkPage from "./pages/link";
import Auth from "./pages/auth";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/dashboard",
        element: (
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        ),
      },
      {
        path: "/link/:id",
        element: (
          <RequireAuth>
            <LinkPage />
          </RequireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);

function App() {
  useEffect(() => {
    // Explicitly add the 'dark' class to the html element to activate dark mode
    document.documentElement.classList.add('dark');
    // Also, apply the background and font directly to the body for maximum specificity
    // This is a fallback to ensure the dark background and Geist font are applied
    document.body.style.backgroundColor = 'oklch(0.064 0 0)'; // Directly set dark background
    document.body.style.color = 'oklch(0.985 0 0)'; // Directly set light foreground
    document.body.style.fontFamily = 'Geist, sans-serif'; // Directly set Geist font

    // Clean up function to remove direct styles if component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <UrlProvider>
      {/* Remove bg-background text-foreground font-sans from here as it's now handled by direct body styles */}
      <div className="min-h-screen">
        <RouterProvider router={router} />
      </div>
    </UrlProvider>
  );
}

export default App;
