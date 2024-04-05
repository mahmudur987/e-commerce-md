import { useContext } from "react";
import { CompareContext } from "../../context/CompareContext";
import NoDataToShow from "../Error/NoData";
import PageTitle from "../Helpers/PageTitle";
import Layout from "../Partials/Layout";

export default function ProductsCompare() {
  const { removeFromCompare, compareList } = useContext(CompareContext);
  const compareProducts = compareList;
  const features = compareProducts[0]?.product_features;
  console.log(compareProducts);
  return (
    <Layout childrenClasses="pt-0 pb-0">
      <div className="products-compaire-wrapper w-full bg-white pb-[40px]">
        <div className="w-full mb-5">
          <PageTitle
            breadcrumb={[
              { name: "home", path: "/" },
              { name: "compaire", path: "/products-compaire" },
            ]}
            title="Product Comparison"
          />
        </div>

        <div className="container-x mx-auto my-10 p-5">
          <div className="w-full border border-qgray-border p-5">
            <div className="grid grid-cols-4 gap-6 w-full">
              {compareProducts.length === 0 && (
                <NoDataToShow message={"No data to show"} />
              )}

              <div className=" flex flex-col  gap-5 ">
                {compareProducts && compareProducts.length > 0 && (
                  <div className="  min-h-[161px] flex justify-center items-center">
                    <p className="w-full text-center">Image</p>
                  </div>
                )}
                {compareProducts && compareProducts.length > 0 && (
                  <div className=" h-full flex justify-center items-center">
                    <h1 className="text-[15px] font-medium text-qblack ">
                      category
                    </h1>
                  </div>
                )}
                {compareProducts &&
                  compareProducts.length > 0 &&
                  features?.map((x) => (
                    <div
                      key={x._id}
                      className=" h-full flex justify-center items-center"
                    >
                      <h1 className="text-[15px] font-medium text-qblack ">
                        {x.feature}
                      </h1>
                    </div>
                  ))}
              </div>

              {/* Products 1 */}
              {compareProducts.length > 0 &&
                compareProducts?.map((x) => (
                  <div key={x?.id} className="flex flex-col  gap-5">
                    <figure className="w-[161px] h-[161px]">
                      <img
                        src={x?.image ?? `/assets/images/product-img-15.jpg`}
                        alt=""
                        className="w-full h-full object-contain"
                      />
                    </figure>
                    <div className="">
                      <span className="text-[13px] font-normal text-qgraytwo">
                        {x?.category_name}
                      </span>
                    </div>
                    {x?.product_features.map((y) => (
                      <div key={y.id} className="">
                        <span className="text-[13px] font-normal text-qgraytwo">
                          {y.feature_value}
                        </span>
                      </div>
                    ))}

                    <button onClick={() => removeFromCompare(x.id)}>
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
