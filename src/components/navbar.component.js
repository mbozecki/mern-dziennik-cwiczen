import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/" className="navbar-brand">Dziennik ćwiczeń</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav ml-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">Ćwiczenia</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Dodaj ćwiczenie</Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">Dodaj użytkownika</Link>
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}