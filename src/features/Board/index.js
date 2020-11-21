import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import React from "react";
import { Switch, useRouteMatch } from "react-router-dom";
import BoardDetail from "./pages/BoardDetail";
import Main from "./pages/Main";

function Board() {
  const match = useRouteMatch();

  return (
    <>
      <Header />
			<Switch>
				<PrivateRoute exact path={match.url} component={Main} />
				<PrivateRoute path={`${match.url}/:id`} component={BoardDetail} />
			</Switch>
		</>
  );
}

export default Board;
