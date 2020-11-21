import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Board from "features/Board";
import PrivateRoute from "components/PrivateRoute";
import Profile from "features/UserInfo";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import Loading from "components/Loading";
import { useSelector } from "react-redux";

function App() {
  const { loading } = useSelector((state) => state.loading);

  return (
    <BrowserRouter>
      {loading && <Loading />}
      <Switch>
        <Redirect exact from="/" to="/boards" />

        <PrivateRoute path="/boards" component={Board} />

        <PrivateRoute path="/profile" component={Profile} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
