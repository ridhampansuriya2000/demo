import {
    LOADER_START, LOADER_STOP
} from "../types";

export const loaderStart = () => async dispatch => {
    dispatch({type : LOADER_START});
};

export const loaderStop = () => async dispatch => {
    dispatch({type : LOADER_STOP});
};