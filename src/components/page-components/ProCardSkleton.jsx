import { CgImage } from "react-icons/cg";

const ProCardSkleton = () => {
    return (
        <div className='animate-pulse border-[1px] p-[20px] w-full rounded-md border-gray-200 '>
            <div className="flex flex-col">
                <div className="h-[160px] mb-[20px] bg-gray-200 rounded-md flex justify-center items-center text-[24px] text-gray-300 animate-pulse"><CgImage /></div>
                <div className="w-[95%] mb-[10px] animate-pulse bg-gray-200 h-[18px] rounded-lg"></div>
                <div className="flex flex-col gap-[5px]">
                    <div className="w-[90%] animate-pulse bg-gray-200 h-[12px] rounded-lg"></div>
                    <div className="w-[90%] animate-pulse bg-gray-200 h-[12px] rounded-lg"></div>
                    <div className="w-[90%] animate-pulse bg-gray-200 h-[12px] rounded-lg"></div>
                </div>
                <div className="w-[50%] mt-[22px] animate-pulse bg-gray-200 h-[25px] rounded-sm"></div>
            </div>
        </div>
    )
}

export default ProCardSkleton