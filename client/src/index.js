import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {
  Transactions,
  Dashboard,
  Settings,
  SignIn,
  SignUp,
  ErrorPage,
  HomePage,
  AddTransaction
} from "./components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App, { loader as rootLoader } from "./App";
import "./index.css";

const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    ),
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "transactions/new",
        element: <AddTransaction />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "signin",
    element: <SignIn />,
  },
]);

ReactDOM.createRoot(container).render(<RouterProvider router={router} />);
