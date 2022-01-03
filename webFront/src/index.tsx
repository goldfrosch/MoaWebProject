import ReactDOM from "react-dom";
import App from "./App";

import { QueryClientProvider, QueryClient } from "react-query";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import rootStore, { rootSaga } from "modules";

import { Router } from "react-router-dom";
import history from "utils/HistoryUtils";
import GlobalStyle from "styles/Global";

const sagaMiddleware = createSagaMiddleware();
const queryClient = new QueryClient();

const store = createStore(
  rootStore,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
      </QueryClientProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
