import react from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { TbReceiptRupee } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logo(){
    return(
        <div className='w-[100vw] min-h-[90px] flex items-center gap-4 justify-center flex-nowrap mt-[30px] md:mb-[50px] overflow-x-auto'>
            <div className='flex items-center gap-2 justify-center px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] text-[14px] sm:text-[18px] font-light whitespace-nowrap'>
                <MdCastForEducation className='w-[30px] h-[30px] sm:w-[20px] sm:h-[20px] fill-[#03394b]' />
                20k+ Online Courses
            </div>

            <div className='flex items-center gap-2 justify-center px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] text-[14px] sm:text-[18px] font-light whitespace-nowrap'>
                <SiOpenaccess className='w-[30px] h-[30px] sm:w-[20px] sm:h-[20px] fill-[#03394b]' />
                Lifetime Access
            </div>

            <div className='flex items-center gap-2 justify-center px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] text-[14px] sm:text-[18px] font-light whitespace-nowrap'>
                <TbReceiptRupee className='w-[30px] h-[30px] sm:w-[20px] sm:h-[20px] fill-[#03394b]' />
                Value For Money
            </div>

            <div className='flex items-center gap-2 justify-center px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] text-[14px] sm:text-[18px] font-light whitespace-nowrap'>
                <BiSupport className='w-[30px] h-[30px] sm:w-[20px] sm:h-[20px] fill-[#03394b]' />
                Lifetime Support
            </div>

            <div className='flex items-center gap-2 justify-center px-5 py-3 rounded-3xl bg-gray-200 cursor-pointer text-[#03394b] text-[14px] sm:text-[18px] font-light whitespace-nowrap'>
                <FaUsers className='w-[30px] h-[30px] sm:w-[20px] sm:h-[20px] fill-[#03394b]' />
                Community Support
            </div>
        </div>
    )
}

export default Logo