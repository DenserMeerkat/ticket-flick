"use client";
import { useEffect, useState, useContext } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { AppStateContext } from "../utils/AppStateContext";
import EditDialog from "./Actions/EditDialog";
import { useSearchParams } from "next/navigation";
import { getMovieById } from "@/lib/movieUtils";
import { DeleteDialog } from "./Actions/DeleteDialog";

const MovieActions = () => {
  const state = useContext(AppStateContext);
  const [loaded, setLoaded] = useState(false);
  const movies = state!.movieList;

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <div className="h-[40vh]"></div>;
  }
  return (
    <div className="mx-auto max-w-7xl w-full mb-12 px-2 md:px-4 lg:px-6">
      <>
        {!state!.activeUser ? (
          <Link
            href="/login"
            className={buttonVariants({ variant: "default", size: "lg" })}
          >
            Login to Book Tickets
          </Link>
        ) : !state!.isAdmin ? (
          <Button size={"lg"}>Book Tickets</Button>
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
