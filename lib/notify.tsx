import { toast } from "react-hot-toast";

const notify = {
  success: toast.success,
  error: toast.error,
  withPromise: async (promise: Promise<unknown>) => {
    return toast.promise(promise, {
      loading: "Processing...",
      success: "Successful",
      error: "Failed: Something went wrong",
    });
  },
};

export default notify;
