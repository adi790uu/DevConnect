import { useEffect } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const success = localStorage.getItem("success");
  return (
    <div className="navbar p-5 shadow-xl bg-base-100 w-full">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-extralight">DevConnect</a>
      </div>
      <div className="flex-none">
        {!success ? (
          <div className="">
            <LoginModal />
            <SignUpModal />
          </div>
        ) : (
          <button
            className="btn glass my-4 bg-red-700 text-body text-slate-100 hover:bg-red-600"
            onClick={() => {
              localStorage.removeItem("success");
              localStorage.removeItem("token");
              // window.location.reload();
              navigate("/");
            }}
          >
            logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
