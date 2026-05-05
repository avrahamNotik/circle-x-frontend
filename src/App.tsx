import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const DashBoard = lazy(() => import('./layout/DashBoard'))
const HomePage = lazy(() => import('./home/HomePage'))

function App() {

  const queyClient = new QueryClient()
  return (
    <QueryClientProvider client={queyClient}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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

  )
}

export default App
