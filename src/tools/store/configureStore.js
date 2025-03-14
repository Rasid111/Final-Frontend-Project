import { createStore } from "redux"
import { accountReducer } from "../reducers/accountReducer";

const configureStore = () => {
    const store = createStore(accountReducer);
    store.subscribe(() => {
        localStorage.setItem("accounts", JSON.stringify(store.getState()));
    });
    return store;
}

export default configureStore;