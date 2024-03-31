import { useEffect, useState } from "react";
import { useGetAllCategories } from "../../utils/Site";
import {
  useGetAllProduct,
  useGetNewProducts,
  useGetPopularProducts,
  useGetTopSellingProducts,
} from "../../utils/products";
import ErrorComponent from "../Error/ErrorComponent";
import SectionStyleOne from "../Helpers/SectionStyleOne";
import SectionStyleThree from "../Helpers/SectionStyleThree";
import SectionStyleTwo from "../Helpers/SectionStyleTwo";
import ViewMoreTitle from "../Helpers/ViewMoreTitle";
import LoadingSpinner from "../Loader/LoadingSpinar";
import Layout from "../Partials/Layout";
import Ads from "./Ads";
import Banner from "./Banner";
import BestSellers from "./BestSellers";
import BrandSection from "./BrandSection";
import ProductsAds from "./ProductsAds";

export default function Home() {
  const {
    data: TopSelling,
    isLoading: TpLoading,
    isError: TpIsError,
    error: TpError,
  } = useGetTopSellingProducts();
  const [category, setCategory] = useState({});

  const {
    data: categories,
    isLoading: categoryLoading,
    isError: categoryIsError,
    error: categoryError,
  } = useGetAllCategories();
  const {
    data: products,
    isLoading: productsLoading,
    isError: productsIsError,
    error: productsError,
  } = useGetAllProduct();

  const {
    data: popularProducts,
    isLoading: ppIsLoading,
    isError: ppIsError,
    error: ppError,
  } = useGetPopularProducts();
  const {
    data: NewProducts,
    isLoading: npIsLoading,
    isError: npIsError,
    error: npError,
  } = useGetNewProducts();

  // const brands = products?.map((x) => x.brand_name);

  // useEffect(() => {
  //   if (categories) {
  //     const randomIndex = Math.floor(Math.random() * categories?.length);
  //     const randomObject = categories[4];
  //     setCategory(randomObject);
  //   }
  // }, [categories]);

  const [ads, setAds] = useState(false);
  const adsHandle = () => {
    setAds(false);
  };
  useEffect(() => {
    setAds(false);
  }, []);
  return (
    <>
      <Layout>
        {ads && <Ads handler={adsHandle} />}
        <Banner className="banner-wrapper mb-[60px]" />
        <SectionStyleOne
          products={products}
          brands={null}
          categoryTitle="Mobile & Tablet"
          sectionTitle="Products"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
          categories={null}
          endLength={4}
          loading={productsLoading}
          isError={productsIsError}
          error={productsError}
        />
        <BrandSection
          sectionTitle=" Brand"
          className="brand-section-wrapper mb-[60px]"
        />
        {/* <CampaignCountDown
          className="mb-[60px]"
          lastDate="2024-03-04 4:00:00"
        /> */}

        {/* top selling */}
        <ViewMoreTitle
          className="top-selling-product mb-[60px]"
          seeMoreUrl="/all-products"
          categoryTitle="Top Selling Products"
        >
          {TpLoading && <LoadingSpinner />}
          {TpIsError && (
            <ErrorComponent message={TpError ? TpError.message : "Error"} />
          )}

          {TopSelling && !TpLoading && !TpIsError && (
            <SectionStyleTwo products={TopSelling} endLength={4} />
          )}
        </ViewMoreTitle>

        {/* best seller */}
        <ViewMoreTitle
          className="best-sallers-section mb-[60px]"
          seeMoreUrl="/sallers"
          categoryTitle="Best Saller"
        >
          <BestSellers />
        </ViewMoreTitle>

        {/* add */}

        <ProductsAds
          ads={[`/assets/images/ads-1.png`, `/assets/images/ads-2.png`]}
          sectionHeight="sm:h-[295px] h-full"
          className="products-ads-section mb-[60px]"
        />

        <SectionStyleOne
          categoryBackground={`/assets/images/section-category-2.jpg`}
          products={popularProducts}
          brands={null}
          categoryTitle="Electronics"
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
          categories={null}
          endLength={4}
          loading={ppIsLoading}
          isError={ppIsError}
          error={ppError}
        />

        {/* <ProductsAds
          ads={[`/assets/images/ads-3.png`]}
          className="products-ads-section mb-[60px]"
          sectionHeight="sm:h-[295px] h-full"
        /> */}

        {/* new arrival */}
        <SectionStyleThree
          products={NewProducts}
          sectionTitle="New Arrivals"
          seeMoreUrl="/all-products"
          className="new-products mb-[60px]"
          loading={npIsLoading}
          isError={npIsError}
          error={npError}
          endLength={null}
        />
        {/* <ProductsAds
          sectionHeight="sm:h-[195px] h-full"
          ads={[`/assets/images/ads-4.png`]}
          className="products-ads-section mb-[60px]"
        /> */}

        {/* again popular sells */}
        {/* <SectionStyleFour
          products={products}
          sectionTitle="Popular Sales"
          seeMoreUrl="/all-products"
          className="category-products mb-[60px]"
          loading={npIsLoading}
          isError={npIsError}
          error={npError}
          endLength={null}
        /> */}
      </Layout>
    </>
  );
}
