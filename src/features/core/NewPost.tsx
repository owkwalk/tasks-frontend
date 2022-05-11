import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import styles from "./Core.module.css";

import {
  selectOpenNewPost,
  resetOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncNewPost,
} from "../post/postSlice";

import { Button, TextField, IconButton } from "@material-ui/core";
import { MdAddAPhoto } from "react-icons/md";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 220,
    padding: "50px",

    transform: "translate(-50%, -50%)",
  },
};

const NewPost: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const openNewPost = useSelector(selectOpenNewPost);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const packet = { title: title, content: content };
    await dispatch(fetchPostStart());
    await dispatch(fetchAsyncNewPost(packet));
    await dispatch(fetchPostEnd());
    setTitle("");
    setContent("");
    dispatch(resetOpenNewPost());
  };

  return (
    <>
      <Modal
        isOpen={openNewPost}
        onRequestClose={async () => {
          await dispatch(resetOpenNewPost());
        }}
        style={customStyles}
      >
        <form className={styles.core_signUp}>
          <h1 className={styles.core_title}>Task Log</h1>

          <br />
          <TextField
            placeholder="Please enter title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            placeholder="Please enter content"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />

          <br />
          <Button
            disabled={!title || !content}
            variant="contained"
            color="primary"
            onClick={newPost}
          >
            New task
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default NewPost;
