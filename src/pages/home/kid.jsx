import React, { useEffect, useState } from "react";
import { getKidProducts } from "../../api/product";
import { Link } from "react-router-dom";
import { Badge, Select } from "antd";

const { Option } = Select;

const Kid = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");

  const fetchProducts = async () => {
    try {
      const response = await getKidProducts(category, sortDirection);
      setProducts(response);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, sortDirection]);

  useEffect(() => {
    document.title = "XShop - Kids products";
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Kid's Products</h2>
      <div className="flex gap-4">
        <div className="w-80">
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
            value={sortDirection}
            onChange={(value) => setSortDirection(value)}
            placeholder="Sort by Price"
            className="w-full mt-4"
          >
            <Option value="asc">Price: Low to High</Option>
            <Option value="desc">Price: High to Low</Option>
          </Select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/product-detail/${product.id}`}
              className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg relative min-h-[350px] flex flex-col justify-between"
            >
              {/* {product.category && (
                <Badge
                  count={product.category}
                  style={{
                    backgroundColor: "#52c41a",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  className="absolute top-2 left-2 z-10"
                />
              )} */}
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full h-80 object-cover rounded-lg mb-4"
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

export default Kid;
