import axios from "axios";

// Sends login request to server
const loginUser = async (username, password) => {
  try {
    const response = await axios.post("/login", {
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
    const response = await axios.post("/register", {
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
    const response = await axios.get("/posts");
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
    const response = await axios.post("/posts", {
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
    const response = await axios.get("/newsPosts");
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
    const response = await axios.post("/newsPosts", {
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
    const response = await axios.post("/subscriptions", {
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
    const response = await axios.delete("/subscriptions", {
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
    const response = await axios.get("/search/" + searchTerm);
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

    const response = await axios.post("/eventPosts", eventData);
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
    const response = await axios.get("/eventPosts");
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
    const response = await axios.delete("/posts/" + postId);
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
    const response = await axios.get("/user/" + username);
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
      "/user/" + userData.username,

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
    const response = await axios.put("/user/fitnessScore/" + username);
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
    const response = await axios.get("/fitnessScores/10");
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
    const response = await axios.put("/user/resetExercisesDone/" + username);
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
    const response = await axios.put("/user/setExercisesDone/" + username, {
      exercisesDone,
    });
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
    const response = await axios.post("/posts/like/" + postId, {
      userId,
    });
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
    const response = await axios.delete("/posts/like/" + postId, {
      data: {
        userId,
      },
    });
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
    const response = await axios.post("/posts/comment/" + postId, {
      userId,
      comment,
    });
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
      "/posts/" + postId + "/comment/" + commentId
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
    const response = await axios.delete("/testPosts");
    // console.log(response.data);
    // console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete("/eventPosts/" + eventId);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const getPartnerFindEntries = async () => {
  try {
    const response = await axios.get("/partnerEntry");
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const createPartnerFindEntry = async (entry) => {
  try {
    const response = await axios.post("/partnerEntry", entry);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const addInterestToPartnerFindEntry = async (entryId, userId) => {
  try {
    const response = await axios.post("/partnerEntry/interest/" + entryId, {
      userId,
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const deleteInterestFromPartnerFindEntry = async (entryId, userId) => {
  try {
    const response = await axios.delete("/partnerEntry/interest/" + entryId, {
      data: {
        userId,
      },
    });
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const deletePartnerFindEntry = async (entryId) => {
  try {
    const response = await axios.delete("/partnerEntry/" + entryId);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const getSingleEntry = async (entryId) => {
  try {
    const response = await axios.get("/partnerEntry/" + entryId);
    return { data: response.data, status: response.status };
  } catch (error) {
    // console.log(error);
  }
};

const updateEntry = async (entry) => {
  try {
    const response = await axios.put("/partnerEntry/" + entry._id, entry);
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
  updateEntry,
  getNewsPosts,
  uploadNewsPost,
  subscribe,
  unsubscribe,
  searchUser,
  postEvent,
  getEvents,
  deletePost,
  getSingleEntry,
  getUserData,
  updateUserData,
  increaseFitnessScore,
  getTopTenFitnessScores,
  resetExercisesDone,
  setExercisesDoneDB,
  addLikeToPost,
  getPartnerFindEntries,
  deleteInterestFromPartnerFindEntry,
  deleteLikeFromPost,
  addCommentToPost,
  deletePartnerFindEntry,
  createPartnerFindEntry,
  deleteCommentFromPost,
  addInterestToPartnerFindEntry,
  deleteTestPosts,
  deleteEvent,
};
