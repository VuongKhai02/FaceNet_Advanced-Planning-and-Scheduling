import { toast } from "react-toastify";

export const toastError = (error) => {
    toast.error(error);
};

export const toastSuccess = (msg) => {
    toast.success(msg);
};
