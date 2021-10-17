import { authGetProfileAction } from "modules/auth/auth";
import MainPage from "pages/MainPage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import GlobalStyle from "styles/Global";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authGetProfileAction());
  });
  return (
    <>
      <GlobalStyle />
      <MainPage />
    </>
  );
}

export default App;
