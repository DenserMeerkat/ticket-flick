import React from "react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";
import { getMovieById } from "@/lib/movieUtils";
import Image from "next/legacy/image";

const CarouselItem = (props: any) => {
  const title = props.title;
  const id = props.id;
  const movie = getMovieById(id)!;
  const poster = `/images/poster/${id}_poster.jpg`;
  const banner = `/images/banner/${id}_banner.jpg`;
  return (
    <Link href={`/movie/${id}`}>
      <div className="border bg-zinc-100 dark:bg-zinc-800 rounded-sm md:rounded-md overflow-clip mr-2 md:mr-3 lg:mr-4">
        <AspectRatio
          ratio={16 / 9}
          className="flex items-center justify-center relative"
        >
          <Image
            className="z-0"
            key={`${movie.id}+banner`}
            src={banner}
            blurDataURL={banner.replace("images", "min_images")}
            placeholder="blur"
            alt="Movie Banner"
            layout="fill"
          ></Image>
          <div className="absolute inset-0 z-[1] bg-gradient-to-t from-zinc-950 to-transparent" />
          <p className="absolute left-2 bottom-2 z-10 hidden md:block text-xs lg:text-base tracking-wider font-semibold select-none text-white">
            {movie.name}
          </p>
        </AspectRatio>
      </div>
    </Link>
  );
};

export default CarouselItem;
