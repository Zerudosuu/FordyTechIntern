import * as React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// to create a routing system, we need to install react-router-dom and import it into the main so that it can be used in the application.
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentRecord from "./components/StudentRecord.jsx";
import StudentList from "./components/StudentList.jsx";

const router = createBrowserRouter([
  {
    // this route is used to get all the students in the collection
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <StudentList />,
      },
    ],
  },
  {
    // this route is responsible for editing the student record
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <StudentRecord />,
      },
    ],
  },
  {
    // this route is responsible for creating a new student record
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <StudentRecord />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
