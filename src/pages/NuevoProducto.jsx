import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { urlProducto } from '../config';

const NuevoProducto = () => {

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState(false);

  const guardarProducto = (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append('nombre', nombre);
    data.append('precio', precio);
    data.append('stock', stock);
    data.append('imagen', imagen);

    fetch(urlProducto + '?op=newProducto', {
      method: 'POST',
      body: data
    })
      .then(r => r.text())
      .then(r => {
        // console.log(r)
        if (r == 1) {
          setGuardado(true);
          setNombre('');
          setPrecio('');
          setStock('');
          setImagen('');

        } else {
          setError(true);
        }
      })
      .catch(err => console.error(err))

  }

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h4 className="text-center mt-3">Nuevo producto</h4>

        <div className="row my-3">
          <div className="col-sm-6 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                {
                  guardado == true ?
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      Producto <strong>guardado</strong> correctamente.
                      <button onClick={() => setGuardado(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    :
                    ''
                }
                {
                  error == true ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      Ha ocurrido un <strong>error</strong>.
                    <button onClick={() => setError(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    :
                    ''
                }
                <form onSubmit={guardarProducto}>
                  <div className="mb-2">
                    <label className="form-label">Producto:</label>
                    <input type="text" value={nombre} name="nombre" onChange={(e) => { setNombre(e.target.value) }} placeholder="Ingresa el nombre del producto" className="form-control" required autoComplete="off" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Precio:</label>
                    <input type="number" value={precio} name="precio" onChange={(e) => { setPrecio(e.target.value) }} placeholder="Ingresa el precio del producto" className="form-control" required autoComplete="off" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Stock:</label>
                    <input type="number" value={stock} name="stock" onChange={(e) => { setStock(e.target.value) }} placeholder="Ingresa el stock del producto" className="form-control" required autoComplete="off" />
                  </div>
                  <div className="mb-2">
                    <label className="form-label">Imagen:</label>
                    <input type="text" value={imagen} name="imagen" onChange={(e) => { setImagen(e.target.value) }} placeholder="Ingresa la url de la imagen" className="form-control" required autoComplete="off" />
                  </div>
                  <img className="img-fluid my-3" src={imagen} alt="" />
                  <button type="submit" className="btn btn-sm btn-success">Guardar</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NuevoProducto
