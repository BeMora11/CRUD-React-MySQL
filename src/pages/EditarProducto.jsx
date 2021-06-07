import React, { useState, useEffect } from 'react';
import { urlProducto } from '../config';
import { useParams, useHistory } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const EditarProducto = () => {

  const history = useHistory();

  const { productoID } = useParams();

  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState(false);
  const [eliminado, setEliminado] = useState(false);

  const getProducto = async () => {

    let data = new FormData();
    data.append('id', productoID);

    try {
      let req = await axios.post(urlProducto + '?op=getProducto', data);
      let res = await req.data;

      setNombre(res.nombre_producto);
      setPrecio(res.precio_producto);
      setStock(res.stock_producto);
      setImagen(res.imagen_producto);
    } catch (err) {
      console.error(err)
    }
  }

  const actualizarProducto = (e) => {
    e.preventDefault();

    let data = new FormData();

    data.append('nombre', nombre);
    data.append('precio', precio);
    data.append('stock', stock);
    data.append('imagen', imagen);
    data.append('id', productoID);

    axios.post(urlProducto + '?op=updateProducto', data)
      .then(r => r.data)
      .then(r => {
        // console.log(r)
        if (r == 1) {
          setGuardado(true);
        } else {
          setError(true);
        }
      })
      .catch(err => console.error(err))
  }

  const eliminarProducto = () => {

    let data = new FormData();

    data.append('id', productoID);

    axios.post(urlProducto + '?op=deleteProducto', data)
      .then(r => r.data)
      .then(r => {
        // console.log(r)
        if (r == 1) {
          setEliminado(true);
          setTimeout(() => {
            history.push('/');
          }, 1500);
        } else {
          setError(true);
        }
      })
      .catch(err => console.error(err))
  }

  useEffect(() => {
    getProducto();
  }, [])

  return (
    <div>
      <Navbar />
      <div className="container-fluid">
        <h4 className="text-center mt-3">Editar producto</h4>

        <div className="row my-3">
          <div className="col-sm-6 mx-auto">
            <div className="card shadow-sm">
              <div className="card-body">
                {
                  guardado == true ?
                    <div className="alert alert-info alert-dismissible fade show" role="alert">
                      Producto <strong>actualizado</strong> correctamente.
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
                <form onSubmit={actualizarProducto}>
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
                  <button type="submit" className="btn btn-sm btn-success">Guardar cambios</button>
                  <button type="button" onClick={eliminarProducto} className="btn btn-sm btn-danger ms-2">Eliminar</button>
                </form>
                {
                  eliminado == true ?
                    <div className="alert alert-info alert-dismissible fade show mt-2" role="alert">
                      Producto <strong>eliminado</strong> correctamente.
                      <button onClick={() => setEliminado(false)} type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    :
                    ''
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditarProducto
