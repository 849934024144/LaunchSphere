import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import First from './components/index.jsx';
import Header from './components/ui/Header.jsx';
import Footer from './components/ui/footer.jsx';
import SignUp from './components/costom/SignUp.jsx';
import Profile from './components/menu/profile.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ThemeProvider } from "next-themes"; // Import ThemeProvider for theme handling
import Chat from './components/menu/chat.jsx';
import CanvasCursor from './components/ui/canvas-cursor-effect.tsx'; // Import your custom cursor component

// Define the routes for your app
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/first',
    element: <First />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '/profile',
    element: <Profile />,
  },
  {
    path: '/chat',
    element: <Chat />,
  }
]);

createRoot(document.getElementById('root')).render(
 
  <>
  
  <StrictMode>
    {/* Wrap everything in the Google OAuth Provider */}
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      {/* Optionally, wrap with ThemeProvider for dark/light mode */}
      <ThemeProvider attribute="class">
        {/* Header will be displayed across pages */}
        <Header />
        <CanvasCursor />
        
        {/* Main router provider that will render the correct component */}
        <RouterProvider router={router} />
        <Footer />
      </ThemeProvider>
    </GoogleOAuthProvider>
  </StrictMode>
  </>
);
