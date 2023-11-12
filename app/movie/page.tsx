import AppBar from "@/components/AppBar/AppBar";
import MovieDetails from "@/components/Movie/MovieDetails";

export default function Movie(props: any) {
  return (
    <main>
      <AppBar showSearch={true} actions="login" />
      <MovieDetails />
    </main>
  );
}
