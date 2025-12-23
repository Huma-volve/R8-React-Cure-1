import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkMesage } from "../Redux-Store/ChatSlice/ChatSlice";

export default function NavBarChat() {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState("All");

  const statuses = ["All", "Unread", "Favorite"];

  return (
    <div className="links">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => {
            setIsActive(status);
            dispatch(checkMesage(status));
          }}
          className={`p-2 m-1 px-3 rounded-[7px] cursor-pointer ${
            isActive === status ? "bg-blue-700 text-white" : "bg-[#f5f6f7]"
          }`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}
