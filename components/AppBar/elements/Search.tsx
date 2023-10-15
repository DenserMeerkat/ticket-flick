"use client";
import React from "react";
import SearchBox from "./SearchBox";
import { useState, useEffect, ChangeEvent } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Movie } from "@/types/movieType";
import { movies } from "@/lib/movies";
import Image from "next/legacy/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Link from "next/link";

const Search = () => {
  const [isDomLoaded, setDomLoaded] = useState(false);
  const [openSearch, setSearchOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Movie[]>([]);

  function handleKeyPress(event: KeyboardEvent) {
    if ((event.ctrlKey || event.metaKey) && event.key === "k") {
      event.preventDefault();
      setSearchOpen((prev) => !prev);
    }
  }
  useEffect(() => {
    setDomLoaded(true);
    return () => {};
  }, []);
  useEffect(() => {
    if (inputValue === "") return setResults([]);
    setResults(
      movies.filter((movie) =>
        movie.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [inputValue]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };
  return (
    <>
      {isDomLoaded && (
        <Dialog
          open={openSearch}
          onOpenChange={() => {
            setResults([]);
            setSearchOpen((prev) => !prev);
          }}
        >
          <DialogTrigger>
            <SearchBox
              open={openSearch}
              onClick={() => setSearchOpen((prev) => !prev)}
            />
          </DialogTrigger>
          <DialogContent className="w-full max-w-xl max-h-[calc(100vh-16rem)] p-1">
            <DialogHeader>
              <DialogTitle>
                <div className="flex w-full items-center gap-1">
                  <SearchIcon className="h-5 w-5 ml-3" />
                  <Input
                    className="mr-8 border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent focus-visible:ring-transparent"
                    type="text"
                    placeholder="Type movie title"
                    onChange={handleInputChange}
                  />
                </div>
              </DialogTitle>
              {results.length > 1 && (
                <div className="h-[1px] w-full bg-zinc-300 dark:bg-zinc-700" />
              )}
            </DialogHeader>
            {results.length > 1 && (
              <div className="h-full md:h-96 max-w-2xl rounded-sm overflow-y-scroll">
                <>
                  {results.map((movie) => {
                    const poster = `/images/poster/${movie.id}_poster.jpg`;
                    return (
                      <Link
                        href={`/movie/${movie.id}`}
                        key={movie.id}
                        className="flex items-center gap-4 text-sm rounded-sm py-1 px-1 mb-2 bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors"
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
                    );
                  })}
                </>
              </div>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Search;
