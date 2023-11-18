import { Movie } from "@/types/movieType";

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

export function getNext10Dates(): {
  day: string;
  date: string;
  month: string;
}[] {
  const currentDate = new Date();
  const next10Dates: { day: string; date: string; month: string }[] = [];

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
    next10Dates.push({
      day: dayOfWeek,
      date: dayOfMonth,
      month: monthAbbreviation,
    });
  }

  return next10Dates;
}
