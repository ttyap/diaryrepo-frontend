import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import TodolistForm from "./components/pages/Dashboard/Todolist-form";
import DiaryForm from "./components/pages/Dashboard/Diary-form";
import MoodForm from "./components/pages/Dashboard/Mood-form";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/diary" component={DiaryForm} />
            <Route path="/mood" component={MoodForm} />

            <Route path="/todolist" component={TodolistForm} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
