import { useReducer } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
	

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			login: async(email,password) => {
					try{
						// fetching data from the backend
						const resp = await fetch(process.env.BACKEND_URL + "/api/login",
						{
								headers:{
									"Content-Type":"application/json"
								},
								method :"POST",
									body:JSON.stringify({
										email: email,
										password: password
								})
							}				
						);
						const data = await resp.json();
						setStore({ token: data.token ,
								   user: data.user		
						});
						// don't forget to return something, that is how the async resolves
						console.log(data)
						if(data.status == 202){
								return true;
						}
						return false;
					} catch (error){
						console.log("Error loading message from backend", error);
					 }	 
			},
			signup: async() => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/signup",
					{
							headers:{
								"Content-Type":"application/json"
							},
							method :"POST",
					    }				
					);
					const data = await resp.json();
					setStore({ token: data.token ,
							   user: data.user		
					});
					// don't forget to return something, that is how the async resolves
					if(data.status == 204){
						return true;
					}
					return false;
				} catch (error){
					console.log("Error loading message from backend", error);
				}
			},		
			private: async () => {
				const store =getStore()
				try{ 
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/private",{
							headers:{
								"Content-Type":application/json ,
								Authorization:`Bearer $(store.token)`
							},
							method :"POST",
							}
					);
					const data = await resp.json();
					setStore({ 
						message : data.message	
					});
					// don't forget to return something, that is how the async resolves
					if(data.status == 205){
						return true;
					}
					return false;
				} catch (error){
					console.log("Error loading message from backend", error);
				 }
			}	
		}
	};
};
export default getState;
