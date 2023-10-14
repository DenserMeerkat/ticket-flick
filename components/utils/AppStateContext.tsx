import { Movie } from "@/types/movieType";
import { User } from "@/types/userType";
import { createContext, useState, ReactNode } from "react";
import { movies } from "@/lib/movies";

interface AppState {
  movieList: Movie[];
  setMovieList: (movies: Movie[]) => void;
  activeList: Movie[];
  setActiveList: (movies: Movie[]) => void;
  users: User[];
  setUsers: (movies: User[]) => void;
  admins: User[];
  setAdmins: (movies: User[]) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [movieList, setMovieList] = useState<Movie[]>(movies);
  const [activeList, setActiveList] = useState<Movie[]>(movies.slice(0, 5));
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "password",
    },
  ]);
  const [admins, setAdmins] = useState<User[]>([]);
  const state: AppState = {
    movieList,
    setMovieList,
    activeList,
    setActiveList,
    users,
    setUsers,
    admins,
    setAdmins,
  };

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
