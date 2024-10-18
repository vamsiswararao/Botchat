import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const PopupBoxComponent = ({ responseStatus }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Watch for changes to responseStatus and open modal if status is 0
  useEffect(() => {
    if (responseStatus?.resp?.error_code === "0") {
      setModalIsOpen(true);
    }
  }, [responseStatus]);

  const customStyles = {
    content: {
      display: 'flex', // Enable flexbox
      justifyContent: 'center', // Horizontally center
      alignItems: 'center', // Vertically center
      top: '50%',
      left: '50%',
      right: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '60%', // Adjust width to your preference
      height: '60%', // Adjust height to your preference
      backgroundColor: '#fff',
      padding: '20px',
      borderRadius: '8px',
      zIndex: 1001, // Add z-index for modal content (optional)
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dim the background
      zIndex: 1000, // Add z-index to the overlay
    },
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        contentLabel="Error Modal"
        style={customStyles}
      >
        {/* <p style={{ textAlign: 'center', fontSize: '18px' }}>
          Data already submitted  */}
          {/* There was an issue with your request. Please try again later. */}
        {/* </p> */}
                <p style={{ textAlign: 'center', fontSize: '18px' }}>
          {responseStatus.resp.message}
        </p>
      </Modal>
    </div>
  );
};

export default PopupBoxComponent;
