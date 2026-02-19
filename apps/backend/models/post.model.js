import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true, minlength: 3 },
  body: { type: String, required: true, minlength: 10 },
  tags: [String],
  image: { type: String, required: false },
});

const Post = mongoose.model("Post", PostSchema);
export default Post;
