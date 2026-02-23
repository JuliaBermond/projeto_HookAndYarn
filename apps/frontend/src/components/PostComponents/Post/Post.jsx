import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelfProfile } from "../../../hooks/useAuth";
import { useDeletePost } from "../../../hooks/usePosts";
import { DEFAULT_POST_IMAGE } from "../../../utils/consts";
import Button from "../../Button/Button";
import TagList from "../../Tag/TagList";
import classes from "./Post.module.css";
import Modal from '../../FeedbackComponents/Modal/Modal';

const Post = ({ patternInfos }) => {
  const { data } = useSelfProfile();
  const { mutate, isError } = useDeletePost();
  const location = useLocation();

  const myPostsRoutes = location.pathname.includes("/my-posts");

  const creatorName = patternInfos?.user?.userName;
  const isOwner = creatorName === data?.userName;

  // controle de modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  return (
    <article className={classes.patternWrapper}>
      <div className={classes.imageWrapper}>
        <img
          src={patternInfos?.image ? patternInfos.image : DEFAULT_POST_IMAGE}
          alt="crochet"
        />

        <Link
          to={`/app/posts/${patternInfos._id}`}
          className={classes.imageButton}
        >
          <Button>See pattern</Button>
        </Link>
      </div>

      <div className={classes.info}>
        <ul className={classes.meta}>
          <li className={classes.title}>{patternInfos.title}</li>

          <li>
            Creator:{" "}
            {creatorName ? (
              isOwner ? (
                <span className={classes.creatorSpan}>{creatorName}</span>
              ) : (
                <Link
                  to={`/app/users/${creatorName}`}
                  className={classes.creatorLink}
                >
                  {creatorName}
                </Link>
              )
            ) : (
              <span>Unknown</span>
            )}
          </li>

          <li className={classes.tagsRow}>
            <span>Tags:</span>
            <TagList list={patternInfos.tags ?? []} isClickable />
          </li>
        </ul>

        {isOwner && myPostsRoutes && (
          <>
            <Modal
              open={isModalOpen}
              message="Do you really want to remove this post?"
              autoClose={false}
              onClose={() => setIsModalOpen(false)}
              buttons={[
                {
                  name: "Remove",
                  function: () => {
                    mutate(patternInfos._id);
                    setIsModalOpen(false);
                  },
                },
                {
                  name: "Cancel",
                  function: () => setIsModalOpen(false),
                },
              ]}
            />

            <Button
              type="button"
              className={classes.excludeButton}
              onClick={() => setIsModalOpen(true)}
            >
              Remove
            </Button>

            {isError && setIsErrorModalOpen(true) }
            {<Modal  open={isErrorModalOpen} message={"Oops! Something went wrong. Try again later"} onClose={() => setIsErrorModalOpen(false)} /> }
          </>
        )}
      </div>
    </article>
  );
};

export default Post;
