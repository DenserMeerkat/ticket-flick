import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { ShowDate } from "@/types/showDate";
import { ScrollArea } from "../ui/scroll-area";

export function SelectDate({
  showDates,
  selectedDate,
  setSelectedDate,
  setDialogOpen,
  setShowSeats,
}: any) {
  return (
    <DialogContent className="mt-[8vh] max-w-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Book Tickets</DialogTitle>
        <DialogDescription>
          Select the show date you wish to book tickets for.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="max-h-[60vh] w-full">
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          {showDates.map((showDate: ShowDate) => (
            <Card
              key={showDate.date}
              className={` cursor-pointer  w-[100px] h-[110px]
              ${
                selectedDate === showDate
                  ? "border border-zinc-600 dark:border-zinc-400 bg-zinc-100/[0.5] dark:bg-zinc-900/[0.5]"
                  : ""
              }`}
              onClick={() => setSelectedDate(showDate)}
            >
              <CardContent className="p-2.5 flex flex-col justify-between h-full">
                <p className="font-light text-[0.7rem] tracking-widest">
                  {showDate.month}
                </p>
                <h4 className="text-3xl font-bold tracking-widest text-center">
                  {showDate.date}
                </h4>
                <p className="text-[0.7rem] tracking-widest text-center">
                  {showDate.day}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
      <DialogFooter className="mt-2">
        <Button
          variant="secondary"
          onClick={() => {
            setDialogOpen(false);
          }}
        >
          Cancel
        </Button>
        <div className="h-4"></div>
        <Button
          onClick={() => {
            setShowSeats(true);
          }}
        >
          Select Seats
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default SelectDate;
