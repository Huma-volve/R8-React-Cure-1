import SearchIcon from '@mui/icons-material/Search';
import type { RootState } from '../Redux-Store/BokingStore/BokingStore';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../Redux-Store/ChatSlice/ChatSlice';

export default function Search() {

  

     const msg = useSelector( (msg : RootState)=>{
      return msg.ChatSlice
    })

    const dispatch = useDispatch()

  return <>

   <div className="relative py-2.5 px-1.5 ">
   <SearchIcon className="absolute  top-5 left-2 text-gray-500" />
  
  <input
    value={msg.search || "" }
    onChange={(e)=> dispatch(setSearch(e.target.value)) }
    type="text"
    placeholder="Search For Chat Doctor"
    className="w-full p-2 pl-9 focus:outline-none bg-[#f5f6f7] rounded-md"
  />
</div>


  </>
}
