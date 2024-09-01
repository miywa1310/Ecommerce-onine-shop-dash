import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProCardSkleton from '../components/page-components/ProCardSkleton'
import ProductsCard from '../components/page-components/ProductsCard'
import { deleteProduct } from '../store/slices/productsSlice'
import { toggleModalAlert } from '../store/slices/pageSlice'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalAlert from '../components/page-components/ModalAlert'
import EditProductForm from '../components/page-components/EditProductForm'

const Products = () => {
  const dispatch = useDispatch()
  const urlProduct = "https://ecommerce-data-base.onrender.com/products"
  const { products, isProductsLoad,  selectedProId } = useSelector(state => state.products)
  const updateItem=products.find(item=>item.id==selectedProId)
  const { showModal, modalType } = useSelector(state => state.pageActions)

  function deleteProductFunc() {
    try {
      dispatch(deleteProduct({ urlProduct, selectedProId }))
      toast.success('Deleted category successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      dispatch(toggleModalAlert())
    } catch {
      toast.error('Error detected', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      })
    }
  }

  return (
    <div>
      <div className=" flex items-center justify-center flex-col  sm:grid  grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-[20px] w-full">
        {
          isProductsLoad ?
            [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <ProCardSkleton key={item} />
            )) :
            products.map((item) => (
              <ProductsCard item={item} key={item.id} />
            ))
        }
      </div>
      {
        showModal && modalType == "delete" &&
        <ModalAlert title={"Delete Product"} >
          <div className="flex justify-center flex-col  gap-[20px]">
            <h2>Is this product really deleted?</h2>
            <div className="flex justify-end items-center gap-[20px]">
              <button onClick={() => dispatch(toggleModalAlert())} className='py-y-[5px] px-[10px] shadow-sm rounded-md bg-blue-500 text-white text-[18px] hover:bg-blue-600 active:scale-95'>Cancel</button>
              <button onClick={() => deleteProductFunc()} className='py-y-[5px] px-[10px] shadow-sm rounded-md bg-red-500 text-white text-[18px] hover:bg-red-600 active:scale-95'>Delete</button>
            </div>
          </div>
        </ModalAlert>
      }
      {
        showModal && modalType == "update" &&
        <ModalAlert title={"Update Product"} >
          <EditProductForm item={updateItem} />
        </ModalAlert>
      }
      <ToastContainer />
    </div>
  )
}

export default Products