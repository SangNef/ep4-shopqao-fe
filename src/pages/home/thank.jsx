import React from "react";
import { useParams, Link } from "react-router-dom";
import { RightOutlined } from '@ant-design/icons'; // Import RightOutlined from Ant Design icons

const Thank = () => {
  const { id } = useParams();

  return (
    <>
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-16" id="top">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white">Thank You</h2>
            <span className="text-white mt-2 block text-lg">Thank you for your order</span>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex justify-between my-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full sm:w-1/2 mb-6 sm:mb-0">
          <img
            src="https://media.aidaform.com/us-east-1%3Ac7020586-c2e7-47c4-b6e3-77779d3f3284/iw54t9wkggc.png"
            alt="Thank you image"
            className="w-full sm:w-2/3 h-auto mx-auto"
          />
        </div>
        <div className="w-full sm:w-1/2 text-center sm:text-left">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">Thank you for your order!</h3>
          <p className="text-lg text-gray-700">
            Your order will be delivered in 2-3 working days with order ID: <span className="font-semibold text-indigo-600">{id}</span>
          </p>

          {/* Links with Ant Design Icons */}
          <div className="mt-6">
            <Link
              to="/"
              className="flex gap-2 items-center text-lg font-semibold text-indigo-600 hover:text-indigo-800 mb-4"
            >
              <RightOutlined className="ml-2 text-xl" />
              <p>Go to Home</p>
            </Link>
            <Link
              to="/orders"
              className="flex gap-2 items-center text-lg font-semibold text-indigo-600 hover:text-indigo-800"
            >
              <RightOutlined className="ml-2 text-xl" />
              <p>View Order Details</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Thank;
