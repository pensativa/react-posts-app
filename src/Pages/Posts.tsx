import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import Pagination from "../components/Pagination";
import Preloader from "../components/Preloader";
import Title from "../components/Title";

const Posts = () => {
  const posts = useAppSelector((state) => state.postsReducer);
  const users = useAppSelector((state) => state.userReducer);
  const comments = useAppSelector((state) => state.commentsReducer);
  const [filterPosts, setFilterPosts] = useState(posts);

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

  const search = (el: string) => {
    let serachPosts = posts;
    if (el.length < 1) {
      setFilterPosts(posts);
    } else {
      setFilterPosts(
        serachPosts.filter((item) => {
          return (
            item.title.toLowerCase().indexOf(el.toLowerCase()) > -1 ||
            item.body.toLowerCase().indexOf(el.toLowerCase()) > -1
          );
        })
      );
    }
  };

  let productTotal = filterPosts.length;

  const [productsPerPage, setProductsPerPage] = useState(12);

  const [currentPage, setCurrentPage] = useState(1);

  const lastProductIndex = currentPage * productsPerPage;
  const firstProductIndex = lastProductIndex - productsPerPage;

  let currentProduct = filterPosts.slice(firstProductIndex, lastProductIndex);

  const changePage = (pageNumber: number) => setCurrentPage(pageNumber);

  const [value, setValue] = useState("12");
  const selectHandle = (num: string) => setValue(num);

  const onChange = (num: string) => setProductsPerPage(Number(num));

  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      <div className="flex justify-between items-center flex-wrap my-4">
        <Title text="Posts" />
        <select
          className="form-select form-select-lg mb-3 mt-8 appearance-none block w-36 md:w-60 px-4 py-2 md:text-xl font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Count posts by page"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            selectHandle(e.target.value);
          }}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="60">60</option>
          <option value="100">100</option>
        </select>
      </div>
      <div className="flex justify-center">
        <div className="mb-3 xl:w-96">
          <div className="input-group relative flex items-stretch w-full mb-4">
            <input
              type="search"
              className="form-control relative flex-auto min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-800 focus:outline-none"
              placeholder="Search"
              aria-label="Search"
              onChange={(e) => search(e.target.value)}
            />
            <div className="inline-block px-6 py-2.5 bg-blue-800 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700  focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="w-4"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
      {currentProduct.length < 1 ? (
        <Preloader />
      ) : (
        <section className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-4 lg:space-y-0">
          {currentProduct.map((post) => (
            <article
              key={post.id}
              className="bg-white p-4 group border border-gray-300 rounded-lg hover:shadow-2xl transition-all duration-300"
            >
              <Link to={`/post/${post.id}`}>
                <h2 className="text-xl capitalize truncate font-bold leading-tight border-b border-gray-200 pb-3 hover:text-gray-700">
                  {post.title}
                </h2>
              </Link>
              <p className="h-24 my-3 text-ellipsis overflow-hidden">
                {post.body}
              </p>
              <div className="flex justify-between pt-3 border-t border-gray-300 text-gray-600">
                <Link
                  className="text-blue-800 transition font-semibold hover:text-blue-800"
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
                  </svg>{" "}
                  <span className="pl-1 leading-4">
                    {countOfComments(post.id)}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
      <Pagination
        productsTotal={productTotal}
        productsPerPage={productsPerPage}
        func={changePage}
      />
    </main>
  );
};

export default Posts;
