import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useRef, useState } from 'react';
import { createProduct } from '../store/slices/productsSlice';
import 'boxicons'
import { FaSpinner } from 'react-icons/fa';


const CreateProduct = () => {
  const dispatch = useDispatch()
  const urlProduct = "http://0.0.0.0:3000/products"
  const { products, isProductsLoad, selectedProId } = useSelector(state => state.products)
  const { categories, isCategoriesLoad } = useSelector(state => state.categories)
  const imageCont = useRef()
  const ImgInput = useRef()
  const initialValues = {
    name: "",
    categoryId: "",
    price: "",
    images: "",
    description: "",
    rating: "",
    amount: 1
  }
  const validationSchema = Yup.object({
    name: Yup.string().max(100, "Max character is 100").required("Name is required"),
    categoryId: Yup.number().required("Category is required"),
    // images: Yup.string().url("Invalid url adress").required("Image is required"),
    description: Yup.string().min(100, "Min character is 100").max(500, "Max character is 500").required("description is required"),
    rating: Yup.number().required("Rating is requrired"),
    price: Yup.number().required("Price is requrired"),
  })

  const [images, setImages] = useState([])

  function ImgSaveBtn(element) {
    const value = element.current.value
    if (value.length > 0) {
      if (!images.find(item => item === value)) {
        setImages(prev => {
          const finalValue = [...prev, value]
          return finalValue
        })
        element.current.value = ""
      }
    }


  }

  function string_to_slug(str) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    // remove accents, swap ñ for n, etc
    var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
    var to = "aaaaeeeeiiiioooouuuunc------";
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }
  useEffect(() => {
    imageCont.current.innerHTML = ""
    images.forEach((i, index) => {
      imageCont.current.innerHTML += `
                <div class="flex text-[14px] items-center justify-center gap-[3px] bg-gray-200 px-[5px] rounded-md  ">
                    <span>image-${index + 1}</span>
                    <div data-imgurl=${i} class="close flex items-center justify-center active:scale-95 cursor-pointer"><box-icon size="sm" name='x'></box-icon></div>
                </div>`
    })
    const closeBtns = document.querySelectorAll(".close")
    closeBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const urlImg = btn.dataset.imgurl
        setImages(prev => prev.filter(item => item !== urlImg))
      })
    })
  }, [images.length])

  return (
    <div className="">
      {
        isCategoriesLoad ?
          <div className="w-full h-[70vh] text-[22px] flex items-center justify-center text-gray-500 gap-[5px] animate-pulse">
            <span><FaSpinner className="animate-spin" /></span>
            <span className="animate-pulse">Loading...</span>
          </div> :
          <div className="">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                console.log(values)
                try {
                  values.images = images
                  const newValues = { ...values, slug: string_to_slug(values.name) }
                  console.log(newValues)
                  dispatch(createProduct({ urlProduct, productData: newValues }))
                  toast.success('Created product successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  setImages([])
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
                    theme: "light",
                  });
                }
              }}
              validate={() => {
                const errors = {}
                if (images.length < 3) {
                  errors.images = "Min images 3"
                }
                return errors
              }}

            >
              <Form className='flex flex-col gap-[5px]'>
                <div className="flex flex-col ">
                  <label htmlFor="name">Name:</label>
                  <Field className="outline-none border py-[5px]  px-[20px] rounded-md" name="name" placeholder="Enter the name" type="text" />
                  <span className='text-red-500 text-[14px]'><ErrorMessage name='name' /></span>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="price">Price:</label>
                  <Field className="outline-none border py-[5px]  px-[20px] rounded-md" name="price" placeholder="Enter the price" type="text" />
                  <span className='text-red-500 text-[14px]'><ErrorMessage name='price' /></span>
                </div>
                <div className="flex flex-col ">
                  <label className='flex flex-col' htmlFor="images">
                    <span>Images url:</span>
                    <div ref={imageCont} className="flex justify-start gap-1 items-center mb-[3px]">

                    </div>
                  </label>

                  <div className="relative">
                    <Field name="images">
                      {(field) => (
                        <input {...field} ref={ImgInput || ""} name='images' required className="py-[7px] w-full border-[1px] hover:border-orange-400 rounded-md px-[15px] outline-none " type="url" id="images" placeholder="Enter the images url. Please enter separately" />
                      )}
                    </Field>
                    <div className="absolute top-0 right-0 bottom-0 p-[5px]">
                      <button type='button' onClick={() => ImgSaveBtn(ImgInput)} className='h-full px-[15px] bg-gray-100 rounded-sm active:scale-95 hover:bg-gray-200'>Save</button>
                    </div>
                  </div>
                  <span className='text-[14px] text-red-500'><ErrorMessage name='images' /></span>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="description">Description:</label>
                  <Field as="textarea" className="h-[100px] resize-none py-[7px] border-[1px] hover:border-orange-400 rounded-md px-[15px] outline-none " type="text" name="description" placeholder="Enter the description" />
                  <span className='text-[14px] text-red-500'><ErrorMessage name="description" /></span>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="rating">Rating:</label>
                  <Field className="py-[7px] border-[1px] hover:border-orange-400 rounded-md px-[15px] outline-none " type="number" name="rating" placeholder="Enter the rating" />
                  <span className='text-[14px] text-red-500'><ErrorMessage name='rating' /></span>
                </div>
                <div className="flex flex-col ">
                  <label htmlFor="categoryId">Category:</label>
                  <Field as="select" className="py-[7px] border-[1px] hover:border-orange-400 rounded-md px-[15px] outline-none " type="text" name="categoryId" placeholder="Enter the categoryId" >
                    {
                      categories?.map(item => (
                        <option key={item.id} defaultValue={item.id} value={item.id}>{item.title}</option>
                      ))
                    }
                  </Field>
                  <span className='text-[14px] text-red-500'><ErrorMessage name='categoryId' /></span>
                </div>
                <div className="w-full justify-end flex mt-[10px]">
                  <button type='submit' className='px-[20px] py-[5px] rounded-md border border-gray-800 text-[20px] max-w-max '>Send</button>
                </div>
              </Form>

            </Formik>
            <ToastContainer />
          </div>
      }

    </div>
  )
}

export default CreateProduct