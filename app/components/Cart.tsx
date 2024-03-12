"use client";
import Image from "next/image";
import { useCartStore } from "@/store";
import formatPrice from "@/util/PriceFormat";
import { IoAddCircle, IoRemoveCircle } from "react-icons/io5";
import basket from "../../public/basket.png";
import { format } from "path";
export default function Cart() {
  const cartStore = useCartStore();
  const totalPrice = cartStore.cart.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return (
    <div
      className="fixed w-full h-screen left-0 top-0 bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white absolute right-0 top-0 w-1/4 h-screen p-12 overflow-y-scroll text-gray-700"
      >
        <h1>Shopping List</h1>
        {cartStore.cart.map((item) => (
          <div className="flex py-4 gap-4">
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              className="rounded-md h-24"
            ></Image>
            <div>
              <h2>{item.name}</h2>
              <div className="flex gap-2 ">
                <h2>
                  Quantity: {item.quantity}{" "}
                  <button
                    onClick={() =>
                      cartStore.removeProduct({
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        unit_amount: item.unit_amount,
                        quantity: item.quantity,
                      })
                    }
                  >
                    <IoRemoveCircle />
                  </button>
                  <button
                    onClick={() =>
                      cartStore.addProduct({
                        id: item.id,
                        image: item.image,
                        name: item.name,
                        unit_amount: item.unit_amount,
                        quantity: item.quantity,
                      })
                    }
                  >
                    <IoAddCircle />
                  </button>
                </h2>
              </div>
              <p className="text-sm">
                {item.unit_amount && formatPrice(item.unit_amount)}
              </p>
            </div>
          </div>
        ))}
        {/* Checkout / Total */}
        {cartStore.cart.length > 0 && (
          <>
            <p>Total: {totalPrice && formatPrice(totalPrice)}</p>

            <button className="py-2 mt-4 bg-teal-700 w-full rounded-md text-white">
              Checkout
            </button>
          </>
        )}
        {!cartStore.cart.length && (
          <div className="flex flex-col items-center gap-12 text-2xl pt-56 font-medium opacity-75">
            <h1>Cart is empty </h1>
            <Image
              src={basket}
              alt="empty basket"
              width={200}
              height={200}
            ></Image>
          </div>
        )}
      </div>
    </div>
  );
}
