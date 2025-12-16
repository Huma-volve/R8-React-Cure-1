import { useState  } from "react";
// import Specialist from "@/Components/Cards/Specialist";
import Button from '@mui/material/Button';
import TuneIcon from "@mui/icons-material/Tune";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import InputBase from '@mui/material/InputBase';    
import RouteIcon from '@mui/icons-material/Route';
import DoctorCard from "@/Components/Cards/DoctorCard";
import AnimatedPagination from "@/Components/Animation";
import { Bluetooth as Tooth, Heart, Stethoscope, Brain, User, Eye, Wind } from "lucide-react"

const Search = styled('div')(({ theme }) => ({
    border: '1px solid #ccc',
    position: 'relative',
    borderRadius: 10,
    width:'80%',
    height:52,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: '396px',
    // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#6D7379',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '80%',
    // [theme.breakpoints.up('md')]: {
    //   width: '20ch',
    // },
  },
}));
interface Specialist {
  id: string
  name: string
  icon: React.ReactNode
}

const specialists: Specialist[] = [
  { id: "dentist", name: "Dentist", icon: <Tooth className="w-5 h-5" /> },
  {
    id: "cardiologist",
    name: "Cardiologist",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    id: "ent",
    name: "ENT",
    icon: <Stethoscope className="w-5 h-5" />,
  },
  {
    id: "neurologist",
    name: "Neurologist",
    icon: <Brain className="w-5 h-5" />,
  },
  {
    id: "gp",
    name: "General Practitioner",
    icon: <User className="w-5 h-5" />,
  },
  {
    id: "ophthalmologist",
    name: "Ophthalmologist",
    icon: <Eye className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    id: "pulmonologist",
    name: "Pulmonologist",
    icon: <Wind className="w-5 h-5" />,
  },
]
export const SearchDoctor = () => {
    const [selected, setSelected] = useState<string | null>(null)

     const handleScroll = (direction: "left" | "right") => {
    const container = document.getElementById("specialist-scroll")
    if (container) {
      const scrollAmount = 200
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      })
    }
    }
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => {
      setIsOpen(!isOpen); // toggle between true and false
      };
    const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);
    const itemsPerPage = 6;
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const [page, setPage] = useState(1);
    //const startIndex = (page - 1) * itemsPerPage;

    return (
    <> 
       <div className="flex-1 mt-30">    
            {/*Search & filter  bar*/}      
            <div className="pt-3 pl-15 flex items-center space-x-5 mb-6">
                <div className="relative"> {/*Filter button*/}
                    <Button
                        onClick={handleToggle}
                        sx={{ color:'#6D7379',borderColor:'#BBC1C7'}}
                        variant="outlined"
                        className="
                            rounded-full 
                            normal-case
                            px-3 py-1 
                            border-gray-300
                            text-gray-600
                            hover:bg-gray-100
                            flex  gap-5
                            h-12
                            w-52
                            
                        "
                        disableRipple
                        >
                        <div className="flex items-center gap-1">
                            <TuneIcon fontSize="medium" sx={{ color:'##6D7379'}} />
                            <span className="text-[14px] text-gray-500 font-montserrat">Filter</span>
                        </div>
                        <div className="w-px h-12 bg-gray-300 mx-1"></div>
                        {isOpen ? <ChevronLeftIcon fontSize="medium"  sx={{ color:'##6D7379'}}/> : <ChevronRightIcon fontSize="medium"  sx={{ color:'##6D7379'}} />}
                    </Button>
                    <div
                    className={`
                    absolute top-20 left-0 h-[771px] w-60 bg-white z-20
                    transition-all duration-300 ease-in-out0
                    ${isOpen ? "-translate-x-10 opacity-100" : "-translate-x-full opacity-0"}
                    `}
                        >
                        {isOpen && (
                            <div className="pl-8 font-montserrat">
                                <h3 className="font-semibold mb-4">Available Date</h3>
                                <div className="mb-6 font-montserrat text-[14px] text-gray-600">
                                    <Checkbox /><span>Today</span>
                                    <br />
                                    <Checkbox /><span>Tomorrow</span>
                                </div>

                                <h3 className="font-semibold mb-4">Gender</h3>
                                <div className="space-y-2 mb-6">
                                    <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" className="rounded-full" defaultChecked />
                                    <span className="bg-blue-600 text-white px-3 py-1 rounded">Male</span>
                                    </label>
                                    <label className="flex items-center gap-2">
                                    <input type="radio" name="gender" className="rounded-full" />
                                    <span className="border px-3 py-1 rounded">Female</span>
                                    </label>
                                </div>

                                <h3 className="font-semibold mb-4">Consultation Type</h3>
                                <div className="space-y-2 mb-6 font-montserrat text-[14px] text-gray-600">
                                    <Checkbox /><span>in-Clinic</span>
                                    <br />
                                    <Checkbox /><span>Home visite</span>
                                </div>

                                <h3 className="font-semibold mb-4">Sort<ArrowDownIcon/></h3>
                                <div className="space-y-2 font-montserrat text-[14px] text-gray-600">
                                    <Checkbox  /><span>Most recommended</span><br />
                                    <Checkbox /><span>Price Low to high</span><br />
                                    <Checkbox /><span>Price High to low</span><br />
                                </div>
                            </div>
                        )}
                    </div>       
                </div>
                <Search>
                        <SearchIconWrapper>
                        <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                        placeholder="Search doctors . . ."
                        inputProps={{ 'aria-label': 'search' }}
                        />
                </Search>
                <div>
                    <Button sx={{ borderColor:'#BBC1C7', color:'#6D7379',borderRadius:3, width:150, height:52}} variant="outlined" startIcon={<RouteIcon />}>
                    Map
                    </Button>
                </div>
            </div>
            {/* transition div */}
            <div className={`
                    h-full  transition-transform duration-300
                    ${isOpen ? "translate-x-27 scale-x-88" : "translate-x-0"}`}>
                {/*Specialties*/}
                <div className="pl-15">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Choose Specialties</h2>
                    <div className="relative flex items-center">
                        <button
                        onClick={() => handleScroll("left")}
                        className="hidden md:flex absolute top-1 -left-4 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                        aria-label="Scroll left"
                        >
                        <ChevronRightIcon className="w-4 h-4 rotate-180" />
                        </button>

                        <div id="specialist-scroll" className="flex gap-3 overflow-x-auto scrollbar-hide pb-2  no-scrollbar">
                        {specialists.map((specialist) => (
                            <button
                            key={specialist.id}
                            onClick={() => setSelected(selected === specialist.id ? null : specialist.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                                transition-all duration-300 ease-out
                                border-2
                                transform hover:scale-105
                                ${
                                selected === specialist.id
                                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md"
                                    : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                                }
                            `}
                            >
                            <span className={`transition-transform duration-300 ${selected === specialist.id ? "scale-110" : ""}`}>
                                {specialist.icon}
                            </span>
                            <span className="text-sm font-medium">{specialist.name}</span>
                            </button>
                        ))}
                        </div>

                        {/* Right scroll button */}
                        <button
                        onClick={() => handleScroll("right")}
                        className="hidden md:flex absolute top-1 right-0 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                        aria-label="Scroll right"
                        >
                        <ChevronRightIcon className="w-4 h-4" />
                        </button>
                    </div>        
                </div>
                {/*Doctor details*/}
                <div className="pt-7 pb-1 pl-10">
                    <div className={`grid grid-cols-3 gap-6 p-5 mb-6 transition-all duration-300 ${
                                        isOpen ? 'grid-cols-3 ' : 'grid-cols-3' }transform transition-all duration-300 ease-in-out`}>
                             {/* {doctors.map((doctor) => ( */}
                             {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                <div className="  border border-gray-100 shadow-xl ">
                                    <DoctorCard key={i} doctor={{
                                                    id: 1,
                                                    image: "/doctor1.jpg",
                                                    name: "Dr. John Doe",
                                                    specialty: "Cardiologist",
                                                    hospital: "City Hospital",
                                                    rating: 4.5,
                                                    startTime: "09:00 AM",
                                                    endTime: "05:00 PM" ,}} />
                                        <div className="flex justify-between p-2">
                                            <div className="text-sm text-gray-600">
                                                            Price<span className="text-xs">/hour</span>
                                            </div>                                            
                                            <div className="font-montserrat text-lg ml-2 text-red-400">$3583</div>
                                        </div>
                                    <Button variant="contained" sx={{ width:'100%'}}>
                                        Book Appointment
                                    </Button>
                                </div>
                                ))}
                            {/*   ))}   */}
                    </div>
                </div>
                {/*Pagination*/}
                <div className="mb-10">
                    {/* <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    Previous page
                    </button>
                    <button className="px-6 py-2 border rounded-lg hover:bg-gray-50">
                    Next Page
                    </button> */}
                    {/* // Animated pagination  */}
                    <AnimatedPagination
                        currentPage={page}
                        //totalPages={totalPages}
                        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
                        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
                    />
                </div>
            </div>

        </div>
    </> 
    );
}
export default SearchDoctor;