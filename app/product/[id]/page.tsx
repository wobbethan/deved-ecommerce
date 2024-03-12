import React from "react";
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";
export default async function Product({ searchParams }) {
  return (
    <div className="flex justify-between gap-24 p-12 text-gray-700">
      <div>
        <Image
          src={searchParams.image}
          alt={searchParams.name}
          width={600}
          height={600}
        ></Image>
      </div>
      <div className="font-medium text-gray-700">
        <h1 className="text-2xl py-2">{searchParams.name}</h1>
        <p className="py-2">{searchParams.description}</p>
        <p className="py-2">{searchParams.features}</p>
        <div className="flex gap-2">
          <p className="font-bold text-teal-700">
            {searchParams.price && formatPrice(searchParams.price)}
          </p>
        </div>
        <AddCart {...searchParams} />
      </div>
    </div>
  );
}
