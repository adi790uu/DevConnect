const Modal = ({ name }: { name: String }) => {
  return (
    <>
      <button
        className="btn mr-5 border-stone-700 font-bold tracking-wide bg-transparent shadow-md outline-none"
        //@ts-ignore
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        {name}
      </button>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <form method="dialog" className=" flex flex-col">
            <div className="label">
              <span className="label-text">Username</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full  my-2 outline-none border-none"
            />
            <div className="label">
              <span className="label-text">Password</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full  my-2 outline-none border-none"
            />
            <button className="btn my-2">Close</button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
