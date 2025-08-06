import React from "react";
import AppProvider from "./hooks";

import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

const App: React.FC = () => (
  <BrowserRouter basename="/">
    <AppProvider>
      <Toaster richColors theme="light" />
      <AppRoutes />
    </AppProvider>
  </BrowserRouter>
);

export default App;
