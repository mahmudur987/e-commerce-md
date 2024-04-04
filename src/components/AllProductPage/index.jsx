import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useGetAllProduct } from "../../utils/products";
import BreadcrumbCom from "../BreadcrumbCom";
import ErrorComponent from "../Error/ErrorComponent";
import NoDataToShow from "../Error/NoData";
import ProductCardStyleOne from "../Helpers/Cards/ProductCardStyleOne";
import DataIteration from "../Helpers/DataIteration";
import LoadingSpinner from "../Loader/LoadingSpinar";
import Layout from "../Partials/Layout";
import ProductsFilter from "./ProductsFilter";
export default function AllProductPage() {
  const [filter, setFilter] = useState(null);
  const router = useRouter();
  const { category } = router.query;
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProduct(filter);
  const [volume, setVolume] = useState([30, 60]);
  const [filterToggle, setToggle] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState({});
  let queryString = Object.entries(selectedFeatures)
    .map(([featureType, values]) => `${featureType}=${values.join(",")}`)
    .join("&");

  const fullFilterString = `${categoryName ? `category=${categoryName}` : ""}${
    selectedBrands.length > 0 ? `&brand=${selectedBrands}` : ""
  }${queryString ? `&${queryString}` : ""}`;

  useEffect(() => {
    if (fullFilterString) {
      setFilter(fullFilterString);
    }
  }, [fullFilterString]);
  useEffect(() => {
    if (category) {
      setCategoryName(category);
    }
  }, [category]);

  const brandHandler = (e) => {
    const { name, value } = e.target;
    setSelectedBrands(name);
  };
  const featuresHandler = (featureType, value) => {
    setSelectedFeatures((prevState) => {
      const isSelected = prevState[featureType]?.includes(value);
      let updatedSelections = { ...prevState };

      if (isSelected) {
        updatedSelections[featureType] = prevState[featureType].filter(
          (item) => item !== value
        );
      } else {
        updatedSelections[featureType] = [
          ...(prevState[featureType] || []),
          value,
        ];
      }

      return updatedSelections;
    });
  };

  return (
    <>
      <Layout>
        <div className="products-page-wrapper w-full">
          <div className="container-x mx-auto">
            <BreadcrumbCom />
            <div className="w-full lg:flex lg:space-x-[30px]">
              <div className="lg:w-[270px]">
                <ProductsFilter
                  categoryName={categoryName}
                  setCategoryName={setCategoryName}
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  featuresHandler={featuresHandler}
                  selectedFeatures={selectedFeatures}
                  filterToggle={filterToggle}
                  filterToggleHandler={() => setToggle(!filterToggle)}
                  brandHandler={brandHandler}
                  volume={volume}
                  volumeHandler={(value) => setVolume(value)}
                  className="mb-[30px]"
                />
                {/* ads */}
                {/* <div className="w-full hidden lg:block h-[295px]">
                  <img
                    src={`/assets/images/ads-5.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
              </div>

              <div className="flex-1">
                <div className="products-sorting w-full bg-white md:h-[70px] flex md:flex-row flex-col md:space-y-0 space-y-5 md:justify-between md:items-center p-[30px] mb-[40px]">
                  <div>
                    <p className="font-400 text-[13px]">
                      <span className="text-qgray"> Showing</span> 1–{" "}
                      {products?.length} {"  "}
                      results
                    </p>
                  </div>
                  <div className="flex space-x-3 items-center">
                    <span className="font-400 text-[13px]">Sort by:</span>
                    <div className="flex space-x-3 items-center border-b border-b-qgray">
                      <span className="font-400 text-[13px] text-qgray">
                        Default
                      </span>
                      <span>
                        <svg
                          width="10"
                          height="6"
                          viewBox="0 0 10 6"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M1 1L5 5L9 1" stroke="#9A9A9A" />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setToggle(!filterToggle)}
                    type="button"
                    className="w-10 lg:hidden h-10 rounded flex justify-center items-center border border-qyellow text-qyellow"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                      />
                    </svg>
                  </button>
                </div>
                {isLoading && <LoadingSpinner />}
                {isError && (
                  <ErrorComponent message={error ? error.message : "Error"} />
                )}
                <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1  xl:gap-[30px] gap-5 mb-[40px]">
                  {products && products.length > 0 && (
                    <DataIteration
                      datas={products}
                      startLength={0}
                      endLength={products?.length}
                    >
                      {({ datas, i }) => (
                        <div data-aos="fade-up" key={i + Math.random()}>
                          <ProductCardStyleOne datas={datas} />
                        </div>
                      )}
                    </DataIteration>
                  )}

                  {!isError && !isLoading && products.length === 0 && (
                    <div className="col-span-full">
                      <NoDataToShow
                        message={"There is no product to display"}
                      />
                    </div>
                  )}
                </div>

                {/* below banner */}
                {/* <div className="w-full h-[164px] overflow-hidden mb-[40px]">
                  <img
                    src={`/assets/images/ads-6.png`}
                    alt=""
                    className="w-full h-full object-contain"
                  />
                </div> */}
                {/* below */}
                {/* <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 xl:gap-[30px] gap-5 mb-[40px]">
                  <DataIteration
                    datas={products}
                    startLength={6}
                    endLength={products?.length}
                  >
                    {({ datas }) => (
                      <div data-aos="fade-up" key={datas.id}>
                        <ProductCardStyleOne datas={datas} />
                      </div>
                    )}
                  </DataIteration>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
