import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { generateRandomSeats } from "@/lib/movieUtils";

export function SelectSeats(props: any) {
  const setShowSeats = props.setShowSeats;
  const selectedDate = props.selectedDate;
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const seats = generateRandomSeats();
  const maxTickets = 10;

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

  return (
    <DialogContent className="mt-[8vh] min-w-fit overflow-x-auto">
      <DialogHeader>
        <DialogTitle>Select Seats</DialogTitle>
        <DialogDescription>
          Select the seats you wish to book for
          <span className="ml-1 text-[1rem] font-bold">
            {selectedDate.day}, {selectedDate.date} {selectedDate.month}
          </span>
          .
        </DialogDescription>
      </DialogHeader>
      <div className="mt-2 grid grid-cols-20 gap-1 overflow-y-auto">
        {Object.entries(seats).map(([row, rowSeats]) => (
          <div className="flex items-center justify-center">
            <p className="w-6">{row}</p>
            <div key={row} className="flex items-center">
              {rowSeats.map((seat) => (
                <div
                  key={seat}
                  onClick={() => toggleSeatSelection(seat)}
                  className={`cursor-pointer h-8 w-5 mr-1 relative border rounded-md   ${
                    selectedSeats.includes(seat)
                      ? "bg-zinc-600 dark:bg-zinc-200"
                      : "hover:bg-zinc-400 hover:dark:bg-sky-200 bg-gray-100 dark:bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col-reverse md:flex-row md:justify-between items-center mt-2">
        {selectedSeats.length > 0 && (
          <div className="flex flex-wrap max-w-[200px] min-[450px]:max-w-none">
            {selectedSeats.map((seat) => (
              <div className="text-xs font-medium px-0.5 mx-0.5  border rounded-sm">
                {seat}
              </div>
            ))}
          </div>
        )}
        {selectedSeats.length > 0 && (
          <p className="text-sm font-semibold">
            {selectedSeats.length}{" "}
            {selectedSeats.length === 1 ? "ticket" : "tickets"}
          </p>
        )}
      </div>
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
          }}
        >
          Confirm Selection
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default SelectSeats;
