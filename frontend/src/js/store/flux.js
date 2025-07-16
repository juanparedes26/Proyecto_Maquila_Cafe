const backendUrl = import.meta.env.VITE_BACKEND_URL;
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			
			demoMsg: "",
			users: [], // Lista de usuarios que viene de register , en mi caso serian los admins
			token: null, // Token de autenticación
			currentUser: null // Usuario actual que ha iniciado sesión
		},
		actions: {

			exampleFunction: () => {
                    console.log(backendUrl)
                    return
			},

			register:async(username,password,name)=>{
				const store= getStore();
				try {
					const res=await fetch(`${backendUrl}/users`,{
						method: "POST",
						headers:{
							"Content-Type":"application/json",
						},
						body:JSON.stringify({
							username:username,
							password:password,
							name:name
						})
					});
					const data=await res.json();
					if(res.ok){
						MySwal.fire({
								icon: 'success',
								title: 'Login exitoso'
							});
						setStore({ users: [...store.users, data] }); 
						return data;
					}else{	
						MySwal.fire({
							icon: 'error',
							title: 'Error al iniciar sesión',
							text: data.message
						});
						return null;
					}
					
				} catch (error) {
					 MySwal.fire({
							icon: 'error',
							title: 'Error al iniciar sesión',
							text: error.message
						});
					return{
						error: "Error al crear el usuario: " + error.message
					};
					
				}

			},
			login:async(username,password)=>{
				try {
					const res=await fetch(`${backendUrl}/login`,{
						method: "POST",
						headers:{
							"Content-Type":"application/json",
						},
						body:JSON.stringify({
							username:username,
							password:password
						})
					});
					const data=await res.json();
					if(res.ok){
					MySwal.fire({
							icon: 'success',
							title: 'Login exitoso'
						});
						  setStore({
							token: data.access_token,
							currentUser: data.user
						});
						localStorage.setItem("token", data.access_token);
						return data;
					}else{	
						MySwal.fire({
							icon: 'error',
							title: 'Error al iniciar sesión',
							text: data.message
						});
						
						return null;
					}
					
				} catch (error) {
					 MySwal.fire({
						icon: 'error',
						title: 'Error al iniciar sesión',
						text: error.message
					});
					return{
						error: "Error al iniciar sesión: " + error.message
					};
					
				}
			},
			logout: () => {

				localStorage.removeItem("token");
				localStorage.removeItem("currentUser");
				setStore({
					token: null,
					currentUser: null
				});
			
				MySwal.fire({
					icon: 'success',
					title: 'Logout exitoso'
				});
			},
			
			
		}
	};
};

export default getState;