const backendUrl = import.meta.env.VITE_BACKEND_URL;
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const getState = ({ getStore, setStore }) => {
	return {
		store: {
			
			demoMsg: "",
			users: [], // Lista de usuarios que viene de register , en mi caso serian los admins
			token: null, // Token de autenticación
			currentUser: null ,// Usuario actual que ha iniciado sesión
			clientes: [], // Lista de clientes que se obtienen al hacer getClientes
			maquilas: [], // Lista de maquilas que se obtienen al hacer getMaquilas

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
			getClientes: async () => {
    			const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/clientes`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token 
						}
					});
					const data = await res.json();
					if (res.ok) {
						setStore({ clientes: data }); 
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al obtener clientes',
							text: data.error || 'No se pudieron obtener los clientes'
						});
						return [];
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al obtener clientes',
						text: error.message
					});
					return [];
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
					const data = await res.json();
					if (res.ok) {
						setStore({ clientes: [...store.clientes, data] });
						MySwal.fire({
							icon: 'success',
							title: 'Cliente agregado exitosamente'
						});
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al agregar cliente',
							text: data.error || 'No se pudo agregar el cliente'
						});
					}
				} catch (error) {
					MySwal.fire({
						icon: 'error',
						title: 'Error al agregar cliente',
						text: error.message
					});
				}
			},
			getMaquilas: async () => {
				const store = getStore();
				try {
					const res = await fetch(`${backendUrl}/maquilas`, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token 
						}
					});
					const data = await res.json();
					if (res.ok) {
						setStore({ maquilas: data });
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
						setStore({ maquilas: [...store.maquilas, data] });
						MySwal.fire({
							icon: 'success',
							title: 'Maquila agregada exitosamente'
						});
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al agregar maquila',
							text: data.error || 'No se pudo agregar la maquila'
						});
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
							"Content-Type": "application/json",
							"Authorization": "Bearer " + store.token
						}
					});
					const data = await res.json();
					if (res.ok) {
						
					    setStore({ maquilas: data });
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
						MySwal.fire({
							icon: 'success',
							title: 'Cliente actualizado'
						});

						setStore({
							clientes: store.clientes.map(c =>
								c.id === clienteId ? { ...c, ...datos } : c
							)
						});
						return data;
					} else {
						MySwal.fire({
							icon: 'error',
							title: 'Error al actualizar cliente',
							text: data.error || 'No se pudo actualizar el cliente'
						});
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
						MySwal.fire({
							icon: 'success',
							title: 'Cliente eliminado'
						});
						setStore({
							clientes: store.clientes.filter(c => c.id !== clienteId)
						});
					} else {
						const data = await res.json();
						MySwal.fire({
							icon: 'error',
							title: 'Error al eliminar cliente',
							text: data.error || 'No se pudo eliminar el cliente'
						});
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
						MySwal.fire({
							icon: 'success',
							title: 'Maquila eliminada'
						});
						setStore({
							maquilas: store.maquilas.filter(m => m.id !== maquilaId)
						});
					} else {
						const data = await res.json();
						MySwal.fire({
							icon: 'error',
							title: 'Error al eliminar maquila',
							text: data.error || 'No se pudo eliminar la maquila'
						});
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
								MySwal.fire({
									icon: 'success',
									title: 'Maquila actualizada'
								});
							
								setStore({
									maquilas: store.maquilas.map(m =>
										m.id === maquilaId ? { ...m, ...datos } : m
									)
								});
								return data;
							} else {
								MySwal.fire({
									icon: 'error',
									title: 'Error al actualizar maquila',
									text: data.error || 'No se pudo actualizar la maquila'
								});
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
							"Content-Type": "application/json",
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
							"Content-Type": "application/json",
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