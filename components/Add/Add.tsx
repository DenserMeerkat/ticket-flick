"use client";
import React, { useContext } from "react";
import { AppStateContext } from "../utils/AppStateContext";
import { movies } from "@/lib/movies";
import { Movie } from "@/types/movieType";
import { Card } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/legacy/image";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import { useMediaQuery } from "react-responsive";

const Add = () => {
  const state = useContext(AppStateContext);
  const presentMovies: Movie[] = state!.movieList;
  const allMovies: Movie[] = movies;
  const isMobile = useMediaQuery({ query: "(max-width: 400px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 550px)" });

  function isPresent(movie: Movie) {
    var flag: boolean = false;
    for (var i = 0; i < presentMovies.length; i++) {
      if (presentMovies[i].id == movie.id) {
        flag = true;
        break;
      }
    }
    return flag;
  }

  function toggleMovie(movie: Movie, index: number) {
    if (isPresent(movie)) {
      state!.setMovieList(
        presentMovies.filter((presentMovie) => presentMovie.id != movie.id)
      );
    } else {
      const addedList = [
        ...presentMovies.slice(0, index),
        movie,
        ...presentMovies.slice(index),
      ];
      state!.setMovieList(addedList);
    }
  }

  return (
    <div className="flex flex-wrap my-4">
      {allMovies.map((movie: Movie, index: number) => {
        const poster = `/images/banner/${movie.id}_banner.jpg`;
        return (
          <Card
            key={movie.id}
            className=" transition  bg-zinc-100/[0.2] dark:bg-zinc-900/[0.2] hover:bg-zinc-100 hover:dark:bg-zinc-900 flex 
            justify-between w-full items-center gap-4 text-sm  m-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-[100px] aspect-[16/9]">
                <AspectRatio
                  className=" rounded-s-lg overflow-hidden border shadow-lg"
                  ratio={16 / 9}
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
              <div className="flex items-center gap-4 w-fit">
                <p className="font-medium leading-tight">
                  {isMobile
                    ? movie.name.slice(0, 15) +
                      (movie.name.length > 15 ? "..." : "")
                    : isTablet
                    ? movie.name.slice(0, 25) +
                      (movie.name.length > 25 ? "..." : "")
                    : movie.name}
                </p>
                <p className="hidden md:block text-xs font-medium dark:text-zinc-400">
                  ({movie.year})
                </p>
              </div>
            </div>
            <Button
              className="h-8 w-8 mr-4"
              size={"icon"}
              variant={isPresent(movie) ? "destructive" : "default"}
              onClick={() => toggleMovie(movie, index)}
            >
              {isPresent(movie) ? (
                <X className="h-5 w-5" />
              ) : (
                <Check className="h-5 w-5" />
              )}
            </Button>
          </Card>
        );
      })}
    </div>
  );
};

export default Add;
