import React, { useEffect, useState } from "react";
import { getProducts } from "../../api/product";
import { Link, useSearchParams } from "react-router-dom";
import { Badge, Select } from "antd";

const { Option } = Select;

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const [searchParams] = useSearchParams();
  const searchParam = searchParams.get("search");

  const fetchProducts = async () => {
    const response = await getProducts({ category, gender, sortDirection, name: searchParam });
    if (response) {
      setProducts(response.content);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, gender, sortDirection, searchParam]);

  useEffect(() => {
    document.title = `XShop - ${searchParam ? `${searchParam}` : "All Products"}`;
  }, [searchParam]);
  return (
    <div className="container mx-auto p-4">
      {searchParam && <h2 className="text-2xl font-semibold mb-4">Search results for "{searchParam}"</h2>}
      <div className="flex gap-4">
        <div className="!w-80">
          {/* <Select
            value={category}
            onChange={(value) => setCategory(value)}
            placeholder="Select Category"
            className="w-full"
            allowClear
          >
            <Option value="">All Categories</Option>
            <Option value="tshirt">T-Shirts</Option>
            <Option value="jeans">Jeans</Option>
            <Option value="jackets">Jackets</Option>
            <Option value="shoes">Shoes</Option>
            <Option value="accessories">Accessories</Option>
          </Select> */}

          <Select
            value={gender}
            onChange={(value) => setGender(value)}
            placeholder="Select Gender"
            className="w-full mt-4"
            allowClear
          >
            <Option value="">All gender</Option>
            <Option value="man">Man</Option>
            <Option value="women">Women</Option>
            <Option value="kid">Kids</Option>
            <Option value="unisex">Unisex</Option>
          </Select>

          <Select
            value={sortDirection}
            onChange={(value) => setSortDirection(value)}
            placeholder="Sort by Price"
            className="w-full mt-4"
          >
            <Option value="asc">Price: Low to High</Option>
            <Option value="desc">Price: High to Low</Option>
          </Select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products?.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg relative min-h-[350px] max-h-[400px] flex flex-col justify-between"
            >
              
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-medium mb-2">{product.name}</h3>
              <p className="font-semibold text-lg text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
