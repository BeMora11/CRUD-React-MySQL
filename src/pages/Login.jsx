import React, { useState } from 'react'
import axios from 'axios';
import { urlUsuario } from '../config';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const history = useHistory();

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('user', usuario);
    data.append('password', password);
  
    try {
      let request = await axios.post(urlUsuario + '?op=onLogin', data);
      let response = await request.data;

      // console.log(response);

      if(response !== false){
        localStorage.setItem('usuario', JSON.stringify(response));
        history.push('/');
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="row">
      <div className="col-sm-12 col-md-4 mx-auto mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-center">Accede a tu cuenta</h5>
            <form onSubmit={onLogin}>
              <div className="mb-2">
                <label className="form-label">Usuario:</label>
                <input type="text" required placeholder="Ingresa tu usuario" onChange={(e) => { setUsuario(e.target.value) }} className="form-control" />
              </div>
              <div className="mb-2">
                <label className="form-label">Contraseña:</label>
                <input type="password" required placeholder="Ingresa tu usuario" onChange={(e) => { setPassword(e.target.value) }} className="form-control" />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-sm btn-dark">Iniciar sesión</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
