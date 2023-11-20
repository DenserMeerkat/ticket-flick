"use client";
import React, { useContext } from "react";
import SearchBox from "./SearchBox";
import { useState, useEffect } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { Frown } from "lucide-react";
import { Movie } from "@/types/movieType";
import Image from "next/legacy/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

const Search = () => {
  const state = useContext(AppStateContext);
  const movies = state!.movieList;
  const [isDomLoaded, setDomLoaded] = useState(false);
  const [openSearch, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Movie[]>(movies);

  useEffect(() => {
    setDomLoaded(true);
    if (inputValue.length == 0) setResults(movies);
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [openSearch]);

  const onValueChange = (value: string) => {
    const inputValue = value;
    setInputValue(inputValue);
    if (inputValue === "") return setResults(movies);
    setResults(
      movies.filter((movie) =>
        movie.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
  };

  return (
    <>
      {isDomLoaded && (
        <>
          <SearchBox
            open={openSearch}
            onClick={() => setSearchOpen((prev) => !prev)}
          />
          <CommandDialog open={openSearch} onOpenChange={setSearchOpen}>
            <CommandInput
              value={inputValue}
              placeholder="Type movie title"
              onValueChange={onValueChange}
            />
            <CommandList className="md:static w-full max-w-xl max-h-[calc(100vh-6rem)] md:max-h-[calc(100vh-10rem)] h-fit">
              <CommandEmpty className="p-2">
                <div className="py-4 h-fit  rounded-sm flex items-center justify-center gap-3 bg-zinc-50 dark:bg-zinc-900 ">
                  <Frown className="h-4 w-4" />{" "}
                  <p className="text-sm font-medium tracking-wide">
                    No Movies found.
                  </p>
                </div>
              </CommandEmpty>
              <CommandGroup
                className="h-min"
                heading={
                  <p className="text-end">
                    {inputValue.length == 0
                      ? "All Movies"
                      : `Found ${results.length} movies`}
                  </p>
                }
              >
                {results.map((movie: Movie, index: number) => {
                  const poster = `/images/poster/${movie.id}_poster.jpg`;
                  return (
                    <CommandItem
                      key={movie.id}
                      value={movie.name}
                      className={`rounded-sm cursor-pointer ${
                        index != results.length - 1 ? "mb-2" : ""
                      } bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors`}
                    >
                      <Link
                        href={{ pathname: `/movie`, query: { id: movie.id } }}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-4 text-sm w-full"
                      >
                        <div className="w-[60px] aspect-[2/3]">
                          <AspectRatio
                            className="rounded-sm overflow-hidden border shadow-lg"
                            ratio={2 / 3}
                          >
                            <Image
                              key={`${movie.id}+poster`}
                              src={poster}
                              blurDataURL={poster.replace(
                                "images",
                                "min_images"
                              )}
                              placeholder="blur"
                              alt="Movie Poster"
                              layout="fill"
                            ></Image>
                          </AspectRatio>
                        </div>
                        <div>
                          <p className="font-semibold mb-2">{movie.name}</p>
                          <p className="text-xs font-medium dark:text-zinc-400">
                            {movie.year}
                          </p>
                          <div className="flex gap-3 items-center">
                            {movie.genre.map((genre: string, index) => (
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
                        </div>
                      </Link>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </>
      )}
    </>
  );
};

export default Search;
