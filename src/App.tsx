import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from "./pages/HomePage";
import { PokemonPage } from './pages/PokemonPage';

const routeComponents = [
	{ path: '/pokemon/:id', component: <PokemonPage /> },
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
