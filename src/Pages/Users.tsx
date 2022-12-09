import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Preloader from "../components/Preloader";
import Title from "../components/Title";

const Users = () => {
  const users = useAppSelector((state) => state.userReducer);
  const posts = useAppSelector((state) => state.postsReducer);

  const foundCurrentPosts = (el: number) => {
    const counOfPosts = posts.filter((post) => post.userId === el);
    return counOfPosts.length;
  };
  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      <Title text="All users" />

      {users.length < 1 ? (
        <Preloader />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {users.map((user) => (
            <div
              key={`user-${user.id}`}
              className="block rounded-lg shadow-lg bg-white max-w-sm text-center"
            >
              <div className="py-3 px-6 truncate border-b border-gray-300">
                {user.username}
              </div>
              <div className="p-6">
                <h5 className="text-gray-900 truncate text-xl font-medium mb-2">
                  {user.name}
                </h5>
                <p className="text-sm truncate font-medium italic text-blue-800 mb-2">
                  {user.email}
                </p>
                <p className="text-sm truncate font-medium italic text-blue-800 mb-2">
                  {user.phone}
                </p>
                <p className="mb-6 font-medium">
                  website:{" "}
                  <a
                    href={`http://${user.website}`}
                    className="text-sm font-medium italic text-blue-800 "
                    target="_blank"
                    rel="noreferrer"
                  >
                    {user.website}
                  </a>
                </p>
                <Link
                  to={`/profile/${user.id}`}
                  className="inline-block md:px-6 px-4 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
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

export default Users;
