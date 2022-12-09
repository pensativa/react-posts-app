import React from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import Preloader from "../components/Preloader";
import Title from "../components/Title";

const Main = () => {
  const posts = useAppSelector((state) => state.postsReducer);
  const users = useAppSelector((state) => state.userReducer);
  const comments = useAppSelector((state) => state.commentsReducer);
  const lastPosts = posts.slice(5, 13);
  const latsUsers = users.slice(0, 4);

  const countOfComments = (id: number) => {
    let sum = 0;
    comments.map((comment) => {
      if (comment.postId === id) {
        sum++;
      }
    });
    return sum;
  };

  const findAuthor = (id: number) => {
    let author = {
      name: "",
      id: 0,
    };
    users.map((user) => {
      if (user.id === id) {
        author.name = user.name;
        author.id = id;
      }
    });
    return author;
  };

  const foundCurrentPosts = (el: number) => {
    const counOfPosts = posts.filter((post) => post.userId === el);
    return counOfPosts.length;
  };

  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      <Title text="Last posts" />
      {posts.length < 1 ? (
        <Preloader />
      ) : (
        <section className="mt-6 space-y-12 md:grid lg:grid-cols-4 lg:gap-4 md:space-y-0 md:grid-cols-2 md:gap-6">
          {lastPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white p-4 group border border-gray-300 rounded-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link to={`/post/${post.id}`}>
                <h2 className="text-l md:text-xl capitalize truncate font-bold leading-tight border-b border-gray-200 pb-3 hover:text-gray-700">
                  {post.title}
                </h2>
              </Link>
              <p className="md:h-12 lg:h-24 my-3 text-ellipsis overflow-hidden">
                {post.body}
              </p>
              <div className="flex justify-between pt-3 border-t border-gray-300 text-gray-600">
                <Link
                  className="text-blue-800 transition font-semibold hover:text-blue-600"
                  to={`/profile/${findAuthor(post.userId).id}`}
                >
                  {findAuthor(post.userId).name}
                </Link>
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                    <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
                  </svg>

                  <span className="pl-1 leading-4">
                    {countOfComments(post.id)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      <h2 className="text-2xl md:text-3xl capitalize mt-8 mb-4 font-bold text-gray-900 sm:pr-12">
        Last Users
      </h2>
      {latsUsers.length < 1 ? (
        <Preloader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {latsUsers.map((user) => (
            <div
              key={`user-${user.id}`}
              className="block rounded-lg shadow-lg bg-white max-w-sm text-center"
            >
              <div className="py-3 px-6 border-b truncate border-gray-300">
                {user.username}
              </div>
              <div className="p-6">
                <h5 className="text-gray-900 text-xl truncate font-medium mb-2">
                  {user.name}
                </h5>
                <p className="text-sm font-medium truncate italic text-blue-800 mb-2">
                  {user.email}
                </p>
                <p className="text-sm font-medium truncate italic text-blue-800 mb-2">
                  {user.phone}
                </p>
                <p className="mb-6 font-medium">
                  website:{" "}
                  <a
                    href={`http://${user.website}`}
                    className="text-sm font-medium italic text-blue-800 truncate"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.website}
                  </a>
                </p>
                <Link
                  to={`/profile/${user.id}`}
                  className=" inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  View profile
                </Link>
              </div>
              <div className="py-3 px-6 border-t border-gray-300 text-gray-600">
                {foundCurrentPosts(user.id)} posts
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default Main;
