import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createCategory } from '../store/slices/categoriesSlice';

const CreateCategory = () => {
  const dispatch = useDispatch()
  const urlCategory = "https://ecommerce-data-base.onrender.com/categories"
  const { categories, isCategoriesLoad, isCategoriesError } = useSelector(state => state.categories)
  const initialValues = {
    title: ""
  }
  const validationSchema = Yup.object({
    title: Yup.string().max(100, "Max character is 100").required("Title is required")
  })
  return (
    <div className="">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={(values) => {
          // console.log(values)
          const errors = {};
          if (categories.find(item => item.title == values.title)) {
            errors.title = 'This category has been created before';
          }
          return errors;
        }}
        onSubmit={(values, actions) => {
          console.log(values)
          try {
            dispatch(createCategory({ urlCategory, categoryData: values }))
            toast.success('Created category successfully', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
            actions.resetForm()
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
        }}
      >
        <Form>
          <div className="flex flex-col ">
            <label htmlFor="title">Title:</label>
            <Field className="outline-none border py-[5px]  px-[20px] rounded-md" name="title" placeholder="Enter the title" type="text" />
            <span className='text-red-500 text-[14px]'><ErrorMessage name='title' /></span>
          </div>
          <div className="w-full justify-end flex mt-[10px]">
            <button type='submit' className='px-[20px] py-[5px] rounded-md border border-gray-800 text-[20px] max-w-max '>Send</button>
          </div>
        </Form>

      </Formik>
      <ToastContainer />
    </div>
  )
}

export default CreateCategory