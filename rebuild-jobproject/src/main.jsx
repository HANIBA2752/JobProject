import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Rootlayout from "./rootlayout/Rootlayout.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Learn from "./pages/Learn.jsx";
import Position from "./pages/Position.jsx";
import About from "./pages/About.jsx";
import PosDetail from "./pages/Pos-Detail.jsx";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    element: <Rootlayout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/learn",
        element: <Learn />,
      },
      {
        path: "/position/comeng",
        element: <Position />,
      },
      {
        path: "/position-info/:id",
        element: <PosDetail />,
      },
      
      {
        path: "/community",
        element: <Position />,
      },
      {
        path: "/contact",
        element: <About />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
