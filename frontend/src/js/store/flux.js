const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personas: ["Pedro","Maria"],
			demoMsg: "",
		},
		actions: {

			exampleFunction: () => {
                    console.log(backendUrl)
                    return
			},

			demoFunction: async () => {
				const urlAboutPublic = backendUrl + '/public/demo';
				const store = getStore();

				try {

					const response = await fetch(urlAboutPublic, {method:'GET'});

					if (!response.ok) {
						console.log(response.statusText)
						throw new Error('Network response error');
					}

					const data = await response.json();
					setStore({...store,  demoMsg: data.msg })

					return data.msg

				} catch (error) {
					console.error('Error fetching data:', error);
					return false
				}
		},
		}
	};
};

export default getState;