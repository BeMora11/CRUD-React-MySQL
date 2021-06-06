import React from 'react';
import {Link} from 'react-router-dom';

const Card = (props) => {

  const {imagen, nombre, precio, stock, id_producto} = props;

  return (
    <div className="card">
      <img className="card-img-top" src={imagen} alt="" />
      <div className="card-body">
        <h5 className="card-title">{nombre}</h5>
        <h6 className="card-subtitle mb-2 text-muted">$ {precio}</h6>
        <p className="card-text">Stock: {stock}</p>
        <Link className="btn btn-sm btn-primary" to={`/editar_producto/${id_producto}`}>Ver mas</Link>
      </div>
    </div>
  )
}

export default Card
