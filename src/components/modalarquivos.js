const ModalArquivos = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="conteiner-modal">
        <button className="close" onClick={onClose}>
          X
        </button>
        <div className="content"> {children} </div>
      </div>
    </div>
  );
};

export default ModalArquivos;


