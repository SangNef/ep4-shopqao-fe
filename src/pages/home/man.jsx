import React, { useEffect, useState } from "react";
import { getManProducts } from "../../api/product";
import { Link } from "react-router-dom";
import { Badge, Select } from "antd";
import { getCategories } from "../../api/category";

const { Option } = Select;

const Man = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getManProducts(category, sortDirection);
      setProducts(response);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [category, sortDirection]);

  useEffect(() => {
    document.title = "XShop - Man products";
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Men's Products</h2>
      <div className="flex gap-4">
        <div className="w-80">
          <Select
            value={category}
            onChange={(value) => setCategory(value)}
            placeholder="Select Category"
            className="w-full"
            allowClear
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.name}>
                {category.name}
              </Option>
            ))}
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

        <div className="grid flex-1 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

export default Man;
