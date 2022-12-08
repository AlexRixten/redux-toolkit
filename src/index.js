import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { store } from "./store/app/store";
import { Provider } from "react-redux";
import { fetchPosts } from "./store/app/posts/postsSlice";
import { fetchUsers } from "./store/app/users/usersSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(fetchPosts());
store.dispatch(fetchUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
