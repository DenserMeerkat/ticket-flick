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
