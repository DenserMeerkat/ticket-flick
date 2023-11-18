import { Movie } from "@/types/movieType";
import { User } from "@/types/userType";
import { createContext, useState, useEffect, ReactNode } from "react";
import { movies } from "@/lib/movies";

interface AppState {
  movieList: Movie[];
  setMovieList: React.Dispatch<React.SetStateAction<Movie[]>>;
  activeList: Movie[];
  setActiveList: React.Dispatch<React.SetStateAction<Movie[]>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  admins: User[];
  setAdmins: React.Dispatch<React.SetStateAction<User[]>>;
  activeUser: User | undefined;
  setActiveUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

const AppStateProvider = ({ children }: AppStateProviderProps) => {
  const [movieList, setMovieList] = useState<Movie[]>(movies.slice(0, 40));
  const [activeList, setActiveList] = useState<Movie[]>(movies.slice(0, 5));
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "johndoe@gmail.com",
      password: "$2a$10$QUnEZ7GMdMFL5nOfXxJDtOeS34aIhHrPyXQJuQXL9lLU6lb5k8mOC",
    },
  ]);
  const [admins, setAdmins] = useState<User[]>([
    {
      id: "1",
      name: "Admin",
      email: "admin@gmail.com",
      password: "$2a$10$QUnEZ7GMdMFL5nOfXxJDtOeS34aIhHrPyXQJuQXL9lLU6lb5k8mOC",
    },
  ]);
  const [activeUser, setActiveUser] = useState<User | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const state: AppState = {
    movieList,
    setMovieList,
    activeList,
    setActiveList,
    users,
    setUsers,
    admins,
    setAdmins,
    activeUser,
    setActiveUser,
    isAdmin,
    setIsAdmin,
  };

  useEffect(() => {
    //localStorage.clear();
    const storedState = localStorage.getItem("appState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      setMovieList(parsedState.movieList);
      setActiveList(parsedState.activeList);
      setUsers(parsedState.users);
      setAdmins(parsedState.admins);
      setActiveUser(parsedState.activeUser);
      setIsAdmin(parsedState.isAdmin);
    }
  }, []);

  useEffect(() => {
    const stateToStore = JSON.stringify({
      movieList,
      activeList,
      users,
      admins,
      activeUser,
      isAdmin,
    });
    localStorage.setItem("appState", stateToStore);
  }, [movieList, activeList, users, admins, activeUser, isAdmin]);

  return (
    <AppStateContext.Provider value={state}>
      {children}
    </AppStateContext.Provider>
  );
};

export { AppStateContext, AppStateProvider };
