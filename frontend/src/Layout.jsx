import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import injectContext from './js/store/appContext.jsx';
import './index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './views/Login.jsx';
import  Clientes from './views/Clientes.jsx';
import PerfilCliente from './views/PerfilCliente.jsx';
import MaquilaFormModal from './components/MaquilaFormModal.jsx';
import MaquilaViewModal from './components/MaquilaViewModal.jsx';

const Layout = () => {
    const basename = import.meta.env.VITE_BASENAME || "";
    return (
        <div className="d-flex flex-column min-vh-100" style={{ margin: 0, padding: 0 }}>
            <BrowserRouter>
                <Navbar />
                <ToastContainer position="top-right" autoClose={1000} />
                <div className="flex-grow-1 w-100" style={{ margin: 0, padding: 0 }}>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/clientes' element={<Clientes />} />
                        <Route path='/perfil-cliente/:id' element={<PerfilCliente />} />
                        <Route path='/maquila-form' element={<MaquilaFormModal />} />
                        <Route path='/maquila-view/:id' element={<MaquilaViewModal />} />
                        {/* Puedes agregar más rutas aquí */}
                  
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default injectContext(Layout);