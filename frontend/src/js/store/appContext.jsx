import React, { useState, useEffect } from "react";
import getState from "./flux.js";


export const Context = React.createContext(null);

const injectContext = PassedComponent => {
	const StoreWrapper = props => {
		//this will be passed as the contenxt value
		const [state, setState] = useState(
			getState({
				getStore: () => state.store,
				getActions: () => state.actions,
				setStore: updatedStore =>
				setState({
					store: { ...state.store, ...updatedStore },
					actions: { ...state.actions }
				})
						})
		);

		useEffect(() => {
		}, []);


		return (
			<Context.Provider value={state}>
				<PassedComponent {...props} />
			</Context.Provider>
		);
	};
	return StoreWrapper;
};

export default injectContext;