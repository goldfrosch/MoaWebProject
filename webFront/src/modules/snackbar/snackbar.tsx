import { ISnackbar } from "modules";

export const SET_SNACKBAR = "SET_SNACKBAR" as const;

export const setSnackbarAction = (data: ISnackbar) => ({
  type: SET_SNACKBAR,
  data,
});
