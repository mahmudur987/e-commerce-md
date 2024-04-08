// components/SearchResultsContainer.js

import React from "react";
import NoDataToShow from "../../Error/NoData";

const SearchResultsContainer = ({ products }) => {
  return (
    <div className=" w-full flex flex-col gap-6 bg-white">
      {products.length === 0 && <NoDataToShow message={"No Result"} />}

      {products.length > 0 &&
        products?.map((product) => (
          <div
            key={product.id}
            className=" bg-gray-100 shadow-md p-4 rounded-lg w-full flex justify-around gap-3"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 rounded-lg"
            />
            <div className="w-1/2">
              <h2 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-gray-600 text-end ">${product.price}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default SearchResultsContainer;
