import { Link } from "react-router-dom";

import { useSelfProfile } from "../../../hooks/useAuth";

import { DEFAULT_POST_IMAGE } from "../../../utils/consts";
import TagList from "../../Tag/TagList";
import classes from "./PostDetails.module.css";

const PostDetails = ({ patternInfos }) => {
  const { data } = useSelfProfile();

  const creatorName = patternInfos?.user?.userName;
  const isOwner = creatorName === data?.userName;

  return (
    <article className={classes.postWrapper}>
      {/* Imagem */}
      <div className={classes.imageWrapper}>
        <img
          src={patternInfos?.image ? patternInfos.image : DEFAULT_POST_IMAGE}
          alt={patternInfos?.title || "crochet"}
        />
      </div>

      {/* Título, usuário e tags */}
      <div className={classes.metaWrapper}>
        <h2 className={classes.title}>{patternInfos.title}</h2>

        <p>
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
        </p>

        <div className={classes.tags}>
          <span>Tags:</span>
          <TagList list={patternInfos.tags ?? []} isClickable={true} />
        </div>
      </div>

      {/* Corpo do post */}
      <div className={classes.body}>
        <p>{patternInfos.body}</p>
      </div>
    </article>
  );
};

export default PostDetails;
