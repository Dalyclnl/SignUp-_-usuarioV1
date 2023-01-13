import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/form.css";
import { useNavigate } from "react-router-dom";



export const Login = () => {
	const { store, actions }= useContext(Context);
	const [ email, setEmail]= useState("");
	const [password, setPassword]= useState("");
	const navigate =useNavigate()


	const handleClick = () =>{
		// //validaciones
		// if (actions.login(email, password)) {
		// 	navigate("/login");
		// }

	};
	return (
		<div className="text-center mt-5">
		     <div className="container">
				 <input onChange={(e)=>setEmail(e.target.value)}   placeholder=" ingresa tu Email"></input>
			     <input onChange={(e)=>setPassword(e.target.value)}  placeholder="ingresa tu contraseña"></input>	
			 </div>		
			 <button onClick={handleClick} id="enviar"> Enviar</button>
        </div>	
	);
};
