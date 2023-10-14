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
          <DialogContent className="w-full max-w-xl max-h-screen p-1">
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
              <ScrollArea className="h-full md:h-96 max-w-2xl rounded-sm">
                <div className="">
                  {results.map((movie) => (
                    <div
                      key={movie.id}
                      className="text-sm rounded-sm py-2 px-4 mb-2 bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors"
                    >
                      {movie.name}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default Search;
