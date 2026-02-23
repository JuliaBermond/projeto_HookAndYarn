import { useParams } from "react-router-dom";
import Loader from "../../components/FeedbackComponents/Loader/Loader";
import PostDetails from "../../components/PostComponents/PostDetails/PostDetails";
import { usePost } from "../../hooks/usePosts";
import ErrorMessage from '../../components/FeedbackComponents/ErrorFetching/ErrorMessage.jsx';

const PostById = () => {
  const { id } = useParams();

  const { data, isLoading, isError } = usePost(id);

  if (isLoading)
    return <Loader size={80} color="rgb(245, 199, 199)" loading={true} />;

  if (isError) return <ErrorMessage/>

  return <PostDetails patternInfos={data} />;
};

export default PostById;
