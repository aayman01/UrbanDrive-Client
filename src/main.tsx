import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Router.tsx'

import {
  QueryClient,
  QueryClientProvider,

} from '@tanstack/react-query'
import AuthProvider from './AuthProvider/AuthProvider.tsx'
// import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        {/* <Toaster /> */}
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
)
