import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AdminPanel from "./new-admin-panel/App"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/admin/search_product" component={AdminPanel} />
    
      <Redirect to="/admin/search_product" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
