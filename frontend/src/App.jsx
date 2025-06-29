import React from "react"
import { ToastContainer } from "react-toastify"
import { Outlet } from "react-router-dom"
import "react-toastify/dist/ReactToastify.css"
function App() {
  return (
    <>
      <ToastContainer />
      <h1>Hello</h1>
      <main className=' py-4'>
        <Outlet />
      </main>
    </>
  )
}

export default App
