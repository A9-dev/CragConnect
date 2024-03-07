import { createBrowserRouter } from "react-router-dom";
import MainPage from "./routes/MainPage";
import Root from "./routes/Root";
import Events from "./routes/Events";
import News from "./routes/News";
import Settings from "./routes/Settings";
import ParnterFind from "./routes/PartnerFind";
import ErrorPage from "./routes/ErrorPage";
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
      { path: "/partnerFind", element: <ParnterFind /> },
      { path: "/settings", element: <Settings /> },
      { path: "/fitness", element: <Fitness /> },
    ],
  },
]);

export default router;
