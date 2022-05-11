import React from "react";
import styles from "./Post.module.css";

import { useSelector } from "react-redux";

import { selectProfiles } from "../auth/authSlice";

import { PROPS_POST } from "../types";

const Post: React.FC<PROPS_POST> = ({ userPost, title, content }) => {
  const profiles = useSelector(selectProfiles);

  const prof = profiles.filter((prof) => {
    return prof.userProfile === userPost;
  });

  if (title) {
    return (
      <div className={styles.post}>
        <div className={styles.post_header}>
          <h3>{prof[0]?.nickName}</h3>
        </div>

        <h4 className={styles.post_text}>
          <strong>{title}</strong>
          <br />
          {content}
        </h4>
      </div>
    );
  }
  return null;
};

export default Post;
