const backendUrl = import.meta.env.VITE_BACKEND_URL;

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			personas: ["Pedro","Maria"]
		},
		actions: {

			exampleFunction: () => {
                    console.log("hola")
                    return
			},
		}
	};
};

export default getState;