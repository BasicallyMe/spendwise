import ReactDOM from "react-dom/client";
import { createBrowserRouter, redirect, RouterProvider } from "react-router-dom";
import { Transactions, Dashboard, Settings, SignIn, SignUp, ErrorPage, HomePage } from "./components";
import { checkLoggedIn, checkRegistered } from "./core/container";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      if (!checkRegistered()) {
        return redirect('/register');
      }
      if (!checkLoggedIn()) {
        return redirect('/signin');
      }
    },
    children: [
      {
        index: true, element: <HomePage />
      },
      {
        path: 'settings',
        element: <Settings />
      }, 
      {
        path: "transactions",
        element: <Transactions />
      },
      {
        path: "dashboard",
        element: <Dashboard />
      }
    ],
    errorElement: <ErrorPage />
  },
  {
    path: "register",
    element: <SignUp />
  },
  {
    path: "signin",
    element: <SignIn />
  }
])

ReactDOM.createRoot(container).render(
  <RouterProvider router={router} />
);
