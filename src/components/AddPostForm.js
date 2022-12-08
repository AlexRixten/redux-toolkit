import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import { addNewPost  } from "../store/app/posts/postsSlice";
import { selectAllUsers } from "../store/app/users/usersSlice";

export const AddPostForm = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { title, content, userId } = data;
    dispatch(addNewPost({title, body: content, userId})).unwrap();
    reset();
  };

  const usersOptions = users?.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          {...register("title", {
            required: "Обязательное поле",
          })}
        />
        {errors.title ? (
          <div style={{ height: 40 }}>
            <p style={{ color: "red", margin: 0 }}>{errors.title.message}</p>
          </div>
        ) : null}

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          {...register("userId", {
            required: "Обязательное поле",
          })}
        >
          <option value="">Сhoose an author</option>
          {usersOptions}
        </select>
        {errors.userId ? (
          <div style={{ height: 40 }}>
            <p style={{ color: "red", margin: 0 }}>{errors.userId.message}</p>
          </div>
        ) : null}
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          {...register("content", {
            required: "Обязательное поле",
          })}
        />
        {errors.content ? (
          <div style={{ height: 40 }}>
            <p style={{ color: "red", margin: 0 }}>{errors.content.message}</p>
          </div>
        ) : null}
        <button type="submit">Save Post</button>
      </form>
    </section>
  );
};
