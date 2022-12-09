import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppDispatch } from "./app/hooks";
import { fetchComments } from "./app/reducers/comments";
import { fetchPosts } from "./app/reducers/posts";
import { fetchUsers } from "./app/reducers/users";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Contacts from "./Pages/Contacts";
import Main from "./Pages/Main";
import Post from "./Pages/Post";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import Users from "./Pages/Users";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchComments());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter basename="/react-posts-app">
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/post/:name" element={<Post />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
