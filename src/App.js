import "./App.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "components/PrivateRoute";
import Login from "features/Auth/pages/Login";
import Register from "features/Auth/pages/Register";
import Loading from "components/Loading";
import { useSelector } from "react-redux";
import PublishRoute from "components/PublishRoute";
import Board from "features/Board";
import Profile from "features/UserInfo/pages/Profile";
import NotFound from "components/NotFound";

function App() {
  const { loading } = useSelector((state) => state.loading);

  return (
    <BrowserRouter>
      {loading && <Loading open={loading} />}
      <Switch>
				<Redirect exact from="/" to="/boards" />
        <PrivateRoute path="/boards" component={Board} />
        <PrivateRoute path="/profile" component={Profile} />

        <PublishRoute path="/login" component={Login} />
        <PublishRoute path="/register" component={Register} />

				<Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
