import axios from "axios";

const loginUser = async (username, password) => {
  try {
    const response = await axios.post("http://localhost:5000/login", { username, password });
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
    throw error.response.data.message;
  }
};

const uploadUser = async (username, password, orgBool) => {
  try {
    const response = await axios.post("http://localhost:5000/register", {
      username,
      password,
      organisation: orgBool,
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
    const response = await axios.post("http://localhost:5000/posts", { title, content, username });
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

const getSubscriptions = async (username) => {
  try {
    const response = await axios.get("http://localhost:5000/subscriptions/" + username);
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
    const response = await axios.get("http://localhost:5000/search/" + searchTerm);
    console.log(response.data);
    console.log(response.status);
    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error:", error);
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
  getSubscriptions,
  searchUser,
};
