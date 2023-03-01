import Post from "../models/Post.js";
import User from "../models/User.js";

//CREATE

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = new User.findById(userId);
    const userPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();

    const post = await Post.find();

    res.status(201).json({
      message: "This is the list of all posts !",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(409).json({
      message: "There was an error while creating a post !",
      error: err,
    });
  }
};

//READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json({
      message: "This is the list of all feed posts !",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "There was an error while getting all feed post !",
      error: err,
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });

    res.status(200).json({
      message: "This is the list of all user post !",
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "There was an error while getting all user post !",
      error: err,
    });
  }
};

//UPDATE

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({
      message: "Like or unlike is done  !",
      data: {
        updatedPost,
      },
    });
  } catch (err) {
    res.status(404).json({
      message: "There was an error while liking a post !",
      error: err,
    });
  }
};
