import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { WishlistContext } from "../../context/WishListContext";

export default function InputQuantityCom({ data, wishList }) {
  const { increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const { increaseWishListQuantity, decreaseWishListQuantity } =
    useContext(WishlistContext);
  const increment = () => {
    if (wishList) {
      return increaseWishListQuantity(data.id);
    }

    increaseQuantity(data.id);
  };
  const decrement = () => {
    if (wishList) {
      if (data.quantity > 1) {
        decreaseWishListQuantity(data.id);
      }
    }
    if (data.quantity > 1) {
      decreaseQuantity(data.id);
    }
  };
  return (
    <div className="w-[120px] h-[40px] px-[26px] flex items-center border border-qgray-border">
      <div className="flex justify-between items-center w-full">
        <button
          onClick={decrement}
          type="button"
          className="text-base text-qgray"
        >
          -
        </button>
        <span className="text-qblack">{data ? data?.quantity : 0}</span>
        <button
          onClick={increment}
          type="button"
          className="text-base text-qgray"
        >
          +
        </button>
      </div>
    </div>
  );
}
