import { useState, createContext, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { getNewsPosts, getPosts } from "./dbFunctions";
import router from "./router";

// Create a context for the states
export const AppContext = createContext();

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [posts, setPosts] = useState([]);
  const [newsPosts, setNewsPosts] = useState([]);
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

    getNewsPosts()
      .then((newsPosts) => {
        setNewsPosts(newsPosts.data);
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
    userData,
    setUserData,
    newsPosts,
    setNewsPosts,
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
