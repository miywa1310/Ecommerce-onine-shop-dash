import { FaSpinner } from "react-icons/fa"; 
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, setSelectedId } from "../store/slices/categoriesSlice";
import { setModalType, toggleModalAlert } from "../store/slices/pageSlice";
import ModalAlert from "../components/page-components/ModalAlert";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditCategoryForm from "../components/page-components/EditCategoryForm";

const Categories = () => {
  const { categories, isCategoriesLoad, selectedId } = useSelector(state => state.categories)
  const { showModal, modalType } = useSelector(state => state.pageActions)
  const updateItem = categories.find(item => item.id == selectedId)
  const urlCategory = "https://ecommerce-data-base.onrender.com/categories"
  const dispatch = useDispatch()
  function handleDelete(id) {
    dispatch(setSelectedId(id))
    dispatch(setModalType("delete"))
    dispatch(toggleModalAlert())
  }
  function handleUpdate(id) {
    dispatch(setSelectedId(id))
    dispatch(setModalType("update"))
    dispatch(toggleModalAlert())
  }
  function deleteCategoryFunc() {

    try {
      dispatch(deleteCategory({ urlCategory, selectedId }))
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
    <div className='my-[20px]'>
      {
        isCategoriesLoad ? 
        <div className="w-full h-[70vh] text-[22px] flex items-center justify-center text-gray-500 gap-[5px] animate-pulse">
           <span><FaSpinner className="animate-spin"/></span>
           <span className="animate-pulse">Loading...</span>
        </div> :
          <div className="text-black text-[18px] gap-[30px] flex-wrap flex items-center w-full ">
            {
              categories.map(item => (
                <div key={item.id} className="min-w-[280px]  py-[10px] px-[20px] items-center justify-between flex gap-[10px] rounded-md cursor-pointer border border-gray-800">
                  <p>{item.title}</p>
                  <div className=" flex gap-[10px] items-center justify-center">
                    <div onClick={() => handleUpdate(item.id)} className=" cursor-pointer bg-gray-100 rounded-md p-[5px] text-blue-600 text-[20px] active:scale-125"><BiEditAlt /></div>
                    <div onClick={() => handleDelete(item.id)} className=" cursor-pointer bg-gray-100 rounded-md p-[5px] text-[20px] text-red-600 active:scale-125"><RiDeleteBin6Line /></div>
                  </div>
                </div>
              ))
            }
          </div>
      }
      {
        showModal && modalType == "delete" &&
        <ModalAlert title={"Delete Category"} >
          <div className="flex justify-center flex-col  gap-[20px]">
            <h2>Is this category really deleted?</h2>
            <div className="flex justify-end items-center gap-[20px]">
              <button onClick={() => dispatch(toggleModalAlert())} className='py-y-[5px] px-[10px] shadow-sm rounded-md bg-blue-500 text-white text-[18px] hover:bg-blue-600 active:scale-95'>Cancel</button>
              <button onClick={() => deleteCategoryFunc()} className='py-y-[5px] px-[10px] shadow-sm rounded-md bg-red-500 text-white text-[18px] hover:bg-red-600 active:scale-95'>Delete</button>
            </div>
          </div>
        </ModalAlert>
      }
      {
        showModal && modalType == "update" &&
        <ModalAlert title={"Update Category"} >
          <EditCategoryForm item={updateItem} />
        </ModalAlert>
      }
      <ToastContainer />
    </div>
  )
}

export default Categories