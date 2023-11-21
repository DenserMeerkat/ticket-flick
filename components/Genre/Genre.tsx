"use client";
import React, { useContext } from "react";
import { AppStateContext } from "../utils/AppStateContext";
import { Movie } from "@/types/movieType";
import { Card } from "../ui/card";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/legacy/image";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Genre = () => {
  const searchParams = useSearchParams();
  const state = useContext(AppStateContext);
  const presentMovies: Movie[] = state!.movieList;
  const genre = searchParams.get("g");
  const genreMovies: Movie[] = presentMovies.filter((movie) =>
    movie.genre.includes(genre!)
  );
  return (
    <>
      <h1 className="my-6 text-2xl text-center font-bold tracking-wider">
        {genre} Movies
      </h1>{" "}
      <div className="flex flex-wrap my-4 justify-center">
        {genreMovies.map((movie: Movie, index: number) => {
          const poster = `/images/poster/${movie.id}_poster.jpg`;
          return (
            <Link key={movie.id} href={`/movie?id=${movie.id}`}>
              <Card className="backdrop-blur-3xl transition  bg-zinc-100/[0.2] dark:bg-zinc-900/[0.2] hover:bg-zinc-100 hover:dark:bg-zinc-900 flex w-[400px] items-center gap-4 text-sm  m-1">
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
                          movie.genre.length != 1 && (
                            <p className="text-xs">·</p>
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                  <p className="max-w-[250px] text-xs mt-4">
                    {movie.description.join(" ").slice(0, 60) + "..."}
                  </p>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Genre;
