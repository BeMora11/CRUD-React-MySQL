import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { urlProducto } from '../config';

const Navbar = () => {

  const [buscar, setBuscar] = useState('');
  const [results, setResults] = useState([]);


  const buscarProducto = async (e) => {

    // e.preventDefault();

    // setBuscar(e.target.value);

    let data = new FormData();

    data.append('buscar', buscar);

    if (buscar.length > 0) {
      let request = await axios.post(urlProducto + '?op=buscarProducto', data);
      let res = request.data;

      setResults(res);
    } else {
      setBuscar('');
      setResults([]);
    }
  }


  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Dashboard</Link>
        <div className="me-auto">
          <form onSubmit={buscarProducto} className="input-group">
            <input type="text" value={buscar} onKeyUp={buscarProducto} onChange={(e) => { setBuscar(e.target.value) }} className="form-control" placeholder="Busca productos" />
            <button type="submit" className="btn btn-outline-info"><i className="fas fa-search"></i></button>
          </form>
          <div className="position-relative">
            <ul className="list-group list-group-flush position-absolute w-100 shadow-sm">
              {
                results.length > 0 &&
                results.map(item => (
                  <Link to={`/editar_producto/${item.id_producto}`} key={item.id_producto} className="list-group-item">{item.nombre_producto}</Link>
                ))
              }
            </ul>
          </div>
        </div>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/nuevo_producto" className="btn btn-sm btn-success"><i className="fas fa-plus-square me-1"></i>Registrar producto</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
