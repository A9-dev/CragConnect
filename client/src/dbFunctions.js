import axios from "axios";

// Sends login request to server
const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    // console.log(response.data);
    //     console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends registration request to server
const uploadUser = async (username, password, orgBool, fullName) => {
  try {
    const response = await axios.post("http://localhost:5000/register", {
      username,
      password,
      organisation: orgBool,
      fullName,
    });
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Fetches posts from server
const getPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/posts");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends post to server
const uploadPost = async (username, title, content) => {
  try {
    const response = await axios.post("http://localhost:5000/posts", {
      title,
      content,
      username,
    });
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Fetches news posts from server
const getNewsPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/newsPosts");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends news post to server
const uploadNewsPost = async (username, title, content) => {
  try {
    const response = await axios.post("http://localhost:5000/newsPosts", {
      title,
      content,
      username,
    });
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends subscription request to server
const subscribe = async (subscriberUsername, subscribeeUsername) => {
  try {
    const response = await axios.post("http://localhost:5000/subscriptions", {
      username: subscriberUsername,
      subscription: subscribeeUsername,
    });
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends unsubscription request to server
const unsubscribe = async (subscriberUsername, subscribeeUsername) => {
  try {
    const response = await axios.delete("http://localhost:5000/subscriptions", {
      data: {
        username: subscriberUsername,
        subscription: subscribeeUsername,
      },
    });
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
    throw error.response.data.message;
  }
};

// Sends search request to server
const searchUser = async (searchTerm) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/search/" + searchTerm
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.error("Error:", error);
  }
};

// Sends event post request to server
const postEvent = async (
  username,
  eventTitle,
  eventDescription,
  address,
  postcode,
  phoneNumber,
  dateAndTime
) => {
  try {
    const eventData = {
      username,
      eventTitle,
      eventDescription,
      address,
      postcode,
      phoneNumber,
      dateAndTime,
    };

    // Remove empty string properties from eventData
    Object.keys(eventData).forEach((key) => {
      if (eventData[key] === "") {
        delete eventData[key];
      }
    });

    const response = await axios.post(
      "http://localhost:5000/events",
      eventData
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Fetches events from server
const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:5000/events");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Deletes post from server
const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/posts/" + postId
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Fetches user data from server
const getUserData = async (username) => {
  try {
    const response = await axios.get("http://localhost:5000/user/" + username);
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Updates user data on server
const updateUserData = async (userData) => {
  // console.log("From update user data:", userData);
  try {
    const response = await axios.put(
      "http://localhost:5000/user/" + userData.username,

      {
        data: userData,
      }
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Increases user's fitness score on server
const increaseFitnessScore = async (username) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/fitnessScore/" + username
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Fetches top ten fitness scores from server
const getTopTenFitnessScores = async () => {
  try {
    const response = await axios.get("http://localhost:5000/fitnessScores/10");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

// Resets user's exercises done on server
const resetExercisesDone = async (username) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/resetExercisesDone/" + username
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Sets user's exercises done on server
const setExercisesDoneDB = async (username, exercisesDone) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/setExercisesDone/" + username,
      {
        exercisesDone,
      }
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Adds like to post on server
const addLikeToPost = async (postId, userId) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/posts/like/" + postId,
      {
        userId,
      }
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Deletes like from post on server
const deleteLikeFromPost = async (postId, userId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/posts/like/" + postId,
      {
        data: {
          userId,
        },
      }
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Adds comment to post on server
const addCommentToPost = async (postId, userId, comment) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/posts/comment/" + postId,
      {
        userId,
        comment,
      }
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Deletes comment from post on server
const deleteCommentFromPost = async (postId, commentId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/posts/" + postId + "/comment/" + commentId
    );
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

// Deletes test posts from server
const deleteTestPosts = async () => {
  try {
    const response = await axios.delete("http://localhost:5000/testPosts");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/events/" + eventId
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const getPartnerFindEntries = async () => {
  try {
    const response = await axios.get("http://localhost:5000/partnerEntry");
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const createPartnerFindEntry = async (entry) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/partnerEntry",
      entry
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

export {
  loginUser,
  uploadUser,
  getPosts,
  uploadPost,
  getNewsPosts,
  uploadNewsPost,
  subscribe,
  unsubscribe,
  searchUser,
  postEvent,
  getEvents,
  deletePost,
  getUserData,
  updateUserData,
  increaseFitnessScore,
  getTopTenFitnessScores,
  resetExercisesDone,
  setExercisesDoneDB,
  addLikeToPost,
  getPartnerFindEntries,
  deleteLikeFromPost,
  addCommentToPost,
  createPartnerFindEntry,
  deleteCommentFromPost,
  deleteTestPosts,
  deleteEvent,
};
