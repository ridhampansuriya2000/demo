import {
    LOAD_TOASTER
} from "../types";

export const loadToaster = (payload) => async dispatch => {
    dispatch({type : LOAD_TOASTER, toaster: {toasterMessage:"Abc",...payload}});
};