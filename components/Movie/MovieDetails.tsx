"use client";
import { calcRunTime, getMovieById } from "@/lib/movieUtils";
import React, { useState, useContext } from "react";
import NotFoundPage from "@/app/movie/404";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { useSearchParams } from "next/navigation";
import Genres from "@/components/Movie/elements/Genres";
import Directors from "@/components/Movie/elements/Directors";
import Poster from "@/components/Movie/elements/Poster";
import Banner from "@/components/Movie/elements/Banner";
import { Toggle } from "@/components/ui/toggle";
import { Volume, VolumeX } from "lucide-react";

export default function MovieDetails(props: any) {
  const state = useContext(AppStateContext);
  const movies = state!.movieList;
  const [isMuted, setIsMuted] = useState(true);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  if (id === undefined || id == null) return <NotFoundPage />;
  const movie = getMovieById(parseInt(id), movies);
  if (movie === undefined) return <NotFoundPage />;
  const runTime = calcRunTime(parseInt(movie.runTime));
  const certificate = movie.certification;
  const year = movie.year;
  const rating = movie.rating;
  const stars = movie.stars;

  function onPressedChangeMute(value: boolean) {
    setIsMuted(value);
  }

  return (
    <div className="h-max min-h-[70vh] w-full  relative">
      <div className="absolute right-0 w-[75%] md:w-[70%] aspect-[16/9] z-[-2] bg-gradient-to-r from-white via-transparent dark:from-zinc-950 to-transparent"></div>
      <div className="absolute right-0 w-[75%] md:w-[70%] aspect-[16/9] z-[-2] bg-gradient-to-t from-white via-transparent dark:from-zinc-950 to-transparent"></div>
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
      <Banner movie={movie} isMuted={isMuted} />
      <div className="max-w-7xl xl:mx-auto lg:flex md:items-center xl:items-end px-2  sm:px-4 md:pr-8 py-6 sm:py-8 md:py-12 lg:pt- xl:pt-24">
        <Poster movie={movie} />
        <div className="lg:ml-8 xl:ml-12">
          <h1 className="mt-8 md:mt-6 text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] xl:text-[2.75rem] font-bold">
            {movie.name}
          </h1>
          <div className="my-2 md:my-4 lg:my-6 flex items-center font-medium  dark:font-semibold text-xs md:text-base text-zinc-500 dark:text-zinc-500">
            <div className="ml-0.5 md:ml-1 w-fit min-w-[28px] p-1 py-0.5 md:p-1 border md:border-2 rounded-sm  bg-background flex justify-center">
              <p className="tracking-wider text-[0.5rem] md:text-xs font-medium  dark:font-semibold text-zinc-500 dark:text-zinc-500 ">
                {certificate}
              </p>
            </div>
            <p className="  ml-6">{`IMDb ${rating}`}</p>
            <p className="ml-4">{runTime}</p>
            <p className="ml-4">{year}</p>
          </div>
          <Genres genres={movie.genre} />
          <p className="mt-4 md:mt-8 font-medium dark:font-normal text-xs md:text-base tracking-wider max-w-3xl">
            {movie.description.join(" ")}
          </p>
          <Directors directors={movie.director} />
        </div>
      </div>
    </div>
  );
}
