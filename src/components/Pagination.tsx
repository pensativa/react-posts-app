import React, { useState } from "react";

const Pagination = (props: {
  productsPerPage: number;
  productsTotal: number;
  func: any;
}) => {
  const pageNumbers: number[] = [];

  for (
    let i: number = 1;
    i <= Math.ceil(props.productsTotal / props.productsPerPage);
    i++
  ) {
    if (i === 1) {
      pageNumbers.push(i);
    } else {
      pageNumbers.push(i);
    }
  }

  const [current, setCurrent] = useState(1);
  const changeState = (el: number) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setCurrent(el);
  };
  return (
    <div className="flex justify-center mt-4">
      <nav aria-label="Page navigation">
        <ul className="flex list-style-none">
          {pageNumbers.length > 1 &&
            pageNumbers.map((item) => (
              <li className="page-item" key={item}>
                <p
                  className={
                    current === item
                      ? "page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded  focus:shadow-none text-white bg-blue-800 hover:text-white hover:bg-blue-800"
                      : "page-link cursor-pointer relative block py-1.5 px-3 rounded border-0 outline-none transition-all duration-300 rounded  focus:shadow-none hover:text-white hover:bg-blue-800 text-gray-800"
                  }
                  onClick={() => {
                    props.func(item);
                    changeState(item);
                  }}
                >
                  {item}
                </p>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
