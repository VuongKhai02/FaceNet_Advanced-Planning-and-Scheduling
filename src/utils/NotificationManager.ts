import { ToastOptions, toast } from "react-toastify";

const defaultConfig: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
}

const warn = (message: string, config?: ToastOptions) => {
    toast.warn(message, { ...defaultConfig, ...config });
}

const error = (message: string, config?: ToastOptions) => {
    toast.error(message, { ...defaultConfig, ...config });
}

const success = (message: string, config?: ToastOptions) => {
    toast.success(message, { ...defaultConfig, ...config });
}

const info = (message: string, config?: ToastOptions) => {
    toast.info(message, { ...defaultConfig, ...config });
}

const NotificationManager = {
    warn,
    error,
    success,
    info,
}

export default NotificationManager;