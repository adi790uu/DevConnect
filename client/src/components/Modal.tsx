const Modal = ({ name }) => {
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
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
