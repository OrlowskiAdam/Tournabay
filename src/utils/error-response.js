import toast from "react-hot-toast";

export const notifyOnError = (error) => {
  const errors = error.response.data.errors ?? undefined;
  if (errors) {
    toast.error(errors[0].defaultMessage);
  } else {
    toast.error(error.response.data.message);
  }
};
