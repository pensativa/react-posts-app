import React from "react";

const Title = (props: { text: string }) => {
  return (
    <h1 className="text-2xl md:text-4xl capitalize mt-8 mb-4 font-bold text-gray-900 sm:pr-12">
      {props.text}
    </h1>
  );
};

export default Title;
