import { useState, createContext, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getPosts, getEvents } from "./dbFunctions";
import MainPage from "./routes/MainPage";
import Root from "./routes/Root";
import Events from "./routes/Events";
import News from "./routes/News";
import Settings from "./routes/Settings";
import GearShare from "./routes/GearShare";
import ErrorPage from "./ErrorPage";
import Fitness from "./routes/Fitness";

// Create a context for the states
export const AppContext = createContext();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/events",
        element: <Events />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/gearShare",
        element: <GearShare />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/fitness",
        element: <Fitness />,
      },
    ],
  },
]);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [followingPosts, setFollowingPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({});
  const [exercisesDone, setExercisesDone] = useState(0);

  const refreshFeed = () => {
    getPosts()
      .then((posts) => {
        setPosts(posts.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    getEvents()
      .then((events) => {
        setEvents(events.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const refreshFollowingFeed = () => {
    setFollowingPosts(
      posts.filter((post) =>
        userData.subscribingTo.includes(post.user.username)
      )
    );
  };
  const refreshEventList = () => {
    getEvents()
      .then((events) => {
        setEvents(events.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    refreshFeed();
  }, []);
  return (
    <ChakraProvider>
      {/* Provide the states through the context */}
      <AppContext.Provider
        value={{
          loggedIn,
          setLoggedIn,
          posts,
          setPosts,
          refreshFeed,
          followingPosts,
          setFollowingPosts,
          refreshFollowingFeed,
          events,
          setEvents,
          refreshEventList,
          userData,
          setUserData,
          exercisesDone,
          setExercisesDone,
        }}
      >
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
