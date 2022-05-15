import React from "react";
import styles from "./Post.module.css";

import { useSelector } from "react-redux";

import { selectProfiles } from "../auth/authSlice";
import { fetchAsyncDelete } from "./postSlice";

import { PROPS_PROFILE, PROPS_POST } from "../types";

import { BsTrash } from "react-icons/bs";


import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

const Post: React.FC<PROPS_POST> = ({ postId, userPost, title, content }) => {
  const profiles = useSelector(selectProfiles);
  const dispatch: AppDispatch = useDispatch();

  const profs = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });
  console.log(userPost)

  if (title) {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <h3>{profs[0]?.nickName}</h3>
        </div>

        <h4 className={styles.post_text}>
          <strong>{title}</strong>
          <br />
          {content}
        </h4>
        <div>
          <p>{profs[0]?.userProfile}</p>
          <p>{userPost}</p>
          {(profs[0]?.userProfile == 3) ?
          (<button
            onClick={() => dispatch(fetchAsyncDelete(String(postId)))}
            // className={}
          >
            <BsTrash />
          </button>) : (<div></div>)}
          {/* <button
            onClick={() => dispatch(fetchAsyncDelete(String(postId)))}
            // className={}
          >
            <BsTrash />
          </button> */}
        </div>

      </div>
    );
  }
  return null;
};

export default Post;
