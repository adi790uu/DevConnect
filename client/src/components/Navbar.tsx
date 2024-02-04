import { useState } from "react";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";

const Navbar = () => {
  const [auth, setAuth] = useState(true);

  return (
    <div className="navbar p-5 shadow-xl bg-base-100 w-full">
      <div className="flex-1">
        <a className="btn btn-ghost text-2xl font-extralight">DevConnect</a>
      </div>
      <div className="flex-none">
        {auth ? (
          <div className="">
            <LoginModal />
            <SignUpModal />
          </div>
        ) : (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost rounded-btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path fill="none" d="M0 0h24v24H0V0z" />
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
