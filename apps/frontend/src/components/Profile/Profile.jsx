import { useState } from "react";

import { useSelfProfile } from "../../hooks/useAuth";
import { useSelfPosts, useUserPosts } from "../../hooks/usePosts";
import { useUserProfile } from "../../hooks/useUser";

import Button from "../Button/Button";
import PostList from "../PostComponents/PostList/PostList";

import {
  DEFAULT_USER_PROFILE_IMAGE,
  POSTS_PER_PAGE,
} from "../../utils/consts.js";

import Loader from "../FeedbackComponents/Loader/Loader.jsx";
import NoPosts from "../FeedbackComponents/NoPosts/NoPosts.jsx";
import NotFoundPage from "../FeedbackComponents/NotFoundPage/NotFoundPage.jsx";
import classes from "./Profile.module.css";

const Profile = ({ username = null }) => {
  const [page, setPage] = useState(1);
  const { data: loggedUser } = useSelfProfile();

  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = username ? useUserProfile(username) : useSelfProfile();

  let isNotSelf = username && loggedUser?._id !== user?._id;

  const { data: postsData, isLoading: postsLoading } =
    username && isNotSelf
      ? useUserPosts(username, page, POSTS_PER_PAGE)
      : useSelfPosts(page, POSTS_PER_PAGE);

  if (userLoading || postsLoading) {
    return <Loader size={80} color="rgb(245, 199, 199)" />;
  }

  if (userError) {
    return <NotFoundPage isUserNotFoundError/>;
  }

  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.profileSide}>
          <div className={classes.imageWrapper}>
            <img src={DEFAULT_USER_PROFILE_IMAGE} alt="profile" />
          </div>

          <p>{user?.userName ?? "USER"}</p>
        </div>

        <div className={classes.postsSide}>
          {postsData?.posts?.length === 0 ? (
            <NoPosts />
          ) : (
            <PostList list={postsData.posts} />
          )}

          {postsData?.totalPages > 1 && (
            <div className={classes.pagination}>
              {Array.from({ length: postsData.totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  style={{
                    fontWeight: page === i + 1 ? "bold" : "normal",
                  }}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
