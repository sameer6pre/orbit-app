import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider, } from 'react-query'
import App from "./App.jsx";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3600000, // 1 hour in milliseconds
      retry: 0, // Number of retries on failed queries
    }
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider >
  // </React.StrictMode>,
);
