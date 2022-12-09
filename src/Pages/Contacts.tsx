import React, { useState } from "react";
import Title from "../components/Title";

const Contacts = () => {
  const [send, setSend] = useState(false);
  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSend(!send);
  };
  return (
    <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
      <Title text="Contacts" />
      <section>
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="w-full"
                alt=""
              />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <h2 className="text-xl md:text-2xl mb-4 text-gray-900 font-bold">
                Leave your message
              </h2>
              {send ? (
                <p>Thank you for your feedback</p>
              ) : (
                <form onSubmit={(e) => sendMessage(e)}>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="form-label font-bold inline-block mb-2 text-blue-800"
                    >
                      Your name
                    </label>
                    <input
                      type="text"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="You name"
                      id="name"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="form-label font-bold inline-block mb-2 text-blue-800"
                    >
                      Your email address
                    </label>
                    <input
                      type="email"
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Your email address"
                      id="email"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Textarea"
                      className="form-label font-bold inline-block mb-2 text-blue-800"
                    >
                      Your message
                    </label>
                    <textarea
                      className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="Textarea"
                      rows={3}
                      placeholder="Your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="inline-block px-7 py-3 bg-blue-800 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-900 active:shadow-lg transition duration-150 ease-in-out w-full"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacts;
