import axios from "axios";

const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/login", {
      username,
      password,
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const uploadUser = async (username, password, orgBool, fullName) => {
  try {
    const response = await axios.post("http://localhost:5000/register", {
      username,
      password,
      organisation: orgBool,
      fullName,
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const getPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/posts");
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const uploadPost = async (username, title, content) => {
  try {
    const response = await axios.post("http://localhost:5000/posts", {
      title,
      content,
      username,
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const getNewsPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/newsPosts");
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const uploadNewsPost = async (username, title, content) => {
  try {
    const response = await axios.post("http://localhost:5000/newsPosts", {
      title,
      content,
      username,
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const subscribe = async (subscriberUsername, subscribeeUsername) => {
  try {
    const response = await axios.post("http://localhost:5000/subscriptions", {
      username: subscriberUsername,
      subscription: subscribeeUsername,
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const unsubscribe = async (subscriberUsername, subscribeeUsername) => {
  try {
    const response = await axios.delete("http://localhost:5000/subscriptions", {
      data: {
        username: subscriberUsername,
        subscription: subscribeeUsername,
      },
    });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const searchUser = async (searchTerm) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/search/" + searchTerm
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
  }
};

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
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async () => {
  try {
    const response = await axios.get("http://localhost:5000/events");
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};
const deletePost = async (postId) => {
  try {
    const response = await axios.delete(
      "http://localhost:5000/posts/" + postId
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

const getUserData = async (username) => {
  try {
    const response = await axios.get("http://localhost:5000/user/" + username);
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

const updateUserData = async (userData) => {
  console.log("From update user data:", userData);
  try {
    const response = await axios.put(
      "http://localhost:5000/user/" + userData.username,

      {
        data: userData,
      }
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

const increaseFitnessScore = async (username) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/fitnessScore/" + username
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

const getTopTenFitnessScores = async () => {
  try {
    const response = await axios.get("http://localhost:5000/fitnessScores/10");
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

const resetExercisesDone = async (username) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/resetExercisesDone/" + username
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
    throw { data: error.response.data, status: error.response.status };
  }
};

const setExercisesDoneDB = async (username, exercisesDone) => {
  try {
    const response = await axios.put(
      "http://localhost:5000/user/setExercisesDone/" + username,
      {
        exercisesDone,
      }
    );
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.log(error);
    throw { data: error.response.data, status: error.response.status };
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
};
