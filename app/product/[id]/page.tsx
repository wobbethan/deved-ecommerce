import React from "react";
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import AddCart from "./AddCart";
export default async function Product({ searchParams }) {
  return (
    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-16">
      <Image
        src={searchParams.image}
        alt={searchParams.name}
        width={800}
        height={800}
        className="w-full rounded-lg"
        priority={true}
      />
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
