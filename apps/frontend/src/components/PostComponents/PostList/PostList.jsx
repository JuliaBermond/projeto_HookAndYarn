import Post from "../Post/Post";
import classes from "./PostList.module.css";

const PostList = ({ list = [] }) => {

  return (
    <section className={classes.posts}>
      {list.map((item) => (
        <Post key={item._id} patternInfos={item} />
      ))}
    </section>
  );
};

export default PostList;
