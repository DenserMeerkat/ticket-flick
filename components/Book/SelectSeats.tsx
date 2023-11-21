import React, { useState, useContext, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  equalizeShowDates,
  generateRandomSeats,
  getMovieById,
} from "@/lib/movieUtils";
import { AppStateContext } from "../utils/AppStateContext";
import { User } from "@/types/userType";
import { Ticket } from "@/types/ticket";
import { Movie } from "@/types/movieType";
import { useSearchParams, useRouter } from "next/navigation";
import { ShowDate } from "@/types/showDate";
import { toast } from "../ui/use-toast";

export function SelectSeats(props: any) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const state = useContext(AppStateContext);
  const setShowSeats = props.setShowSeats;
  const selectedDate: ShowDate = props.selectedDate;
  const onOpenChange = props.onOpenChange;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [confimred, setConfirmed] = useState(false);
  const seats = generateRandomSeats();
  const maxTickets = 10;
  const id: number = parseInt(searchParams.get("id") ?? "31");
  const movie: Movie | undefined = getMovieById(id, state!.movieList);
  const filledSeats: string[] = (movie!.bookedTickets ?? [])
    .filter((ticket) => equalizeShowDates(ticket.showDate, selectedDate))
    .flatMap((ticket) => ticket.seats);
  console.log("Selected Date:", selectedDate);
  console.log("Movie:", movie);
  console.log("Filled Seats:", filledSeats);
  const toggleSeatSelection = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selectedSeat) => selectedSeat !== seat)
      );
    } else {
      if (selectedSeats.length < maxTickets) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const replaceRoute = useCallback(async () => {
    router.replace("/");
  }, [router]);

  useEffect(() => {
    const handleUpdate = async () => {
      if (confimred) {
        await replaceRoute();
        const ticket: Ticket = {
          id:
            movie!.id + "-" + selectedDate.date + "-" + selectedSeats.join("-"),
          movieId: movie!.id,
          showDate: selectedDate,
          seats: selectedSeats,
        };
        const users: User[] = state!.users;
        const activeUser: User | undefined = state!.activeUser;
        const updatedUsers = users.map((user) => {
          if (user.id === activeUser?.id) {
            return {
              ...user,
              tickets: [...(user.tickets ?? []), ticket],
            };
          } else {
            return user;
          }
        });
        const updatedActiveUser: User = {
          ...activeUser!,
          tickets: [...(activeUser!.tickets ?? []), ticket],
        };
        const updatedMovieList = state!.movieList.map((movie) => {
          if (movie.id === ticket.movieId) {
            return {
              ...movie,
              bookedTickets: [...(movie.bookedTickets ?? []), ticket],
            };
          } else {
            return movie;
          }
        });
        state!.setUsers(updatedUsers);
        state!.setActiveUser(updatedActiveUser);
        state!.setMovieList(updatedMovieList);
        toast({
          title: "Booking Successful",
          description: (
            <div className="flex flex-col gap-1">
              <p className="mt-2 text-lg font-medium w-[340px] rounded-md  pl-0">
                {movie!.name}
              </p>
              <p className="font-medium w-[340px] rounded-md pl-0">
                {ticket!.showDate.day +
                  ", " +
                  ticket!.showDate.month +
                  " " +
                  ticket!.showDate.date}
              </p>
              <div className="flex flex-wrap max-w-[400px] gap-1 items-center">
                {ticket!.seats.map((genre: string, index) => (
                  <React.Fragment key={index}>
                    <p className="text-xs font-medium dark:text-zinc-400">
                      {genre}
                    </p>
                    {index != ticket!.seats.length - 1 &&
                      ticket!.seats.length != 1 && <p className="text-xs">·</p>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ),
        });
      }
    };

    handleUpdate();
  }, [confimred, replaceRoute]);

  const updateTickets = (selectedSeats: string[]) => {
    setConfirmed(true);
    onOpenChange(false);
  };

  return (
    <DialogContent className="mt-[8vh] min-w-fit overflow-x-auto">
      <DialogHeader>
        <DialogTitle>Select Seats</DialogTitle>
        <DialogDescription>
          Select the seats you wish to book for
          <span className="ml-1.5 font-bold text-[0.9rem] underline underline-offset-4">
            {selectedDate.day}, {selectedDate.date} {selectedDate.month}
          </span>
          .
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 grid grid-cols-20 gap-1 overflow-y-auto">
        {Object.entries(seats).map(([row, rowSeats]) => (
          <div key={row} className="flex items-center justify-center">
            <p className="w-6">{row}</p>
            <div key={row} className="flex items-center">
              {rowSeats.map((seat, index) => {
                if (filledSeats.includes(seat)) {
                  return (
                    <div
                      key={seat}
                      className={
                        "h-8 w-5 mr-1 relative border rounded-md bg-zinc-600 dark:bg-zinc-200"
                      }
                    ></div>
                  );
                } else {
                  return (
                    <div
                      key={seat}
                      onClick={() => toggleSeatSelection(seat)}
                      className={`cursor-pointer h-8 w-5 mr-1 relative border rounded-md   ${
                        selectedSeats.includes(seat)
                          ? "bg-zinc-600 dark:bg-zinc-200"
                          : "hover:bg-zinc-400 hover:dark:bg-sky-200 bg-gray-100 dark:bg-gray-600"
                      }`}
                    ></div>
                  );
                }
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="flex flex-col-reverse md:flex-row md:justify-between items-center mt-2">
          <div className="flex flex-wrap max-w-[200px] min-[450px]:max-w-none">
            {selectedSeats.map((seat) => (
              <div
                key={seat}
                className="text-xs font-medium px-1 py-0.5 mx-0.5 border rounded-sm"
              >
                {seat}
              </div>
            ))}
          </div>
          <div className="h-2"></div>
          <p className="text-sm font-semibold">
            {selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "ticket" : "tickets"}
          </p>
        </div>
      )}
      <DialogFooter className="mt-2">
        <Button
          variant="secondary"
          onClick={() => {
            setShowSeats(false);
          }}
        >
          Back
        </Button>
        <div className="h-2"></div>
        <Button
          disabled={selectedSeats.length === 0}
          onClick={() => {
            console.log("Selected Seats:", selectedSeats);
            updateTickets(selectedSeats);
          }}
        >
          {selectedSeats.length === 0
            ? "No seats selected"
            : "Confirm Selection"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default SelectSeats;
