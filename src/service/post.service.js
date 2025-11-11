import axiosInstance from "./url.service";

// create method for post
export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/users/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create method for story
export const createStory = async (postData) => {
  try {
    const result = await axiosInstance.post("/users/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all post method
export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.post("/users/posts");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// get all story method
export const getAllStory = async () => {
  try {
    const result = await axiosInstance.post("/users/story");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// method for like a post
export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(
      `/users/posts/likes/${postId}`,
      postData
    );
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// method for comments a post
export const commentsPost = async (postId, comments) => {
  try {
    const result = await axiosInstance.post(
      `/users/posts/comments/${postId}`,
      comments
    );
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// method for share a post
export const sharePost = async (postId, comments) => {
  try {
    const result = await axiosInstance.post(
      `/users/posts/share/${postId}`,
      comments
    );
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Get all users posts
export const getUsersPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/users/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
