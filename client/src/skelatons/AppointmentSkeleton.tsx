import { Skeleton } from "@mui/material";
const AppointmentSkeleton: React.FC = () => {


  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col lg:flex-row gap-6 md:gap-10 lg:gap-28">
      
      {/* Left column - reviews skeleton */}
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-11 lg:w-1/2">
        <Skeleton variant="rectangular" className="h-12 w-full rounded-md" /> {/* DateTimePicker */}
        <div className="flex justify-between items-center">
          <Skeleton variant="text" className="w-32 h-6" /> {/* Review header */}
          <Skeleton variant="rectangular" className="w-24 h-8 rounded-md" /> {/* Add review button */}
        </div>

        <div className="flex items-center justify-between">
          <Skeleton variant="text" className="w-16 h-10" /> {/* Rating number */}
          <Skeleton variant="rectangular" className="w-32 h-16 rounded-md" /> {/* Rating stars + count */}
        </div>

        {/* Review cards skeleton grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="w-full border border-gray-300 rounded-lg p-3">
              <div className="flex gap-3 md:gap-4">
                <Skeleton variant="circular" className="w-12 h-12 md:w-15 md:h-15" />
                <div className="flex-1 flex flex-col gap-2">
                  <Skeleton variant="text" className="w-24 h-4" />
                  <Skeleton variant="text" className="w-16 h-3" />
                </div>
              </div>
              <Skeleton variant="text" className="mt-2 w-full h-10" />
            </div>
          ))}
        </div>
      </div>

      {/* Right column - doctor info skeleton */}
      <div className="flex flex-col gap-6 md:gap-8 lg:gap-10 w-full lg:w-1/2 p-5 md:p-7 lg:pl-16 lg:pr-16 bg-gray-200 rounded-2xl lg:rounded-3xl">
        
        {/* Header with favorite and avatar */}
        <div className="flex justify-between items-start p-2">
          <Skeleton variant="circular" className="w-10 h-10 md:w-12 md:h-12" /> {/* Favorite button */}
          <div className="flex flex-col items-center gap-2">
            <Skeleton variant="circular" className="w-24 h-24 md:w-32 md:h-28" /> {/* Avatar */}
            <Skeleton variant="text" className="w-32 h-5" /> {/* Name */}
            <Skeleton variant="text" className="w-24 h-4" /> {/* Specialty */}
          </div>
          <Skeleton variant="circular" className="w-10 h-10 md:w-12 md:h-12" /> {/* Chat button */}
        </div>

        {/* Stats grid skeleton */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              <Skeleton variant="rectangular" className="w-10 h-10 md:w-auto md:h-auto" />
              <Skeleton variant="text" className="w-12 h-4" />
              <Skeleton variant="text" className="w-16 h-3" />
            </div>
          ))}
        </div>

        {/* About section skeleton */}
        <div className="flex flex-col gap-3">
          <Skeleton variant="text" className="w-32 h-6" /> {/* About header */}
          <Skeleton variant="text" className="w-full h-16" /> {/* Bio text */}
          <Skeleton variant="text" className="w-24 h-4 mt-2" /> {/* Read more button */}
        </div>

        {/* Location section skeleton */}
        <Skeleton variant="text" className="w-32 h-6" />
        <Skeleton variant="rectangular" className="w-full h-24 mt-2 rounded-md" />
      </div>
    </div>
  );
};

export default AppointmentSkeleton;
