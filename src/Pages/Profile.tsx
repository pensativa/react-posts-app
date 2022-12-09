import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Preloader from "../components/Preloader";
import Title from "../components/Title";

const Profile = () => {
  const { id } = useParams() as any;
  function ScrollToTopOnMount() {
    window.scrollTo(0, 0);
    return null;
  }
  const users = useAppSelector((state) => state.userReducer);
  const posts = useAppSelector((state) => state.postsReducer);
  const currentUser = users.filter((user) => user.id === Number(id))[0];
  const currentUserPosts = posts.filter((post) => post.userId === Number(id));

  const [postsPerPage, setPostPerPage] = useState(3);

  const otherPosts = currentUserPosts.slice(0, postsPerPage);

  const showMore = () => {
    if (currentUserPosts.length < postsPerPage + 3) {
      setPostPerPage(postsPerPage + (currentUserPosts.length - postsPerPage));
    } else {
      setPostPerPage(postsPerPage + 3);
    }
  };
  const hide = () => setPostPerPage(3);

  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      {currentUser ? (
        <>
          <Title text={currentUser.name} />
          <div className="flex flex-wrap justify-between items-start">
            <div className="w-96">
              <p className="text-sm font-medium text-right text-gray-400 mt-6">
                {currentUser.username}
              </p>
              <p className="text-sm font-medium italic text-right text-blue-800 mt-2">
                {currentUser.email}
              </p>
              <p className="text-sm font-medium italic text-right text-blue-800 mt-2">
                {currentUser.phone}
              </p>
              <p className="text-right mt-2 font-medium">
                website:{" "}
                <a
                  href={`${currentUser.website}`}
                  className="text-sm font-medium italic text-blue-800 "
                  target="_blank"
                  rel="noreferrer"
                >
                  {currentUser.website}
                </a>
              </p>
              <p className="text-m font-medium mt-4">Address:</p>
              <table className="w-full sm:w-auto">
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      City
                    </td>
                    <td className="text-sm text-gray-600 font-medium px-6 py-4 whitespace-nowrap">
                      {currentUser.address.city}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Street
                    </td>
                    <td className="text-sm text-gray-600 font-medium px-6 py-4 whitespace-nowrap">
                      {currentUser.address.street}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Suite
                    </td>
                    <td className="text-sm text-gray-600 font-medium px-6 py-4 whitespace-nowrap">
                      {currentUser.address.suite}
                    </td>
                  </tr>

                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Zipcode
                    </td>
                    <td className="text-sm text-gray-600 font-medium px-6 py-4 whitespace-nowrap">
                      {currentUser.address.zipcode}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-2/4">
              <h2 className="text-xl md:text-2xl font-semibold text-blue-800 my-6">
                Posts ({currentUserPosts.length})
              </h2>
              <ul>
                {otherPosts.map((post) => (
                  <li className="px-6 py-3 mb-4" key={post.id}>
                    <h3 className="text-l md:text-xl capitalize truncate font-bold leading-tight border-b border-gray-200 pb-3 hover:text-gray-700">
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
                ))}
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
        <>
          <ScrollToTopOnMount />
          <Preloader />
        </>
      )}
    </main>
  );
};

export default Profile;
