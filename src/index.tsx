import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

// import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/style.css';

import Lobby from "./layouts/lobby/Lobby"


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <div className="App">
                <Route path="/" exact component={Lobby}/>
            </div>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
