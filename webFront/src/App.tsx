import { useEffect } from "react";
import { useDispatch } from "react-redux";

import MainPage from "pages/MainPage";
import { authGetProfileAction } from "modules/auth/auth";

import { SnackbarProvider } from "notistack";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGetProfileAction());
  });

  return (
    <SnackbarProvider maxSnack={3} autoHideDuration={2000}>
      <MainPage />
    </SnackbarProvider>
  );
}

export default App;
