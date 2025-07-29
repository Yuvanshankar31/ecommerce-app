import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Routes, Route, Navigate } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Edit from './pages/Edit'
import Orders from './pages/Orders'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


 export const backendUrl = import.meta.env.VITE_BACKEND_URL
 export const currency = '₹'
const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token') || '');


useEffect(()=> {
  localStorage.setItem('token',token)
},[token])


  return (
    <div className="admin-layout">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {token === "" ? (
        <Login setToken={setToken}/>
      ) : (
        <div className="admin-container">
          <Navbar setToken={setToken} />
          <div className="admin-main">
            <Sidebar />
            <main className="admin-content-area">
              <div className="content-wrapper">
                <Routes>
                  <Route path='/admin/add' element={<Add token={token}/>} />
                  <Route path='/admin/list' element={<List token={token}/>} />
                  <Route path='/admin/edit/:id' element={<Edit token={token}/>} />
                  <Route path='/admin/orders' element={<Orders token={token} />} />
                  <Route path='/' element={<Navigate to='/admin/list' />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  )
}

export default App