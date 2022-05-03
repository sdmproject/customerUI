const Loading = ({ modalRef }) => {
  return (
    <div id="myModal" className="modal" ref={modalRef}>
      <div className="modal-content">
        <div className="loading" />
      </div>
    </div>
  );
};

export default Loading;
