import { useState, createContext, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { getPosts, getEvents } from "./dbFunctions";
import router from "./router";

// Create a context for the states
export const AppContext = createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({});

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

  const contextValue = {
    loggedIn,
    setLoggedIn,
    posts,
    setPosts,
    refreshFeed,
    events,
    setEvents,
    refreshEventList,
    userData,
    setUserData,
  };

  return (
    <ChakraProvider>
      {/* Provide the states through the context */}
      <AppContext.Provider value={contextValue}>
        <RouterProvider router={router} />
      </AppContext.Provider>
    </ChakraProvider>
  );
};

export default App;
