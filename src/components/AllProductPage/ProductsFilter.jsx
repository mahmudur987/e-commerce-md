// import InputRange from "react-input-range";
// import "react-input-range/lib/css/index.css";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useGetAllCategories, useGetCategoryFeatures } from "../../utils/Site";
import { useGetAllBrands } from "../../utils/products";
import Checkbox from "../Helpers/Checkbox";
export default function ProductsFilter({
  filters,
  brandHandler,
  volume,
  volumeHandler,
  storage,
  filterstorage,
  className,
  filterToggle,
  filterToggleHandler,
  categoryName,
  setCategoryName,
  selectedBrands,
  setSelectedBrands,
  featuresHandler,
  selectedFeatures,
}) {
  const {
    data: categories,
    isLoading: categoryIsLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useGetAllCategories();
  const {
    data: brands,
    isLoading: brandsIsLoading,
    isError: brandsIsError,
    error: brandsError,
  } = useGetAllBrands();

  const { data: features, isLoading: featuresIsLoading } =
    useGetCategoryFeatures(categoryName);

  return (
    <>
      <div
        className={`filter-widget w-full fixed lg:relative left-0 top-0 h-screen z-10 lg:h-auto overflow-y-scroll lg:overflow-y-auto bg-white px-[30px] pt-[40px] ${
          className || ""
        }  ${filterToggle ? "block" : "hidden lg:block"}`}
      >
        {/* categories */}
        <div className="filter-subject-item pb-10 border-b border-qgray-border">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">
              Product categories
            </h1>
          </div>
          <div className="filter-items">
            <ul>
              {categories &&
                !categoryIsLoading &&
                !categoryIsError &&
                categories.map((item, i) => (
                  <li
                    key={i}
                    className="item flex justify-between items-center mb-5"
                  >
                    <div className="flex space-x-[14px] items-center">
                      <div>
                        <Checkbox
                          id={item.name}
                          name={item.name}
                          handleChange={(e) => setCategoryName(e.target.name)}
                          checked={item.name === categoryName}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="gaming"
                          className="text-xs font-black font-400 capitalize"
                        >
                          {item.name}
                        </label>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* price range */}

        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Price Range</h1>
          </div>
          <div className="price-range mb-5">
            <RangeSlider
              value={volume}
              onInput={volumeHandler}
              min={0}
              max={10000}
            />
          </div>
          <p className="text-xs text-qblack font-400">
            Price: {volume[0]} - {volume[1]}
          </p>
        </div>

        {/* brands */}

        <div className="filter-subject-item pb-10 border-b border-qgray-border mt-10">
          <div className="subject-title mb-[30px]">
            <h1 className="text-black text-base font-500">Brands</h1>
          </div>
          <div className="filter-items">
            <ul>
              {brands &&
                !brandsIsLoading &&
                !brandsIsError &&
                brands.map((item, i) => {
                  return (
                    <li
                      className="item flex justify-between items-center mb-5"
                      key={i}
                    >
                      <div className="flex space-x-[14px] items-center">
                        <div>
                          <Checkbox
                            id={item.name}
                            name={item.name}
                            handleChange={(e) => brandHandler(e)}
                            checked={selectedBrands[item.name.toLowerCase()]}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={item.name.toLowerCase()} // Use lowercase name as ID
                            className="text-xs font-black font-400 capitalize"
                          >
                            {item.name} ({item.total_products})
                          </label>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>

        {features &&
          features.length > 0 &&
          !featuresIsLoading &&
          features.map((item, i) => (
            <div key={i} className="filter-subject-item pb-10 mt-10">
              <div className="subject-title mb-[30px]">
                <h1 className="text-black text-base font-500">
                  {Object.keys(item)}
                </h1>
              </div>
              <div className="filter-items">
                <ul>
                  {Object.values(item)[0]?.map((x, i) => (
                    <li
                      key={i}
                      className="item flex justify-between items-center mb-5"
                    >
                      <div className="flex space-x-[14px] items-center">
                        <div>
                          <Checkbox
                            id={x}
                            name={x}
                            checked={selectedFeatures[
                              Object.keys(item)[0]
                            ]?.includes(x)}
                            handleChange={(e) =>
                              featuresHandler(Object.keys(item)[0], x)
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="sizeS"
                            className="text-xs font-black font-400 capitalize"
                          >
                            {x}
                          </label>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        <button
          onClick={filterToggleHandler}
          type="button"
          className="w-10 h-10 fixed top-5 right-5 z-50 rounded  lg:hidden flex justify-center items-center border border-qred text-qred"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
