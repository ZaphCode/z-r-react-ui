import { FC, useState } from "react";
import { Product } from "../../../models";

interface Props {
  product: Product;
}

export const ProductImageDisplay: FC<Props> = ({ product }) => {
  const [selectedImg, setSelectedImg] = useState("");

  return (
    <figure className="flex items-start justify-center px-5">
      <ul className="flex flex-col gap-4">
        {product &&
          product.images_url.map((imgSrc, i) => (
            <li
              className={` ${
                selectedImg === imgSrc ? "bg-gray-300" : "bg-gray-200"
              } shadow-xl shadow-gray-300 w-16 h-16`}
              onClick={() => setSelectedImg(imgSrc)}
              key={i}
            >
              <img
                src={imgSrc}
                className="h-full w-full mix-blend-multiply object-cover"
                alt="small photos"
              />
            </li>
          ))}
      </ul>
      <div className="bg-gray-200 shadow-lg shadow-gray-300 overflow-hidden md:h-96 w-full max-w-xs lg:max-w-sm h-80 ml-7">
        <img
          src={selectedImg == "" ? product.images_url[0] : selectedImg}
          className="mix-blend-multiply object-cover w-full h-full"
          alt="big photo"
        />
      </div>
    </figure>
  );
};
