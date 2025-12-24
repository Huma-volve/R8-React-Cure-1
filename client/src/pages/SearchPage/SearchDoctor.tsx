import { useState, useEffect,useMemo } from "react";
import Button from '@mui/material/Button';
import TuneIcon from "@mui/icons-material/Tune";
import SearchSkeleton from "@/skelatons/SearchSkeleton";
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
import { useNavigate  } from "react-router-dom";
import { getAllDoctors, getSpecialists } from "@/api/auth";
import useMediaQuery from "@mui/material/useMediaQuery";

const Search = styled('div')(({ theme }) => ({
    border: '1px solid #ccc',
    position: 'relative',
    borderRadius: 10,
    width:'100%',
    height:52,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    [theme.breakpoints.up('md')]: {
        width: '80%',
    },
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
  width:'100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

interface Specialty {
  id: string
  name: string
  icon: string
}

interface DoctorTimeSlot {
  date: string;
  start_time: string;
  end_time: string;
}
interface DoctorsD{

  id: number;
  image: string
  name: string
  specialty: string
  hospital_name: string
  rating: number
  times?: DoctorTimeSlot[];
  is_favorite: boolean,
  price:number  
}
type SortType = "ratingDesc" | "priceAsc" | "priceDesc" | null;
const getWorkingTimeRange = (times?: DoctorTimeSlot[]) => {
  if (!times || times.length === 0) return null;

  const sorted = [...times].sort((a, b) =>
    a.start_time.localeCompare(b.start_time)
  );

  return {
    start: sorted[0].start_time.slice(0, 5),
    end: sorted[sorted.length - 1].end_time.slice(0, 5),
  };
};

function SearchDoctor() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [animating, setAnimating] = useState(false);
    const [page, setPage] = useState(1);
    const [doctors, setDoctors] = useState<DoctorsD[]>([]);
    const [loading, setLoading] = useState(true);
    const isMobile = useMediaQuery("(max-width: 640px)");
    const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
    const [specialists, setSpecialists] = useState<Specialty[]>([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
    const [sortType, setSortType] = useState<SortType>(null);
    const [searchText, setSearchText] = useState("");
    useEffect(() => {
    const loadData = async () => {
      try {
        const [doctorsRes, specialtiesRes] = await Promise.all([
          getAllDoctors(),       // axios call
          getSpecialists(),   // axios call
        ]);
        const list = Array.isArray(doctorsRes?.data) ? doctorsRes.data : [];

        const mapped = list.map((doctor: DoctorsD) => {
          const range = getWorkingTimeRange(doctor.times);

          return {
            ...doctor,
            startTime: range?.start,
            endTime: range?.end,
          };
        });

        setDoctors(mapped);

        setSpecialists(
          specialtiesRes.data?.specialties ?? []
        );
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setLoading(false);
      }
  };

  loadData();
}, []);

 const filteredDoctors = useMemo(() => {
  let result = [...doctors];

  // 1️⃣ Filter by specialty
  if (selectedSpecialty) {
    result = result.filter(
      d => d.specialty === selectedSpecialty
    );
  }

  // 2️⃣ Live search (name + hospital)
    if (searchText.trim()) {
    const q = searchText.toLowerCase();

    result = result.filter(d =>
        (d.name ?? "").toLowerCase().includes(q) ||
        (d.hospital_name ?? "").toLowerCase().includes(q)||
        (d.specialty ?? "").toLowerCase().includes(q)
    );
    }

  // 3️⃣ Sort
  switch (sortType) {
    case "ratingDesc":
      result.sort((a, b) => b.rating - a.rating);
      break;

    case "priceAsc":
      result.sort((a, b) => a.price - b.price);
      break;

    case "priceDesc":
      result.sort((a, b) => b.price - a.price);
      break;
  }

  return result;
}, [doctors, selectedSpecialty, searchText, sortType]);

    const handleToggle = () => {
        setAnimating(true);
        setIsOpen(!isOpen);
        setTimeout(() => setAnimating(false), 300);
    };

    const handleScroll = (direction: "left" | "right") => {
        const scrollContainer = document.getElementById("specialist-scroll");
        if (scrollContainer) {
            const scrollAmount = direction === "left" ? -200 : 200;
            scrollContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    const ITEMS_PER_PAGE = isMobile ? 4 : isTablet ? 6 : 9;
    const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
    const startIndex = (page - 1) * ITEMS_PER_PAGE; 
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
    useEffect(() => {
     setPage(1);
    }, [searchText,selectedSpecialty, sortType]);
if (loading) return <SearchSkeleton/>;

    return (
    <> 
       <div className="flex-1 mt-30">    
            {/*Search & filter bar*/}      
            <div className="pt-3 px-4 md:pl-15 flex flex-col md:flex-row items-stretch md:items-center gap-3 md:space-x-5 mb-6">
                {/* Filter button - Hidden on mobile */}
                <div className="relative hidden md:block">
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
                            flex gap-5
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
                    
                    {/* Filter dropdown - Hidden on mobile */}
                    <div
                    className={`
                    absolute top-20 left-0 h-192.75 w-60 bg-white z-20
                    transition-all duration-300 ease-in-out
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
                                    <Checkbox checked={sortType === "ratingDesc"} 
                                     onChange={() =>setSortType(sortType === "ratingDesc" ? null : "ratingDesc")}
                                    /><span>Most recommended</span><br />

                                    <Checkbox  checked={sortType === "priceAsc"} 
                                     onChange={() =>setSortType(sortType === "priceAsc" ? null : "priceAsc")}
                                     /><span>Price Low to high</span><br />

                                    <Checkbox checked={sortType === "priceDesc"} 
                                     onChange={() =>setSortType(sortType === "priceDesc" ? null : "priceDesc")}
                                     /><span>Price High to low</span><br />
                                </div>
                            </div>
                        )}
                    </div>       
                </div>
                
                {/* Search bar - Full width on mobile */}
                <div className="flex-1 w-full md:w-auto">
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Search doctors or Hosbital . . ."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </div>
                
                {/* Map button */}
                <div className="w-full md:w-auto">
                    <Button 
                        sx={{ 
                            borderColor:'#BBC1C7', 
                            color:'#6D7379',
                            borderRadius:3, 
                            width: { xs: '100%', md: 150 }, 
                            height:52
                        }} 
                        variant="outlined" 
                        startIcon={<RouteIcon />}
                    >
                        Map
                    </Button>
                </div>
            </div>
            
            {/* Main content area with transition */}
            <div className={`
                h-full transition-transform duration-300
                ${isOpen ? "md:translate-x-27 md:scale-x-88" : "translate-x-0"}
            `}>
                {/*Specialties*/}
                <div className="px-4 md:pl-15">
                    <h2 className="text-xl font-semibold mb-4 text-gray-900">Choose Specialties</h2>
                    <div className="relative flex items-center">
                        <button
                            onClick={() => handleScroll("left")}
                            className="hidden md:flex absolute top-1 -left-4 z-10 w-8 h-8 items-center justify-center rounded-full bg-white border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                            aria-label="Scroll left"
                        >
                            <ChevronRightIcon className="w-4 h-4 rotate-180" />
                        </button>

                        <div id="specialist-scroll" className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 no-scrollbar">
                            {specialists.map((specialist) => (
                                <button
                                    key={specialist.id}
                                    onClick={() =>  setSelectedSpecialty(selectedSpecialty === specialist.name ? null : specialist.name)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap
                                        transition-all duration-300 ease-out
                                        border-2
                                        transform hover:scale-105
                                        ${
                                        selectedSpecialty === specialist.name
                                            ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md"
                                            : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                                        }
                                    `}
                                >
                                    <span className={`transition-transform duration-300 ${selectedSpecialty === specialist.name ? "scale-110" : ""}`}>
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
                
                {/*Doctor cards - Responsive grid*/}
                <div className="pt-7 pb-1 px-4 md:pl-10">
                    <div className={`
                        grid 
                        grid-cols-1 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                        gap-4 
                        md:gap-6 
                        p-2 
                        md:p-5 
                        mb-6 
                        transition-all 
                        duration-300 
                        items-end
                        ${animating ? 'opacity-100 ease-in-out' : 'opacity-100'}
                        transform transition-all duration-300 ease-in-out
                    `}>
                              {filteredDoctors.length === 0 ? (
                                  <p className="text-gray-500 col-span-full text-center">No doctors found for the selected specialty.</p>
                                ) : (
                                     paginatedDoctors.map((doctor) => (
                                  <div key={doctor.id} className=" cursor-pointer border border-gray-100 shadow-xl rounded-lg overflow-hidden">
                                    <DoctorCard doctor={doctor}/>
                                    <div  onClick={() => navigate(`/doctors/${doctor.id}`)} className="flex justify-between p-2">
                                      <div className="text-sm text-gray-600">
                                          Price<span className="text-xs">/hour</span>
                                      </div>                                            
                                      <div className="font-montserrat text-lg ml-2 text-red-400">{doctor.price}</div>
                                    </div>
                                    <Button   onClick={() => navigate(`/doctors/${doctor.id}`)}
                                    variant="contained" 
                                    sx={{ 
                                        width:'100%',
                                        borderRadius: 0,
                                    }}
                                    >
                                        Book Appointment
                                    </Button>
                                  </div>
                                )))}
                    </div>
                </div>
                
                {/*Pagination*/}
                <div className="mb-10 w-screen">
                    <AnimatedPagination
                        currentPage={page}
                        totalpages={totalPages}
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