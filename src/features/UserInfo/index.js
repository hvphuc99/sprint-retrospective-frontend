import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import Profile from "./pages/Profile";

function UserInfo() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
			<Switch>
				<PrivateRoute exact path={match.url} component={Profile} />
			</Switch>
		</>
  );
}

export default UserInfo;
