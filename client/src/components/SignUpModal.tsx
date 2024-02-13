import { useState } from "react";
import connector from "../connect";

const SignUpModal = () => {
  const [credentials, setcredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await connector.post("/user/createuser", credentials);
    console.log(response);

    if (response.data.alreadyExist) {
      alert("User already exists");
    }
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userid", response.data.userid);
    localStorage.setItem("username", response.data.username);

    if (response.data.success) {
      document.getElementById("my_modal_2").close();
    } else {
      alert("Something went wrong");
    }

    console.log(response.data);
  };

  const onchange = async (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn mr-5 border-stone-700 font-bold tracking-wide bg-transparent shadow-md outline-none"
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        SignUp
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
          <form
            method="dialog"
            className=" flex flex-col tracking-wide"
            onSubmit={handleSubmit}
          >
            <p className="text-center text-2xl font-semibold font-sans my-4">
              SignUp
            </p>
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Enter username"
              className="p-3 rounded-lg w-full outline-none border-2  bg-slate-100 border-slate-700"
              name="username"
              value={credentials.username}
              onChange={onchange}
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="p-3 rounded-lg w-full outline-none border-2  bg-slate-100 border-slate-700"
              name="password"
              value={credentials.password}
              onChange={onchange}
            />
            <button className="btn glass my-4 bg-red-700 text-body text-slate-100 hover:bg-red-600">
              SignUp
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default SignUpModal;
