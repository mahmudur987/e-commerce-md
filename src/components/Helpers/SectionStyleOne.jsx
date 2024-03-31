import ErrorComponent from "../Error/ErrorComponent";
import LoadingSpinner from "../Loader/LoadingSpinar";
import CategoryCard from "./Cards/CategoryCard";
import ProductCardStyleOne from "./Cards/ProductCardStyleOne";
import DataIteration from "./DataIteration";
import ViewMoreTitle from "./ViewMoreTitle";

export default function SectionStyleOne({
  className,
  categoryTitle,
  sectionTitle,
  seeMoreUrl,
  products,
  brands,
  categories,
  categoryBackground,
  endLength,
  loading,
  isError,
  error,
}) {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <ErrorComponent message={error ? error.message : "Error "} />;
  }

  return (
    <div data-aos="fade-up" className={`section-style-one ${className || ""}`}>
      <ViewMoreTitle categoryTitle={sectionTitle} seeMoreUrl={seeMoreUrl}>
        <div className="products-section w-full">
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5">
            {categories && (
              <div className="category-card hidden xl:block w-full">
                {categories && (
                  <CategoryCard
                    background={
                      products ? products[products.length - 1]?.image : ""
                    }
                    title={categories ? categories[4].name : ""}
                    brands={brands}
                  />
                )}
              </div>
            )}
            {products && products?.length > 0 && (
              <DataIteration
                datas={products}
                startLength={0}
                endLength={endLength ? endLength : 3}
              >
                {({ datas }) => (
                  <div key={datas.id} className="item">
                    <ProductCardStyleOne datas={datas} />
                  </div>
                )}
              </DataIteration>
            )}
          </div>
        </div>
      </ViewMoreTitle>
    </div>
  );
}
