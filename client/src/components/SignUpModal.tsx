const SignUpModal = () => {
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
          <form method="dialog" className=" flex flex-col tracking-wide">
            <p className="text-center text-2xl font-semibold font-sans my-4">
              SignUp
            </p>
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Enter username"
              className="input input-bordered w-full outline-none border-2"
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="password"
              placeholder="Enter password"
              className="input input-bordered w-full outline-none border-2"
            />
            <button className="btn glass my-4">SignUp</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default SignUpModal;
