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
import { Toaster } from "react-hot-toast";
import { I18nextProvider } from "react-i18next";
import i18n from './utils/i18n.ts'



const queryClient = new QueryClient()
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <RouterProvider router={router} />
        </I18nextProvider>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
