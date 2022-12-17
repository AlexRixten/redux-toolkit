import { AddPostForm } from "./components/AddPostForm";
import { PostsList } from "./components/PostsList";
import { Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/Layout";
import { SinglePostPage } from "./page/SinglePostPage";
import { EditPostForm } from "./components/EditPOstForm";
import { UsersList } from "./components/users/UserList";
import { UserPage } from "./components/users/UserPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<AddPostForm />} />
          <Route path=":postId" element={<SinglePostPage />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
