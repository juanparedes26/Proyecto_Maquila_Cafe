const backendUrl = import.meta.env.VITE_BACKEND_URL;
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { toast } from 'react-toastify';

const MySwal = withReactContent(Swal);
const initialToken = localStorage.getItem("token") || null;

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			
			demoMsg: "",
			users: [], // Lista de usuarios que viene de register , en mi caso serian los admins
			token: initialToken, // Token de autenticación
			currentUser: null ,// Usuario actual que ha iniciado sesión
			clientes: [], // Lista de clientes que se obtienen al hacer getClientes
			maquilas: [], // Lista de maquilas que se obtienen al hacer getMaquilas

		},
		actions: {

			exampleFunction: () => {
                    console.log(backendUrl)
                    return
			},

			
			login:async(username,password)=>{
				try {
					const store = getStore();
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
					if(res.ok && data.access_token){
					 toast.success('Login exitoso');
						  setStore({ 
							...store,
							token: data.access_token,
							currentUser: data.user
						});
						localStorage.setItem("token", data.access_token);
						return data;
					}else{	
						 toast.error('No se pudo iniciar sesión');
						
						return null;
					}
					
				} catch (error) {
					 toast.error('Error al iniciar sesión: ' + error.message);
					return{
						error: "Error al iniciar sesión: " + error.message
					};
					
				}
			},
			logout: () => {
				 const store = getStore();

				localStorage.removeItem("token");
				localStorage.removeItem("currentUser");
				setStore({
					...store,
					token: null,
					currentUser: null,
					clientes: [],
					
				});
			
				
			},
			getClientes: async () => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes?ts=${Date.now()}`, {
						method: "GET",
						headers: {
							/*"Content-Type": "application/json",*/
							"Authorization": "Bearer " + store.token 
						}
					});
					const data = await res.json();
				
					if (res.status === 200 && Array.isArray(data)) {
						setStore({ ...store, clientes: data });
						return true;
					} else {
						 /*setStore({ ...store, clientes: [] });*/
			
						return false;
					}
				} catch  {
					
					return false;
				}
			},
		
			addCliente: async (cliente) => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/add/clientes`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token 
						},
						body: JSON.stringify(cliente)
					});
					/*const data = await res.json();*/
					if (res.status === 409) {
						toast.error('Ya existe un cliente con ese número de celular.');
						return false;
					}

					if (res.ok) {
					
						return true;
				
					
					} else {
					 toast.error('No se pudo agregar el cliente');
					 return false;
					}
				} catch (error) {
					 toast.error('Error al agregar cliente: ' + error.message);
				}
			},
			getMaquilas: async () => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/maquilas`, {
						method: "GET",
						headers: {
							// "Content-Type": "application/json",
							"Authorization": "Bearer " + store.token 
						}
					});
					const data = await res.json();
					if (res.ok) {
						setStore({ ...store, maquilas: data });
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al obtener maquilas',
							text: data.error || 'No se pudieron obtener las maquilas'
						});
						return [];
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al obtener maquilas',
						text: error.message
					});
					return [];
				}
			},
			addMaquila: async (maquila) => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/add/maquilas`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token 
						},
						body: JSON.stringify(maquila)
					});
					const data = await res.json();
					if (res.ok) {
						  setStore({ ...store, maquilas: [...store.maquilas, data] });

						return true;
					} else {
						 toast.error('Error al agregar maquila: ' + (data.error || 'No se pudo agregar la maquila'));
						return false;
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al agregar maquila',
						text: error.message
					});
				}
			},
			getMaquilabyCliente: async (clienteId) => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes/${clienteId}/maquilas`, {
						method: "GET",
						headers: {
							// "Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
					const data = await res.json();
					if (res.ok) {
						
					      setStore({ ...store, maquilas: data });
						return data;
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al obtener maquilas',
							text: data.error || 'No se pudieron obtener las maquilas'
						});
						return [];
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al obtener maquilas',
						text: error.message
					});
					return [];
				}
			},
			updateCliente: async (clienteId, datos) => {
    		const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes/${clienteId}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						},
						body: JSON.stringify(datos) 
					});
					const data = await res.json();
				if (res.ok) {
						toast.success('Cliente actualizado exitosamente');
						const clientesActualizados = Array.isArray(store.clientes)
							? store.clientes.map(c =>
								c.id === clienteId
								? { ...c, ...datos }
								: c
							)
							: [];
						setStore({
							...store,
							clientes: clientesActualizados
						});
						console.log("Clientes después de editar:", clientesActualizados);
						return true;
						
					} else {
						 toast.error('Error al actualizar cliente: ' + (data.error || 'No se pudo actualizar el cliente'));
						return null;
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al actualizar cliente',
						text: error.message
					});
					return null;
				}
			},
			deleteCliente: async (clienteId) => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes/${clienteId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
				if (res.ok) {
						toast.success('Cliente eliminado exitosamente');
						setStore({
							...store,
							clientes: Array.isArray(store.clientes)
							? store.clientes.filter(c => c.id !== clienteId)
							: []
						});
					} else {
						const data = await res.json();
						toast.error('Error al eliminar cliente: ' + (data.error || 'No se pudo eliminar el cliente'));
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al eliminar cliente',
						text: error.message
					});
				}
			},
			deleteMaquila: async (maquilaId) => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/maquilas/${maquilaId}`, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
					if (res.ok) {
						toast.success('Maquila eliminada exitosamente');
						setStore({
								...store,
								maquilas: Array.isArray(store.maquilas)
								? store.maquilas.filter(m => m.id !== maquilaId)
								: []
							});
					} else {
						const data = await res.json();
						toast.error('Error al eliminar maquila: ' + (data.error || 'No se pudo eliminar la maquila'));	
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al eliminar maquila',
						text: error.message
					});
				}
			},
			updateMaquila: async (maquilaId, datos) => {
    		const store = getStore();
						try {
							const res = await fetch(`${backendUrl}/maquilas/${maquilaId}`, {
								method: "PUT",
								headers: {
									"Content-Type": "application/json",
									"Authorization": "Bearer " + store.token
								},
								body: JSON.stringify(datos) 
							});
							const data = await res.json();
							if (res.ok) {
							
								
								setStore({
										...store,
										maquilas: Array.isArray(store.maquilas)
										? store.maquilas.map(m =>
											m.id === maquilaId ? { ...m, ...datos } : m
											)
										: []
									});
											return data;
								
							} else {
								toast.error('Error al actualizar maquila: ' + (data.error || 'No se pudo actualizar la maquila'));
								return null;
							}
						} catch (error) {
							MySwal.fire({
								icon: 'error',
								title: 'Error al actualizar maquila',
								text: error.message
							});
							return null;
						}
					},
			getClienteById: async (clienteId) => {
    		const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes/${clienteId}`, {
						method: "GET",
						headers: {
							// "Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
					const data = await res.json();
					if (res.ok) {
						return data; 
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al obtener cliente',
							text: data.error || 'No se pudo obtener el cliente'
						});
						return null;
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al obtener cliente',
						text: error.message
					});
					return null;
				}
			},
			getMaquilaById: async (maquilaId) => {
    		const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/maquilas/${maquilaId}`, {
						method: "GET",
						headers: {
							// "Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
					const data = await res.json();
					if (res.ok) {
						return data; 
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al obtener maquila',
							text: data.error || 'No se pudo obtener la maquila'
						});
						return null;
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al obtener maquila',
						text: error.message
					});
					return null;
				}
			}
										







						

			
		}
	};
};

export default getState;