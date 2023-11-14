import AppBar from "@/components/AppBar/AppBar";
import MovieActions from "@/components/Movie/MovieActions";
import MovieDetails from "@/components/Movie/MovieDetails";
import { Suspense } from "react";

export default function Movie(props: any) {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <Suspense fallback={<Fallback />}>
        <MovieDetails />
        <MovieActions />
      </Suspense>
    </main>
  );
}

const Fallback = () => {
  return <div className="h-[80vh]"></div>;
};
