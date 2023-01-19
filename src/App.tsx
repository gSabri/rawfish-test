import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import {HomePage} from "./pages/HomePage";
import { PokemonDetail } from './pages/PokemonDetail';

const routeComponents = [
	{ path: '/pokemon/:id', component: <PokemonDetail /> },
	{ path: '/', component: <HomePage /> }
];

function App() {

  const routes = routeComponents.map(({ path, component }, key) => (
    <Route key={key} path={path} element={component} />
  ))

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routes}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
