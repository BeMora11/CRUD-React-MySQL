import React, { useState, useEffect } from 'react'
import Card from '../components/Card';
import Nabvar from '../components/Navbar';
import { urlProducto } from '../config';

const Home = () => {

  const [productos, setProductos] = useState([]);

  const getProductos = async () => {
    try {
      let req = await fetch(urlProducto + '?op=getProductos');
      let res = await req.json();
      // console.log(res)
      setProductos(res);
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getProductos();
  }, [])

  return (
    <div>
      <Nabvar />
      <div className="container-fluid">
        <h4 className="text-center mt-3">Productos</h4>
        <div className="row mt-3">
          {
            productos.map(item => (
              <div className="col-md-2 mb-2" key={item.id_producto}>
                <Card
                  nombre={item.nombre_producto}
                  precio={item.precio_producto}
                  imagen={item.imagen_producto}
                  stock={item.stock_producto}
                  id_producto={item.id_producto}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home
