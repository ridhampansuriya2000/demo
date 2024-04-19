import {
   LOADER_START,
    LOADER_STOP
} from "../types";

// Define commonReducer before using it in rootReducer
const initialState = {
    loading: false,
};

export default function commonLoaderReducer(state = initialState, action) {
    switch (action.type) {
        case LOADER_START:
            return { ...state, loading: true,  };
        case LOADER_STOP:
            return { ...state, loading: false };
        default:
            return state;
    }
};