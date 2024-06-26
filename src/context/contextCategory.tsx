import { ChangeEvent, ReactNode, createContext, useState, } from "react";
import { UserLogged } from "../interface/interfaceGame";

type CategoryContextProps = {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedSort: string;
    setSelectedSort: (sort: string) => void;
    handleSearchInput:(event: ChangeEvent<HTMLInputElement>) => void;
    search: string
    setSearch : (search:string) => void
    page:number
    setPage: (page: number) => void;
    next: () => void; 
    previous: () => void; 
    loggedInUser:UserLogged | undefined
    UserLogged:(user:UserLogged) => void;
};

type CategoryProviderProps = {
  children: ReactNode;
};

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export const CategoryContextProvider = ({ children }: CategoryProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loggedInUser, setLoggedInUser] = useState<UserLogged | undefined>(); 



  function handleSearchInput(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
    setPage(1);
  }

  function UserLogged(user: UserLogged ) {
    setLoggedInUser(user);
  }

 

  function next() {
    setPage(page + 1);
  }

  function previous() {
    setPage(page - 1);
  }

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory,selectedSort,setSelectedSort,search,page,handleSearchInput, next,previous,setPage,setSearch,UserLogged,loggedInUser}}>
      {children}
    </CategoryContext.Provider>
  );
};
