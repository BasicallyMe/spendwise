import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Transactions, Dashboard, SignIn, SignUp } from "./components";
import App from "./App";
import "./index.css";

const container = document.getElementById("root");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(<App tab="home" />);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
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
