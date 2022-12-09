import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Preloader from "../components/Preloader";
import Title from "../components/Title";
import { Posts } from "../types/Posts";

const Post = () => {
  const { name } = useParams() as any;
  const posts = useAppSelector((state) => state.postsReducer);
  const comments = useAppSelector((state) => state.commentsReducer);
  const users = useAppSelector((state) => state.userReducer);
  const currentPost = posts.filter((post) => post.id === Number(name))[0];
  const currentComments = comments.filter(
    (comment) => comment.postId === currentPost.id
  );
  const currentUser = users.filter((user) => user.id === currentPost.userId)[0];
  let currentUserPosts: Posts[] = [];
  if (currentUser) {
    currentUserPosts = posts.filter((post) => post.userId === currentUser.id);
  }

  const [postsPerPage, setPostPerPage] = useState(3);
  const [commentsPerPage, setCommentsPerPage] = useState(3);

  const otherPosts = currentUserPosts.slice(0, postsPerPage);
  const commentsSliced = currentComments.slice(0, commentsPerPage);

  const showMore = () => {
    if (currentUserPosts.length < postsPerPage + 3) {
      setPostPerPage(postsPerPage + (currentUserPosts.length - postsPerPage));
    } else {
      setPostPerPage(postsPerPage + 3);
    }
  };
  const hide = () => setPostPerPage(3);

  const showMoreComments = () => {
    if (currentComments.length < commentsPerPage + 3) {
      setCommentsPerPage(
        commentsPerPage + (currentComments.length - commentsPerPage)
      );
    } else {
      setCommentsPerPage(commentsPerPage + 3);
    }
  };
  const hideComments = () => setCommentsPerPage(3);

  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      {currentPost ? (
        <>
          <Title text={currentPost.title} />
          <p className="text-justify mb-4">{currentPost.body}</p>
          {currentUser ? (
            <p className="font-medium text-right text-gray-600 mt-6">
              Author:{" "}
              <Link
                className="font-semibold italic text-blue-800"
                to={`/profile/${currentUser.id}`}
              >
                {currentUser.name}
              </Link>
            </p>
          ) : null}
          <div className="md:grid grid-cols-2 gap-6 mt-6">
            <div className="mb-8">
              {currentComments ? (
                <>
                  <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-6">
                    Comments ({currentComments.length})
                  </h2>
                  <ul>
                    {commentsSliced.map((comment) => (
                      <li
                        key={comment.id}
                        className="py-3 border-t border-gray-200 w-full"
                      >
                        <h3 className="font-semibold capitalize mb-4">
                          {comment.name}
                        </h3>
                        <p className="text-justify">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            data-prefix="fas"
                            data-icon="quote-left"
                            className="w-6 pr-2 inline-block"
                            role="img"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                          >
                            <path
                              fill="currentColor"
                              d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
                            ></path>
                          </svg>{" "}
                          {comment.body}
                        </p>
                        <p className="text-sm font-medium italic text-right text-gray-400 mt-6">
                          {comment.email}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <p className="text-center">
                    {commentsPerPage === currentComments.length ? (
                      <button
                        className="inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={hideComments}
                      >
                        Hide Comments
                      </button>
                    ) : (
                      <button
                        className="inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                        type="button"
                        onClick={showMoreComments}
                      >
                        Show more ({currentComments.length - commentsPerPage})
                      </button>
                    )}
                  </p>
                </>
              ) : null}
            </div>
            <div className="md:px-6 text-gray-900 md:border-l-2 border-color-gray">
              {currentUser ? (
                <h2 className="text-xl md:text-2xl font-semibold text-blue-800 mb-6">
                  Other posts by {currentUser.name} ({currentUserPosts.length})
                </h2>
              ) : null}
              <ul>
                {currentUserPosts ? (
                  otherPosts.map((post) => (
                    <li className="py-3 mb-4" key={`post-${post.id}`}>
                      <h3 className="text-xl capitalize truncate font-bold leading-tight border-b border-gray-200 pb-3 hover:text-gray-700">
                        {post.title}
                      </h3>
                      <p className="text-justify h-12 my-3 text-ellipsis overflow-hidden">
                        {post.body}
                      </p>
                      <p className="text-right mt-6">
                        {" "}
                        <Link
                          to={`/post/${post.id}`}
                          className="text-sm font-bold italic text-blue-800"
                        >
                          Read more...
                        </Link>
                      </p>
                    </li>
                  ))
                ) : (
                  <Preloader />
                )}
              </ul>
              <p className="text-center">
                {postsPerPage === currentUserPosts.length ? (
                  <button
                    className="inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={hide}
                  >
                    Hide posts
                  </button>
                ) : (
                  <button
                    className="inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    type="button"
                    onClick={showMore}
                  >
                    Show more ({currentUserPosts.length - postsPerPage})
                  </button>
                )}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Preloader />
      )}
    </main>
  );
};

export default Post;
