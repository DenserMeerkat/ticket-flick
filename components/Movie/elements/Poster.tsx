import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import Image from "next/image";

const Poster = (props: any) => {
  const movie = props.movie;
  const poster = `/images/poster/${movie.id}_poster.jpg`;
  return (
    <div className="min-w-[80px] sm:min-w-[120px] w-[20%] max-w-[240px] xl:max-w-[280px] aspect-[2/3]">
      <AspectRatio
        className="rounded-sm md:rounded-lg overflow-clip border shadow-lg"
        ratio={2 / 3}
      >
        <Image
          key={`${movie.id}+poster`}
          src={poster}
          blurDataURL={poster.replace("images", "min_images")}
          placeholder="blur"
          alt="Movie Poster"
          layout="fill"
        ></Image>
      </AspectRatio>
    </div>
  );
};

export default Poster;
