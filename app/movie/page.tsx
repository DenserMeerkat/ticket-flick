"use client";
import AppBar from "@/components/AppBar/AppBar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/legacy/image";
import { calcRunTime, getMovieById } from "@/lib/movieUtils";
import React, { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import NotFoundPage from "./404";
import { useSearchParams } from "next/navigation";
import YouTubePlayer from "@/components/Movie/VideoPlayer";
import { Toggle } from "@/components/ui/toggle";
import { Volume, VolumeX } from "lucide-react";

export default function MoviePage(props: any) {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id === undefined || id == null) return <NotFoundPage />;
  const movie = getMovieById(parseInt(id));
  if (movie === undefined) return <NotFoundPage />;
  const title = movie.name;
  const desc = movie.description.join(" ");
  const runTime = calcRunTime(parseInt(movie.runTime));
  const certificate = movie.certification;
  const year = movie.year;
  const rating = movie.rating;
  const genres = movie.genre;
  const stars = movie.stars;
  const directors = movie.director;
  const poster = `/images/poster/${id}_poster.jpg`;
  const banner = `/images/banner/${id}_banner.jpg`;
  const [isMuted, setIsMuted] = useState(true);

  function onPressedChangeMute(value: boolean) {
    setIsMuted(value);
  }

  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <div className="h-max min-h-[calc(100vh-8rem)] w-full  relative">
        <div className="absolute right-0 w-[70%] aspect-[16/9] z-[-2] bg-gradient-to-r from-white dark:from-zinc-950 to-transparent"></div>
        <div className="absolute right-0 w-[70%] aspect-[16/9] z-[-2] bg-gradient-to-t from-white dark:from-zinc-950 to-transparent"></div>
        <div className="absolute right-0 p-1 md:p-3 lg:p-4 xl:p-6 ">
          {movie.video != "" ? (
            <Toggle
              className="z-10 rounded-full bg-zinc-50/[0.5] data-[state=on]:bg-zinc-50 dark:bg-zinc-900/[0.5] data-[state=on]:dark:bg-zinc-800"
              size={"sm"}
              aria-label="Toggle mute"
              pressed={isMuted}
              onPressedChange={onPressedChangeMute}
            >
              {isMuted ? (
                <VolumeX className=" h-4 w-4" />
              ) : (
                <Volume className=" h-4 w-4" />
              )}
            </Toggle>
          ) : (
            <span></span>
          )}
        </div>
        <div className="absolute right-0 w-[70%] z-[-5]">
          {movie.video != "" ? (
            <AspectRatio
              className="relative w-full border-l border-b border-white dark:border-zinc-950"
              ratio={16 / 9}
            >
              <YouTubePlayer videoLink={movie.video} isMuted={isMuted} />
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
        <div className="max-w-7xl xl:mx-auto lg:flex md:items-center xl:items-end px-2 sm:px-4 md:px-8 py-6 sm:py-8 md:py-12">
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
          <div className="lg:ml-8 xl:ml-12">
            <h1 className="mt-8 md:mt-6 text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold">
              {title}
            </h1>
            <div className="my-2 md:my-4 lg:my-6 flex items-center dark:font-semibold text-xs md:text-base text-zinc-500 dark:text-zinc-500">
              <div className="ml-0.5 md:ml-1 w-fit min-w-[28px] p-1 py-0.5 md:p-1 border md:border-2 rounded-sm  bg-background flex justify-center">
                <p className="tracking-wider text-[0.5rem] md:text-xs dark:font-semibold text-zinc-500 dark:text-zinc-500 ">
                  {certificate}
                </p>
              </div>
              <p className="  ml-6">{`IMDb ${rating}`}</p>
              <p className="ml-4">{runTime}</p>
              <p className="ml-4">{year}</p>
            </div>
            <div className="ml-0.5 md:ml-1 flex items-center gap-0.5 md:gap-1 lg:gap-2 xl:gap-3">
              {genres.map((genre: string, index: number) => {
                return (
                  <Link
                    key={index}
                    href={`/genre/${genre.toLocaleLowerCase()}`}
                    className={`${buttonVariants({
                      variant: "outline",
                      size: "xs",
                    })} tracking-wider text-xs md:text-[0.8rem]`}
                  >
                    {genre}
                  </Link>
                );
              })}
            </div>
            <p className="mt-4 md:mt-8 text-xs md:text-base tracking-wider max-w-3xl">
              {desc}
            </p>
            <div className="ml-0.5 md:ml-1 mt-2 md:mt-4 flex items-center gap-2 md:gap-3 lg:gap-4">
              {directors.map((director: string, index: number) => {
                if (index < 2)
                  return (
                    <React.Fragment key={index}>
                      <Link
                        href={`/director/${director.toLocaleLowerCase()}`}
                        className={`${buttonVariants({
                          variant: "link",
                          size: "link",
                        })} tracking-wider text-xs`}
                      >
                        {director}
                      </Link>
                      {index < directors.length - 1 && index < 1 && (
                        <span className="text-gray-400"> • </span>
                      )}
                    </React.Fragment>
                  );
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
