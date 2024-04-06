import Link from "next/link";
import placeHolderImage from "../../../../public/assets/images/card-1.svg";
import Compair from "../icons/Compair";
import QuickViewIco from "../icons/QuickViewIco";
import Star from "../icons/Star";
import ThinLove from "../icons/ThinLove";
import { calculateAverageRating } from "./ProductCardStyleOne";
import { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { WishlistContext } from "../../../context/WishListContext";
import { CompareContext } from "../../../context/CompareContext";
export default function ProductCardRowStyleTwo({ className, datas, type }) {
  const averageRating = calculateAverageRating(datas?.product_reviews);
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);
  const { addToCompare } = useContext(CompareContext);
  return (
    <div
      data-aos="fade-left"
      className={`product-row-card-style-one w-full h-[250px] bg-white group relative overflow-hidden ${
        className || ""
      }`}
    >
      <div className="flex space-x-5 items-center w-full h-full lg:p-[30px] sm:p-5 p-2">
        <div className="lg:w-1/2 w-1/3 h-full">
          <img
            src={datas.image ? datas.image : placeHolderImage}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center h-full">
          <div>
            {/* reviews */}
            {averageRating > 0 && (
              <div className="flex space-x-1 mb-3">
                {Array.from(Array(Math.floor(averageRating)), () => (
                  <span key={averageRating + Math.random()}>
                    <Star />
                  </span>
                ))}
              </div>
            )}
            <Link href="/single-product">
              <p className="title mb-2 sm:text-[15px] text-[13px] font-600 text-qblack leading-[24px] line-clamp-2 hover:text-qyellow cursor-pointer">
                {datas.name}
              </p>
            </Link>
            <p className="price mb-[26px]">
              <span className="main-price text-qgray line-through font-600 sm:text-[18px] text-base">
                {datas.offer_price ? datas.price : ""}
              </span>
              <span className="offer-price text-qred font-600 sm:text-[18px] text-base ml-2">
                {datas.offer_price ? datas.offer_price : datas.price}
              </span>
            </p>
            <button
              onClick={() => addToCart(datas)}
              type="button"
              className="w-[110px] h-[30px]"
            >
              <span className={type === 3 ? "blue-btn" : "yellow-btn"}>
                {" "}
                Add To Cart
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* quick-access-btns */}
      <div className="quick-access-btns flex flex-col space-y-2 absolute group-hover:right-4 -right-10 top-[30px]  transition-all duration-300 ease-in-out">
        <button>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <QuickViewIco />
          </span>
        </button>
        <button onClick={() => addToWishlist(datas)}>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <ThinLove />
          </span>
        </button>
        <button onClick={() => addToCompare(datas)}>
          <span className="w-10 h-10 flex justify-center items-center bg-primarygray rounded">
            <Compair />
          </span>
        </button>
      </div>
    </div>
  );
}
