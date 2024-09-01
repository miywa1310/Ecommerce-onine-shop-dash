import { AiOutlineStar } from "react-icons/ai";
import { FaStarHalf } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { BiEditAlt } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { setModalType, toggleModalAlert } from "../../store/slices/pageSlice";
import { setSelectedProId } from "../../store/slices/productsSlice";


const ProductsCard = ({ item }) => {

    const dispatch = useDispatch()
    function handleDelete(id) {
        dispatch(setSelectedProId(id))
        dispatch(setModalType("delete"))
        dispatch(toggleModalAlert())
    }

    function handleUpdate(id) {
        dispatch(setSelectedProId(id))
        dispatch(setModalType("update"))
        dispatch(toggleModalAlert())
    }
    function NameFunction(name) {
        let miniName = ""
        if (name.length > 23) {
            for (let i = 0; i < 20; i++) {
                miniName += name[i]
            }
            miniName += "..."
        } else {
            miniName = name
        }
        return miniName
    }
    function checkItemRate(count) {
        const rateStar = []
        for (let i = 1; i <= 5; i++) {
            if (i <= +count?.toFixed()) {
                if (i - 0.4 >= +count) {
                    rateStar.push(0.5)
                }
                else {
                    rateStar.push(1)
                }
            } else {
                rateStar.push(0)
            }
        }
        return rateStar
    }
    const rateStar = checkItemRate(item?.rating)

    return (
        <div className='border shadow-md h-full py-[20px] rounded-md flex flex-col justify-between items-center gap-[10px] sm:w-full '>
            <div className="cursor-pointer px-[20px] w-full flex justify-end items-end text-[25px] text-[#919191C4]">
            </div>
            <img className="h-[175px] w-[150px] object-contain" src={item.images[0]} alt="" />
            <div className=" w-full flex justify-center flex-col items-center">
                <p className="px-[20px] text-[20px] font-medium">{NameFunction(item.name)}</p>
                <div className="flex justify-center items-end  gap-1">
                    <div className="flex justify-center  text-[20px] text-yellow-400 gap-1">
                        {rateStar.map((item, index) => {
                            switch (item) {
                                case 1:
                                    return (
                                        <AiFillStar key={index} />
                                    )
                                case 0.5:
                                    return (
                                        <FaStarHalf key={index} />
                                    )
                                case 0:
                                    return (
                                        <AiOutlineStar key={index} />
                                    )
                            }
                        })}
                    </div>
                </div>
            </div>
            <div className="w-full items-center px-[20px] flex justify-between gap-[20px]">
                <h2 className="text-[24px] font-bold">${item.price}</h2>
                <div className="flex gap-[10px] items-center justify-center">
                <div onClick={() => handleUpdate(item.id)} className=" cursor-pointer bg-gray-100 rounded-md p-[5px] text-blue-600 text-[20px] active:scale-125"><BiEditAlt /></div>
                <div onClick={() => handleDelete(item.id)} className=" cursor-pointer bg-gray-100 rounded-md p-[5px] text-[20px] text-red-600 active:scale-125"><RiDeleteBin6Line /></div>
                </div>
            </div>
        </div>
    )
}

export default ProductsCard