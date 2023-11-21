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
import { ScrollArea } from "@/components/ui/scroll-area";
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
          <SheetDescription className="pb-2">
            {tickets?.length} tickets found
          </SheetDescription>
          <ScrollArea className="h-[calc(100vh-7rem)] w-full rounded-md">
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
                    "flex p-2 gap-4 rounded-sm mb-2 bg-zinc-50 hover:bg-zinc-200 dark:bg-zinc-900"
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
                    <p className="text-left font-semibold mb-1">{movie.name}</p>
                    <p className="text-left text-xs font-medium dark:text-zinc-400">
                      {ticket.showDate.day +
                        ", " +
                        ticket.showDate.month +
                        " " +
                        ticket.showDate.date}
                    </p>
                    <div className="flex flex-wrap max-w-[200px] gap-1 items-center mt-1">
                      {ticket.seats.map((seat: string, index) => (
                        <React.Fragment key={index}>
                          <p className="border-2 rounded-sm text-[0.65rem] px-0.5 font-medium dark:text-zinc-400">
                            {seat}
                          </p>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default TicketSheet;
