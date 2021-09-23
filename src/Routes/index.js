import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Quantidade from "../components/Quantidade";
import ConfirmaTeste from "../components/ConfirmaTeste";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Quantidade} />
        <Route path="/inicia-teste" component={ConfirmaTeste} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes