import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function ErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-red-300 rounded-2xl p-6 w-full max-w-md flex flex-col items-center gap-4 shadow-lg">
        
        <ReportProblemIcon sx={{ fontSize: 60 }} className="text-red-500" />
        
        <h2 className="text-xl font-semibold text-gray-800">
          Oops! Something went wrong
        </h2>

        <p className="text-gray-500 text-center text-sm">
          An unexpected error occurred. Please try again.
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-6 py-2 bg-red-400 text-white rounded-xl cursor-pointer  hover:bg-red-500 transition"
        >
          Reload Page
        </button>

      </div>
    </div>
  );
}

