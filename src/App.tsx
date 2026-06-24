import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSocketStore } from "./store/socketStore";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";
import { LoadingSircle } from "./utils/commonCss";

const DashBoard = lazy(() => import("./layout/DashBoard"));
const HomePage = lazy(() => import("./home/HomePage"));

const queyClient = new QueryClient();

function App() {
  const connect = useSocketStore((s) => s.connect);
  const disconnect = useSocketStore((s) => s.disconnect);

  const theme = createTheme();
  useEffect(() => {
    connect();
    return () => disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
        <QueryClientProvider client={queyClient}>
          <ToastContainer />
          <BrowserRouter>
            <Suspense fallback={<LoadingSircle>loading</LoadingSircle>}>
              <Routes>
                <Route path="" element={<Navigate to="circle-x" replace />} />
                <Route path="circle-x" element={<DashBoard />}>
                  <Route index element={<Navigate to="home" replace />} />
                  <Route path="home" element={<HomePage />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}

export default App;
