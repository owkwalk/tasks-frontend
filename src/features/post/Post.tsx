import React from "react";
import styles from "./Post.module.css";

import { useSelector } from "react-redux";

import { selectProfiles } from "../auth/authSlice";
import { fetchAsyncDelete } from "./postSlice";

import { PROPS_POST } from "../types";

import { BsTrash } from "react-icons/bs";


import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import {
  selectProfile,
} from "../auth/authSlice";

const Post: React.FC<PROPS_POST> = ({ postId, userPost, title, content }) => {
  const profiles = useSelector(selectProfiles);
  const dispatch: AppDispatch = useDispatch();
  const profile = useSelector(selectProfile);

  const profs = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

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
        {(userPost == profile.userProfile) ?
          (<button
            onClick={() => dispatch(fetchAsyncDelete(String(postId)))}
          >
            <BsTrash />
          </button>) : (<div></div>)}
      </div>
    );
  }
  return null;
};

export default Post;
