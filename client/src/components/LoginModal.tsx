const LoginModal = () => {
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn mr-5 border-stone-700 font-bold tracking-wide bg-transparent shadow-md outline-none"
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Login
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog" className=" flex flex-col tracking-wide">
            <p className="text-center text-2xl font-semibold font-sans my-4">
              Login
            </p>
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Enter username"
              className="p-3 rounded-lg w-full outline-none border-2  bg-slate-100 border-slate-700"
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="p-3 rounded-lg w-full outline-none border-2  bg-slate-100 border-slate-700"
            />
            <button className="btn glass my-4">Login</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default LoginModal;
