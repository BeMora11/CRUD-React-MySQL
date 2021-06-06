import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import EditarProducto from './pages/EditarProducto';
import Home from './pages/Home';
import NuevoProducto from './pages/NuevoProducto';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/nuevo_producto" component={NuevoProducto} />
        <Route exact path="/editar_producto/:productoID" component={EditarProducto} />
      </Switch>
    </Router>
  );
}

export default App;
