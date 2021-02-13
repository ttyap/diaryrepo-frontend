import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import "./App.css";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import TodolistForm from "./components/pages/Dashboard/Todolist-form";
import DiaryForm from "./components/pages/Dashboard/Diary-form";
import MoodForm from "./components/pages/Dashboard/Mood-form";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";


class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <ProtectedRoute path="/diary" component={DiaryForm} />
            <ProtectedRoute path="/mood" component={MoodForm} />

            <ProtectedRoute path="/todolist" component={TodolistForm} />
            <GuestRoute path="/register" component={Register} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <GuestRoute path="/" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
