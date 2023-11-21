"use client";
import React, { useContext } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AppStateContext } from "@/components/utils/AppStateContext";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";
import { Movie } from "@/types/movieType";
import { getMovieById } from "@/lib/movieUtils";
import Image from "next/legacy/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const TicketSheet = () => {
  const state = useContext(AppStateContext);
  if (!state!.activeUser && !state?.isAdmin) return <></>;
  const tickets = state?.activeUser?.tickets ?? [];
  return (
    <Sheet>
      <SheetTrigger>
        <Button size={"icon"} variant={"outline"}>
          <Ticket className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Your Tickets</SheetTitle>
          <SheetDescription>{tickets?.length} tickets found</SheetDescription>
          {tickets.map((ticket, index) => {
            const movie: Movie = getMovieById(
              parseInt(ticket.movieId),
              state!.movieList
            )!;
            const poster = `/images/poster/${movie!.id}_poster.jpg`;
            return (
              <div
                key={ticket.id}
                className={
                  "flex p-2 gap-4 rounded-sm cursor-pointer mb-2 bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900 hover:dark:bg-zinc-800 transition-colors"
                }
              >
                <div className="w-[60px] aspect-[2/3]">
                  <AspectRatio
                    className="rounded-sm overflow-hidden border shadow-lg"
                    ratio={2 / 3}
                  >
                    <Image
                      key={`${movie!.id}+poster`}
                      src={poster}
                      blurDataURL={poster.replace("images", "min_images")}
                      placeholder="blur"
                      alt="Movie Poster"
                      layout="fill"
                    ></Image>
                  </AspectRatio>
                </div>
                <div>
                  <p className="font-semibold mb-1">{movie.name}</p>
                  <p className="text-xs font-medium dark:text-zinc-400">
                    {ticket.showDate.day +
                      ", " +
                      ticket.showDate.month +
                      ticket.showDate.date}
                  </p>
                  <div className="flex flex-wrap max-w-[200px] gap-1 items-center mt-1">
                    {ticket.seats.map((seat: string, index) => (
                      <React.Fragment key={index}>
                        <p className="text-xs font-medium dark:text-zinc-400">
                          {seat}
                        </p>
                        {index != ticket.seats.length - 1 &&
                          ticket.seats.length != 1 && (
                            <p className="text-xs">·</p>
                          )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TicketSheet;
