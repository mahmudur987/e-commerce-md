import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { CompareContext } from "../../../context/CompareContext";
import { WishlistContext } from "../../../context/WishListContext";
import { useSiteSetting } from "../../../utils/Site";
import { imageUrl } from "../../../utils/axios";
import Cart from "../../Cart";
import SearchBox from "../../Helpers/SearchBox";
import Compair from "../../Helpers/icons/Compair";
import ThinBag from "../../Helpers/icons/ThinBag";
import ThinLove from "../../Helpers/icons/ThinLove";
import ThinPeople from "../../Helpers/icons/ThinPeople";
export default function Middlebar({ className, type }) {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { compareList } = useContext(CompareContext);
  const { data, isError, isLoading } = useSiteSetting();
  const [logo, setLogo] = useState(null);
  useEffect(() => {
    setLogo(imageUrl + data?.com_logo);
  }, [data]);
  console.log(logo);
  return (
    <div className={`w-full h-[86px] bg-white ${className}`}>
      <div className="container-x mx-auto h-full">
        <div className="relative h-full">
          <div className="flex justify-between items-center h-full">
            <div className="cursor-pointer">
              {type === 3 ? (
                <Link href="/">
                  <img
                    width="152"
                    height="36"
                    src={logo ? logo : `/assets/images/logo-3.svg`}
                    alt="logo"
                  />
                </Link>
              ) : type === 4 ? (
                <Link href="/">
                  <img
                    width="152"
                    height="36"
                    src={logo ? logo : `/assets/images/logo-4.svg`}
                    alt="logo"
                  />
                </Link>
              ) : (
                <Link href="/">
                  <img
                    width="152"
                    height="36"
                    src={logo ? logo : `/assets/images/logo.png`}
                    alt="logo"
                  />
                </Link>
              )}
            </div>
            <div className="w-[517px] h-[44px]">
              <SearchBox type={type} className="search-com" />
            </div>
            <div className="flex space-x-6 items-center">
              <div className="compaire relative">
                <Link href="/products-compaire" passHref>
                  <>
                    <span>
                      <Compair />
                    </span>
                  </>
                </Link>
                {compareList.length > 0 && (
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                    }`}
                  >
                    {compareList.length}
                  </span>
                )}
              </div>
              <div className="favorite relative">
                <Link href="/wishlist" passHref>
                  <>
                    <span>
                      <ThinLove />
                    </span>
                  </>
                </Link>
                {wishlist.length > 0 && (
                  <span
                    className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                      type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                    }`}
                  >
                    {wishlist ? wishlist.length : ""}
                  </span>
                )}
              </div>
              <div className="cart-wrapper group relative py-4">
                <div className="cart relative cursor-pointer">
                  <Link href="/cart" passHref>
                    <>
                      <span>
                        <ThinBag />
                      </span>
                    </>
                  </Link>
                  {cart.length > 0 && (
                    <span
                      className={`w-[18px] h-[18px] rounded-full  absolute -top-2.5 -right-2.5 flex justify-center items-center text-[9px] ${
                        type === 3 ? "bg-qh3-blue text-white" : "bg-qyellow"
                      }`}
                    >
                      {cart.length > 0 ? cart.length : ""}
                    </span>
                  )}
                </div>
                <Cart
                  type={type}
                  className="absolute -right-[45px] top-11 z-50 hidden group-hover:block"
                />
              </div>
              <div>
                <Link href="/profile#dashboard" passHref>
                  <>
                    <span>
                      <ThinPeople />
                    </span>
                  </>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
