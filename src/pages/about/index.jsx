import React from 'react';

const About = () => {
  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16" id="top">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">About Our Company</h2>
            <span className="text-white mt-2 block">Awesome, clean &amp; creative HTML5 Template</span>
          </div>
        </div>
      </div>

      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="mb-8">
                <img src="assets/images/about-left-image.jpg" alt="About Us" className="w-full h-auto rounded-lg shadow-lg" />
              </div>
            </div>
            <div className="pl-4">
              <h4 className="text-3xl font-semibold text-gray-800">About Us &amp; Our Skills</h4>
              <span className="text-lg text-gray-600 mt-4 block">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor incididunt ut labore.
              </span>
              <div className="my-6 p-4 border-l-4 border-blue-500 bg-blue-50">
                <i className="fa fa-quote-left text-blue-500 text-xl mr-2"></i>
                <p className="text-lg text-gray-700 inline">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiuski smod kon tempor incididunt ut labore.
                </p>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod kon tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <ul className="flex space-x-4">
                <li><a href="#" className="text-blue-500"><i className="fa fa-facebook"></i></a></li>
                <li><a href="#" className="text-blue-500"><i className="fa fa-twitter"></i></a></li>
                <li><a href="#" className="text-blue-500"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="#" className="text-blue-500"><i className="fa fa-behance"></i></a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Our Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-800">Our Amazing Team</h2>
            <span className="text-lg text-gray-600 mt-4 block">
              Details to details is what makes Hexashop different from the other themes.
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <img src="assets/images/team-member-01.jpg" alt="Ragnar Lodbrok" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <ul className="flex space-x-4 text-white">
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-linkedin"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">Ragnar Lodbrok</h4>
                  <span className="text-gray-500">Product Caretaker</span>
                </div>
              </div>
            </div>

            {/* Team Member 2 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <img src="assets/images/team-member-02.jpg" alt="Ragnar Lodbrok" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <ul className="flex space-x-4 text-white">
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-linkedin"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">Ragnar Lodbrok</h4>
                  <span className="text-gray-500">Product Caretaker</span>
                </div>
              </div>
            </div>

            {/* Team Member 3 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="relative">
                  <img src="assets/images/team-member-03.jpg" alt="Ragnar Lodbrok" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black opacity-40"></div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <ul className="flex space-x-4 text-white">
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-facebook"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-twitter"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-linkedin"></i></a></li>
                      <li><a href="#" className="hover:text-blue-500"><i className="fa fa-behance"></i></a></li>
                    </ul>
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold text-gray-800">Ragnar Lodbrok</h4>
                  <span className="text-gray-500">Product Caretaker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-semibold text-gray-800">Our Services</h2>
            <span className="text-lg text-gray-600 mt-4 block">
              Details to details is what makes Hexashop different from the other themes.
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="assets/images/service-01.jpg" alt="Service 1" className="w-full h-auto" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800">Synther Vaporware</h4>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consecteturti adipiscing elit, sed do eiusmod temp incididunt ut labore, et dolore quis ipsum suspend.
                  </p>
                </div>
              </div>
            </div>
            {/* Service 2 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="assets/images/service-02.jpg" alt="Service 2" className="w-full h-auto" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800">Eject Framing</h4>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  </p>
                </div>
              </div>
            </div>
            {/* Service 3 */}
            <div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img src="assets/images/service-03.jpg" alt="Service 3" className="w-full h-auto" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-800">The Outliner</h4>
                  <p className="text-gray-600 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
