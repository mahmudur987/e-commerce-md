import { useEffect, useState } from "react";

import { useGetAllCategories, useGetCategoryProduct } from "../../utils/Site";
import CategoryCard from "./Cards/CategoryCard";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  brands = [],
  products = [],
  categoryBackground,
}) {
  const filterBrands = brands.filter(
    (value, index, array) => array.indexOf(value) === index
  );
  const [productLength] = useState(3);

  const [category, setCategory] = useState({});

  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useGetAllCategories();
  const {
    data: allProducts,
    isLoading: productsLoading,
    isError: productsIsError,
    error: productsError,
  } = useGetCategoryProduct(category ? category?.name : "");
  const productsBrand = allProducts?.map((x) => x.brand_name);
  console.log(allProducts);

  useEffect(() => {
    if (categories) {
      const randomIndex = Math.floor(Math.random() * categories?.length);
      const randomObject = categories[4];
      setCategory(randomObject);
    }
  }, [categories]);

  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            <div className="category-card hidden xl:block w-full">
              {categories &&
                allProducts &&
                !categoryLoading &&
                !productsLoading && (
                  <CategoryCard
                    background={
                      allProducts
                        ? allProducts[allProducts.length - 1]?.image
                        : ""
                    }
                    title={category ? category.name : ""}
                    brands={productsBrand}
                  />
                )}
            </div>
            <DataIteration
              datas={products}
              startLength={0}
              endLength={productLength}
            >
              {({ datas }) => (
                <div key={datas.id} className="item">
                  <ProductCardStyleOne datas={datas} />
                </div>
              )}
            </DataIteration>
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
