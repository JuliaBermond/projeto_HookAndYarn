import {
  NotFoundError,
  UnauthorizedError,
} from "../middlewares/error/apiError.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {
  validateRequiredFields,
} from "../validation/validateInputFields.js";

export async function createPost(req, res, next) {
  const { title, body, tags } = req.body;

  const user = req.user;

  try {
    if (!user) {
      throw new UnauthorizedError();
    }

    const obj = req.body;

    validateRequiredFields(obj, ["title", "body"]);

    const createdPost = await Post.create({
      user: user._id,
      title,
      body,
      tags: tags ?? [],
      image: req.file ? req.file.path : null,
    });

    const populatedPost = await createdPost.populate("user", "userName");

    return ApiResponse.success(res, {
      data: populatedPost,
      statusCode: 201,
    });
  } catch (err) {
    next(err);
  }
}

export async function getAllPosts(req, res, next) {
  try {
    const { search } = req.query;

    const filter = {};

    if (search) {
      filter.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          tags: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    const posts = await Post.find(filter).populate("user", "userName");

    return ApiResponse.success(res, {
      data: posts,
    });
  } catch (err) {
    next(err);
  }
}

export async function getSelfPosts(req, res, next) {
  try {
    const user = req.user;

    if (!user) {
      throw new UnauthorizedError();
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments({ user: user._id });

    const myPosts = await Post.find({ user: user._id })
      .populate("user", "userName profile")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalPosts / limit);

    return ApiResponse.success(res, {
      data: {
        posts: myPosts,
        currentPage: page,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getUserPosts(req, res, next) {
  try {
    const { username } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    const user = await User.findOne({ userName: username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const totalPosts = await Post.countDocuments({ user: user._id });

    const posts = await Post.find({ user: user._id })
      .populate("user", "userName profile")
      .sort({ createdAt: -1, _id: -1 })
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalPosts / limit);

    return ApiResponse.success(res, {
      data: {
        posts,
        currentPage: page,
        totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function getPostById(req, res, next) {
  try {
    const user = req.user;
    const { id } = req.params;

    if (!user) {
      throw new UnauthorizedError();
    }

    const post = await Post.findById(id).populate("user", "userName");

    if (!post) {
      throw new NotFoundError();
    }

    return ApiResponse.success(res, {
      data: post,
    });
  } catch (err) {
    next(err);
  }
}

export async function getPostsByTag(req, res, next) {
  const user = req.user;
  const { tag } = req.params;
  const { search } = req.query;

  try {
    if (!user) {
      throw new UnauthorizedError();
    }

    const filter = {
      tags: { $regex: new RegExp(`^${tag}$`, "i") },
    };

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const posts = await Post.find(filter).populate("user", "userName");

    return ApiResponse.success(res, {
      data: posts,
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteSelfPost(req, res, next) {
  const user = req.user;
  const { id } = req.params;

  try {
    if (!user) {
      throw new UnauthorizedError();
    }

    const postId = await Post.findById(id);

    if (!postId) {
      throw new NotFoundError();
    }

    const deleted = await Post.findOneAndDelete({
      user: user._id,
      _id: postId,
    });

    if (!deleted) {
      throw new UnauthorizedError();
    }

    return ApiResponse.success(res, {
      data: deleted,
    });
  } catch (err) {
    next(err);
  }
}
