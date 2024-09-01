import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Categories from './pages/Categories'
import MainLayout from './layouts/MainLayout'
import Products from './pages/Products'
import CreateCategory from './pages/CreateCategory'
import CreateProduct from './pages/CreateProduct'
import { Provider } from 'react-redux'

const App = () => {
  const router=createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<Categories/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/create-category' element={<CreateCategory/>}/>
        <Route path='/create-product' element={<CreateProduct/>}/>
      </Route>
    )
  )
  return (
    <RouterProvider router={router}>
        
    </RouterProvider>
  )
}

export default App