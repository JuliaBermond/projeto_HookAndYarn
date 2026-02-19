// import { Router } from "express";

// import {
//   createPost,
//   deleteSelfPost,
//   getAllPosts,
//   getPostById,
//   getSelfPosts,
// } from "../controllers/postController.js";

// const postRouter = Router();

// postRouter.post("/", createPost);
// postRouter.get("/", getAllPosts);
// postRouter.get("/my-posts", getSelfPosts);
// postRouter.get("/:id", getPostById);
// postRouter.delete("/my-posts/:id", deleteSelfPost);

// export default postRouter;
import { Router } from "express";
import {
  createPost,
  deleteSelfPost,
  getAllPosts,
  getPostById,
  getPostsByTag,
  getSelfPosts,
  getUserPosts,
} from "../controllers/postController.js";

import { uploadPostImage } from "../middlewares/imageUpload/uploadImageMiddleware.js";

const postRouter = Router();

postRouter.post("/", uploadPostImage, createPost);

postRouter.get("/", getAllPosts);
postRouter.get("/my-posts", getSelfPosts);
postRouter.get("/user/:username/posts", getUserPosts);

postRouter.get("/:id", getPostById);
postRouter.get("/tags/:tag", getPostsByTag);

postRouter.delete("/my-posts/:id", deleteSelfPost);

export default postRouter;
