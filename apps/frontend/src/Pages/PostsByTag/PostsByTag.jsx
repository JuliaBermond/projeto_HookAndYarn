import { useParams, useSearchParams } from "react-router-dom";
import Loader from "../../components/FeedbackComponents/Loader/Loader";
import PostList from "../../components/PostComponents/PostList/PostList";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useTagPosts } from "../../hooks/usePosts";

const PostsByTag = () => {
  const { tag } = useParams();
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || "";

  const { data, isError, isLoading } = useTagPosts(tag, search);

  if (isLoading) return <Loader size={80} color="rgb(245, 199, 199)" />;

  if (isError) return <ErrorMessage />;

  return (
    <>
      <SearchBar />
      <PostList list={data} />
    </>
  );
};

export default PostsByTag;
