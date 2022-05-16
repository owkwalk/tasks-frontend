import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";

import {
  selectOpenNewPost,
  resetOpenNewPost,
  fetchPostStart,
  fetchPostEnd,
  fetchAsyncNewPost,
} from "../post/postSlice";

import { Button } from "@material-ui/core";

const customStyles = {
  content: {
    top: "55%",
    left: "50%",

    width: 280,
    height: 400,
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
        <form>
          <h1>Create new task</h1>

          <br />
          <input
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="title"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="my-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="content"
            type="text"
            onChange={(e) => setContent(e.target.value)}
          />

          <br />
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
