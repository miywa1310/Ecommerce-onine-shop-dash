import React, { useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Content from '../components/Content'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductData } from '../store/slices/productsSlice'
import { fetchCategoryData } from '../store/slices/categoriesSlice'

const MainLayout = () => {
    const dispatch = useDispatch()
    const urlProduct = "https://ecommerce-data-base.onrender.com/products"
    const urlCategory = "https://ecommerce-data-base.onrender.com/categories"
    
    useEffect(() => {
        dispatch(fetchProductData(urlProduct))
        dispatch(fetchCategoryData(urlCategory))
    }, [])

    return (
        <div className='flex gap-[10px] h-[100vh] w-full p-[10px]'>
            <Sidebar />
            <div className="flex flex-col gap-[10px] w-full">
                <Header />
                <Content>
                    <Outlet />
                </Content>
            </div>
        </div>
    )
}

export default MainLayout