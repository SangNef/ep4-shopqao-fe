import React, { useEffect } from "react";

const Contact = () => {

  useEffect(() => {
    document.title = "XShop - Contact us";
  }, []);

  return (
    <div>
      <>
        <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16" id="top">
          <div className="container mx-auto text-center">
            <h2 className="text-4xl font-bold text-white">Contact Us</h2>
            <span className="text-white mt-2 block">Awesome, clean &amp; creative HTML5 Template</span>
          </div>
        </div>

        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:space-x-8">
              {/* Map Section */}
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <div className="w-full h-96">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0969490732964!2d105.77971427584129!3d21.02880648777588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454b32b842a37%3A0xe91a56573e7f9a11!2zOGEgVMO0biBUaOG6pXQgVGh1eeG6v3QsIE3hu7kgxJDDrG5oLCBD4bqndSBHaeG6pXksIEjDoCBO4buZaSAxMDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1732111922443!5m2!1svi!2s"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    allowFullScreen=""
                  />
                </div>
              </div>

              {/* Contact Form Section */}
              <div className="lg:w-1/2">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-800">Say Hello. Don't Be Shy!</h2>
                  <span className="text-gray-600 mt-2">
                    Details to details is what makes Hexashop different from the other themes.
                  </span>
                </div>

                <form id="contact" action="" method="post">
                  <div className="space-y-6">
                    <div>
                      <input
                        name="name"
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <input
                        name="email"
                        type="email"
                        id="email"
                        placeholder="Your email"
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <textarea
                        name="message"
                        rows={6}
                        id="message"
                        placeholder="Your message"
                        className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        id="form-submit"
                        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none"
                      >
                        <i className="fa fa-paper-plane mr-2" /> Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Contact;
