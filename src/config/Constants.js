import { BiLayerPlus } from "react-icons/bi"; 
import { BsBagPlus } from "react-icons/bs"; 
import { CgProductHunt } from "react-icons/cg"; 
import { BiCategoryAlt } from "react-icons/bi"; 
export const btnData=[
    {
        id:1, path:"/", icon:BiCategoryAlt, title:"Categories"
    },
    {
        id:2, path:"/products", icon:CgProductHunt, title:"Products"
    },
    {
        id:3, path:"/create-category", icon:BiLayerPlus , title:"Create category"
    },
    {
        id:4, path:"/create-product", icon:BsBagPlus , title:"Create product"
    },
]