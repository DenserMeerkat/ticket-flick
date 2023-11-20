"use client";
import React, { useContext } from "react";
import { AppStateContext } from "../utils/AppStateContext";
import { movies } from "@/lib/movies";
import { Movie } from "@/types/movieType";
import { Card } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/legacy/image";
import { Button } from "../ui/button";

const Add = () => {
  const state = useContext(AppStateContext);
  const presentMovies: Movie[] = state!.movieList;
  const allMovies: Movie[] = movies;

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
        const poster = `/images/poster/${movie.id}_poster.jpg`;
        return (
          <Card
            key={movie.id}
            className="backdrop-blur-3xl transition  bg-zinc-100/[0.2] dark:bg-zinc-900/[0.2] hover:bg-zinc-100 hover:dark:bg-zinc-900 flex w-[400px] items-center gap-4 text-sm  m-1"
          >
            <div className="w-[120px] aspect-[2/3]">
              <AspectRatio
                className="rounded-sm overflow-hidden border shadow-lg"
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
            <div className="max-w-[200px]">
              <p className="font-bold text-lg mb-2 leading-tight">
                {movie.name}
              </p>
              <p className="text-xs font-medium dark:text-zinc-400">
                {movie.year}
              </p>
              <p
                className="
              text-xs"
              >
                {movie.director[0]}
              </p>
              <div className="flex gap-1 items-center">
                {movie.genre.sort().map((genre: string, index) => (
                  <React.Fragment key={index}>
                    <p className="text-xs font-medium dark:text-zinc-400">
                      {genre}
                    </p>
                    {index != movie.genre.length - 1 &&
                      movie.genre.length != 1 && <p className="text-xs">·</p>}
                  </React.Fragment>
                ))}
              </div>
              <div className=" mt-4">
                <Button
                  className="h-8 w-36"
                  size={"sm"}
                  variant={isPresent(movie) ? "destructive" : "default"}
                  onClick={() => toggleMovie(movie, index)}
                >
                  {isPresent(movie) ? "Disable" : "Enable"}
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default Add;
