import { authGetProfileAction } from "modules/auth/auth";
import MainPage from "pages/MainPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGetProfileAction());
  });
  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
