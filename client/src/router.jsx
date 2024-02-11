import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage";
import Root from "./routes/Root";
import Events from "./routes/Events";
import News from "./routes/News";
import Settings from "./routes/Settings";
import GearShare from "./routes/GearShare";
import ErrorPage from "./ErrorPage";
import Fitness from "./routes/Fitness";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/events", element: <Events /> },
      { path: "/news", element: <News /> },
      { path: "/gearShare", element: <GearShare /> },
      { path: "/settings", element: <Settings /> },
      { path: "/fitness", element: <Fitness /> },
    ],
  },
]);

export default router;
