import React, { useState } from 'react';
import EditEntryModal from './EditEntryModal';

const JournalCard = ({emailID, id, title, description, onDelete }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to truncate the content to a specified number of words
  // const truncateContent = (text, numWords) => {
  //   const words = text.split(' ');
  //   if (words.length > numWords) {
  //     return words.slice(0, numWords).join(' ') + '...';
  //   }
  //   return text;
  // };

  // Show only the first 20 words of the content
  // const truncatedContent = truncateContent(description, 20);

  return (
    <>
      <div className="card">
        <div className="card-body p-0">
          <h3 className="card-title">{title}</h3>
          <p className="card-content">{description}</p>
          <div className="card-buttons mt-2 d-flex gap-2">
            <button className="btn btn-primary d-flex align-items-center" onClick={handleOpenModal}>
              <i className="fas fa-edit"></i> Update
            </button>
            <button className="btn btn-danger d-flex align-items-center" onClick={(e) => onDelete(id)}>
              <i className="fas fa-trash-alt"></i> Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <EditEntryModal emailID={emailID} id={id} title={title} description={description} showModal={showModal} handleClose={handleCloseModal} />
    </>
  );
};

export default JournalCard;
