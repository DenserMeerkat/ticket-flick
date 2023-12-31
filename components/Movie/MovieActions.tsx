"use client";
import { useEffect, useState, useContext } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AppStateContext } from "../utils/AppStateContext";
import EditDialog from "./Actions/EditDialog";
import { useSearchParams } from "next/navigation";
import { getMovieById } from "@/lib/movieUtils";
import { DeleteDialog } from "./Actions/DeleteDialog";
import BookTicketsDialog from "../Book/BookTicketsDialog";
import NotFoundPage from "@/app/movie/404";

const MovieActions = () => {
  const state = useContext(AppStateContext);
  const [loaded, setLoaded] = useState(false);
  const movies = state!.movieList;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (id === undefined || id == null) return <NotFoundPage />;
  const movie = getMovieById(parseInt(id), movies);
  if (movie === undefined) return <NotFoundPage />;
  if (!loaded) {
    return <div className="h-[40vh]"></div>;
  }
  return (
    <div className="mx-auto max-w-7xl w-full mb-12 px-2 md:px-4 lg:px-5">
      <>
        {!state!.activeUser ? (
          <div className="px-8 sm:px-0 sm:w-60">
            <Link
              href="/login"
              className={`${buttonVariants({ variant: "default" })} w-full`}
            >
              Login to Book Tickets
            </Link>
          </div>
        ) : !state!.isAdmin ? (
          <BookTicketsDialog />
        ) : (
          <AdminActions />
        )}
      </>
    </div>
  );
};

export default MovieActions;

const AdminActions = () => {
  const state = useContext(AppStateContext);
  const movies = state!.movieList;
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const movie = getMovieById(parseInt(id!), movies);
  return (
    <div className="px-8 sm:px-0 sm:w-60">
      <EditDialog movie={movie} />
      <div className="h-4 w-4"></div>
      <DeleteDialog movie={movie} />
    </div>
  );
};
