import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from "react";
import VideoPlayer from "@/components/Movie/elements/VideoPlayer";
import Image from "next/image";

const Banner = (props: any) => {
  const movie = props.movie;
  const isMuted = props.isMuted;
  const banner = `/images/banner/${movie.id}_banner.jpg`;
  return (
    <div className="absolute right-0 w-[75%] md:w-[70%] z-[-5]">
      {movie.video != "" ? (
        <AspectRatio
          className="relative w-full border-l border-b border-white dark:border-zinc-950"
          ratio={16 / 9}
        >
          <VideoPlayer videoLink={movie.video} isMuted={isMuted} />
        </AspectRatio>
      ) : (
        <AspectRatio
          className="relative w-full border-l border-b border-white dark:border-zinc-950"
          ratio={16 / 9}
        >
          <Image
            key={`${movie.id}+banner`}
            src={banner}
            alt="Movie Banner"
            blurDataURL={banner.replace("images", "min_images")}
            placeholder="blur"
            layout="fill"
          ></Image>
        </AspectRatio>
      )}
    </div>
  );
};

export default Banner;
