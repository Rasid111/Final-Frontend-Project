import { createStore } from "redux"

const configureStore = () => {
    const store = createStore();
    return store;
}

export default configureStore;