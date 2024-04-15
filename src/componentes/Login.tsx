import { useContext, useState } from "react";
import { createDatabase } from "../db/db";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/contextCategory";
import { UserLogged } from "../interface/interfaceGame";
import { SquareArrowLeft } from "lucide-react";
import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  


  const { UserLogged } = useContext(CategoryContext);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const fazerLogin = async () => {

    
    try {

      
      const db = await createDatabase();
  
      const user = await db.games
        .findOne({ selector: { name: username } })
        .exec();

      if (!user) {
        toast.error("Usuario Nao Encontrado", {
          position: "top-center",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
        
        return;
      }

      if (user.password === password) {
        console.log("Login bem-sucedido");

        const loggedUser: UserLogged = {
          name: user.name,
          image: user.image,
        };

        toast.success("Login Bem Sucedido", {
          position: "top-center",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
       
        UserLogged(loggedUser);
        localStorage.setItem("user", JSON.stringify(loggedUser));

        setTimeout(() => {
          navigate("/");
        }, 2500);
      } else {
     
        toast.error("Dados Errados", {
          position: "top-center",
          autoClose: 2400,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          theme: "dark",
          transition: Flip,
        });
       
      }
    } catch (error) {
      toast.error("Erro", {
        position: "top-center",
        autoClose: 2400,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Flip,
      });
      throw error;
    }
  };

  return (
    <>
    <ToastContainer />
  
     
      <div className="flex flex-col  h-screen justify-center">
       
        <div className="shadow-md p-5 flex flex-col gap-5 cursor-pointer ">
        <div className="grid grid-cols-4">
            <div>
            <SquareArrowLeft
              onClick={() => {
                navigate("/");
              }}
              size={40}
              
            /> 
            </div>
            <div className="col-span-2 justify-self-center ">
            <p className="text-3xl ">LOGIN</p>
            </div>
       
          </div>
          
        

          <label
            htmlFor="Username"
            className="relative block rounded-md  border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              onChange={handleUsernameChange}
              type="text"
              id="Username"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0  h-12"
              placeholder="Username"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs text-zinc-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Username
            </span>
          </label>

          <label
            htmlFor="Password"
            className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
          >
            <input
              onChange={handlePasswordChange}
              type="password"
              id="password"
              className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 h-12"
              placeholder="Password"
            />

            <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-transparent p-0.5 text-xs text-zinc-100 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
              Password
            </span>
          </label>
          <button
            className="group relative inline-block overflow-hidden border border-indigo-600 px-8 py-3 focus:outline-none focus:ring "
            onClick={fazerLogin}
          >
            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-indigo-600 transition-all group-hover:h-full group-active:bg-indigo-500"></span>

            <span className="relative text-lg font-medium text-indigo-600 transition-colors group-hover:text-white ">
              Login
            </span>
          </button>
          <span
            className="underline text-center"
            onClick={() => navigate("/create")}
          >
            Criar Conta
          </span>
        </div>
      </div>
    </>
  );
};
