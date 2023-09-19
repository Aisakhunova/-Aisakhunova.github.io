import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton.";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ title: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost({ ...post, title: "", body: "" });
  };
  return (
    <div>
      <form>
        <MyInput
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="TItle"
        />
        {/* <MyInput type="text" placeholder="Description" ref={bodyInputRef} /> */}
        <MyInput
          type="text"
          value={post.body}
          placeholder="Description"
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        <MyButton onClick={addNewPost}>New post</MyButton>
      </form>
    </div>
  );
};

export default PostForm;
