import {toast} from "react-toastify";
import {LOADER_START, LOADER_STOP} from "../../store/types";

let defaultProps = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    // transition: Bounce,
};

// toasterType = ['info','success','warn','error'];


const toasterAndLoader = ({getState}) => (next) => async (action) => {
    const { toaster: {toasterMessage='',toasterType='info',toasterProps} = {}, loading=''} = action;

    if(toasterMessage){
        toast?.[toasterType]?.(toasterMessage, {...defaultProps,...toasterProps});
    }

    if(loading){
        next({type:LOADER_START});
    }else if(!loading && typeof loading === 'boolean'){
        next({type:LOADER_STOP});
    }

    next(action);

};

export {toasterAndLoader};