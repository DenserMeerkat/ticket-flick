import { Movie } from "@/types/movieType";
import { ShowDate } from "@/types/showDate";

export function calcRunTime(minutes: number): string {
  if (minutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${remainingMinutes} minutes`;
  } else if (remainingMinutes === 0) {
    return `${hours} Hrs`;
  } else {
    return `${hours} h ${remainingMinutes} min`;
  }
}

export function getMovieById(id: number, list: Movie[]): Movie | undefined {
  return list.find((movie) => movie.id === id.toString());
}

export function getMovieByGenre(genre: string, list: Movie[]): Movie[] {
  const array = list.filter((movie) => movie.genre.includes(genre));
  return array
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}

export function getNext10Dates(): ShowDate[] {
  const currentDate = new Date();
  const next10Dates: ShowDate[] = [];

  for (let i = 0; i < 10; i++) {
    const nextDate = new Date();
    nextDate.setDate(currentDate.getDate() + i);
    const formattedDate = nextDate.toISOString().split("T")[0];
    const dayOfWeek = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
    }).format(nextDate);
    const dayOfMonth = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
    }).format(nextDate);
    const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(nextDate);
    const showDate: ShowDate = {
      day: dayOfWeek,
      date: dayOfMonth,
      month: monthAbbreviation,
    };
    next10Dates.push(showDate);
  }
  return next10Dates;
}

type SeatMap = Record<string, string[]>;

export function generateRandomSeats(): SeatMap {
  const seats: SeatMap = {};

  for (let rowChar = 65; rowChar <= 74; rowChar++) {
    const row = String.fromCharCode(rowChar); // A, B, C, ..., M
    const rowSeats: string[] = [];

    for (let seatNumber = 1; seatNumber <= 20; seatNumber++) {
      rowSeats.push(`${row}${seatNumber}`);
    }

    seats[row] = rowSeats;
  }

  return seats;
}

export function equalizeShowDates(
  showDate1: ShowDate,
  showDate2: ShowDate
): boolean {
  return (
    showDate1.date === showDate2.date &&
    showDate1.month === showDate2.month &&
    showDate1.day === showDate2.day
  );
}
