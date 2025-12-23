import { Skeleton} from "@mui/material";

const SearchSkeleton: React.FC = () => {
  return (
    <div className="flex-1 pt-50 px-4 md:px-10">
      
      {/* Search & Filter bar skeleton */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:space-x-5 mb-6">
        <Skeleton variant="rectangular" className="hidden md:block w-52 h-12 rounded-full" />
        <Skeleton variant="rectangular" className="flex-1 w-full h-12 rounded-full" />
        <Skeleton variant="rectangular" className="w-full md:w-36 h-12 rounded-full" />
      </div>

      {/* Specialties scroll skeleton */}
      <div className="mb-6">
        <Skeleton variant="text" className="w-40 h-6 mb-4" /> {/* Header */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              variant="rectangular"
              className="w-24 h-10 rounded-full shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Doctors cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-2 md:p-5">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div
            key={idx}
            className="border border-gray-100 shadow-xl rounded-lg overflow-hidden"
          >
            <Skeleton variant="rectangular" className="w-full h-40" /> {/* Doctor image */}
            <div className="p-2">
              <Skeleton variant="text" className="w-32 h-5 mb-1" /> {/* Name */}
              <Skeleton variant="text" className="w-20 h-4 mb-2" /> {/* Specialty */}
              <Skeleton variant="rectangular" className="w-20 h-6 mb-2" /> {/* Price */}
              <Skeleton variant="rectangular" className="w-full h-10 rounded" /> {/* Book button */}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <Skeleton key={idx} variant="rectangular" className="w-10 h-10 rounded" />
        ))}
      </div>
    </div>
  );
};

export default SearchSkeleton;
