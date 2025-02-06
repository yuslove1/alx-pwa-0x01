import React from "react";
import { MovieProps } from "@/interfaces/index";
import Image from "next/image";

const MovieCard: React.FC<MovieProps> = ({
  posterImage,
  releaseYear,
  title,
}) => {
  const pPhoto = posterImage ? posterImage : "https://m.media-amazon.com/images/M/MV5BMWQ3ZmU1ZDEtZDE5Yy00ZGZiLTlmYTAtMmQ0N2MwMmI5Y2UyXkEyXkFqcGc@._V1_.jpg";
  return (
    <div className="h-[563px]">
      <div>
        <Image
          className="h-[430px] w-full rounded-md hover:cursor-pointer"
          src={pPhoto}
          width={100}
          height={100}
          alt={title}
        />
      </div>
      <div className="flex justify-between py-4">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-xl text-[#E2D609]">{releaseYear}</p>
      </div>
    </div>
  );
};

export default MovieCard;
