import { useSearchParams } from "react-router-dom";
import ErrorMessage from "../../components/FeedbackComponents/ErrorFetching/ErrorMessage.jsx";
import Loader from "../../components/FeedbackComponents/Loader/Loader";
import NoPosts from "../../components/FeedbackComponents/NoPosts/NoPosts";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useAllPosts } from "../../hooks/usePosts";
import PostList from '../../components/PostComponents/PostList/PostList.jsx';

const AllPosts = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data, isLoading, isError } = useAllPosts(search);

  if (isLoading) {
    return <Loader size={80} color="rgb(245, 199, 199)" loading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  if (!data || data.length === 0) {
    return (
      <>
        <SearchBar />
        <NoPosts />
      </>
    );
  }

  return (
    <>
      <SearchBar />
      <PostList list={data} />
    </>
  );
};

export default AllPosts;
