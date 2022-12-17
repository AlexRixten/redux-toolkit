import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectPostById, updatePost, deletePost } from "../store/app/posts/postsSlice";
import { useParams, useNavigate } from "react-router-dom";

import { selectAllUsers } from "../store/app/users/usersSlice";

export const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const post = useSelector((state) => selectPostById(state, Number(postId)));
  const users = useSelector(selectAllUsers);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: post?.title,
      content: post?.body,
      userId: post?.userId,
    },
  });

  const onSubmit = (data) => {
    const { title, content, userId } = data;
    // dispatch(addNewPost({title, body: content, userId})).unwrap();
    try {
      dispatch(
        updatePost({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        })
      ).unwrap();
      reset();
      navigate(`/post/${postId}`);
    } catch (err) {
      console.error("Failed to save the post", err);
    } finally {
    }
  };

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  const onDeletePostClicked = () => {
    try {
      dispatch(deletePost({ id: post.id })).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    } finally {
    }
  };

  return (
    <section>
      <h2>Edit Post</h2>
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
        <select id="postAuthor">
          <option
            {...register("userId", {
              required: "Обязательное поле",
            })}
          ></option>
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
        <input type="submit" value="Save Post" />
        <button className="deleteButton" type="button" onClick={onDeletePostClicked}>
          Delete Post
        </button>
      </form>
    </section>
  );
};
