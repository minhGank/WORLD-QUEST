import { toast } from "react-toastify";

export const toastFunction = (type, msg) => {
  switch (type) {
    case "success":
      toast.success(msg);
      break;
    case "error":
      toast.error(msg);
      break;
    case "warn":
      toast.warn(msg);
      break;
    case "info":
      toast.info(msg);
      break;
    default:
      toast(msg);
  }
};
