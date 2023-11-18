import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { getNext10Dates } from "@/lib/movieUtils";
import { ArrowRight, Ticket } from "lucide-react";
import { useEffect, useState } from "react";

export function BookTicketsDialog(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDates, setShowDates] = useState<
    { day: string; date: string; month: string }[]
  >([]);

  useEffect(() => {
    const dates = getNext10Dates();
    setShowDates(dates);
    setSelectedDate(dates[0]?.date);
  }, []);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div className="px-8 sm:px-0 sm:w-60">
          <Button className="w-full">
            <Ticket className="h-4 w-4 mr-3" />
            Book Tickets
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="md:mt-[8vh] max-w-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Tickets</DialogTitle>
          <DialogDescription>
            Select the show date you wish to book tickets for.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-wrap justify-center gap-4">
          {showDates.map(({ date, day, month }) => (
            <Card
              key={date}
              className={` cursor-pointer  w-[100px] h-[110px]
              ${
                selectedDate === date
                  ? "border border-zinc-600 dark:border-zinc-400 bg-zinc-100/[0.5] dark:bg-zinc-900/[0.5]"
                  : ""
              }`}
              onClick={() => setSelectedDate(date)}
            >
              <CardContent className="p-2.5 flex flex-col justify-between h-full">
                <p className="font-light text-[0.7rem] tracking-widest">
                  {month}
                </p>
                <h4 className="text-3xl font-bold tracking-widest text-center">
                  {date}
                </h4>
                <p className="text-[0.7rem] tracking-widest text-center">
                  {day}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
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
              setDialogOpen(false);
            }}
          >
            Select Seats
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookTicketsDialog;
