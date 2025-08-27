import "../css/TrailerModal.css";

function TrailerModal({ videoKey, onClose }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="trailer-modal-backdrop" onClick={handleBackdropClick}>
      <div className="trailer-modal-content">
        <button className="close-modal-btn" onClick={onClose}>×</button>
        <div className="video-responsive">
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;