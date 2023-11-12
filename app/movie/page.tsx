import AppBar from "@/components/AppBar/AppBar";
import MovieActions from "@/components/Movie/MovieActions";
import MovieDetails from "@/components/Movie/MovieDetails";

export default function Movie(props: any) {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <MovieDetails />
      <MovieActions />
    </main>
  );
}
