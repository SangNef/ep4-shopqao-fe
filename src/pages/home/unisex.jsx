import React, { useEffect, useState } from 'react';
import { getUnisexProducts, getWomanProducts } from '../../api/product';
import { Link } from 'react-router-dom';

const Man = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await getUnisexProducts();
            setProducts(response);
        } catch (error) {
            console.error('Failed to fetch products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Unisex's Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product-detail/${product.id}`}
                        className="border border-gray-300 rounded-lg p-4 bg-white shadow-lg"
                    >
                        <img
                            src={product.imageUrls[0]} // Display first image
                            alt={product.name}
                            className="w-full h-auto rounded-lg mb-4"
                        />
                        <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                        <p className="font-semibold text-lg text-gray-600">${product.price}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Man;
