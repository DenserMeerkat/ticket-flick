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
import SelectDate from "./SelectDate";
import SelectSeats from "./SelectSeats";

export function BookTicketsDialog(props: any) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<{
    day: string;
    date: string;
    month: string;
  } | null>(null);
  const [showDates, setShowDates] = useState<
    { day: string; date: string; month: string }[]
  >([]);
  const [showSeats, setShowSeats] = useState(false);

  useEffect(() => {
    const dates = getNext10Dates();
    setShowDates(dates);
    setSelectedDate(dates[0]);
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
      {showSeats ? (
        <SelectSeats
          setShowSeats={setShowSeats}
          selectedDate={selectedDate}
          onOpenChange={setDialogOpen}
        />
      ) : (
        <SelectDate
          showDates={showDates}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setDialogOpen={setDialogOpen}
          setShowSeats={setShowSeats}
        />
      )}
    </Dialog>
  );
}

export default BookTicketsDialog;
