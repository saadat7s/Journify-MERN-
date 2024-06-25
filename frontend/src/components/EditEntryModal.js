import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import './EditEntryModal.css'

const EditEntryModal = ({emailID, id, title: initialTitle, description: initialContent, showModal, handleClose }) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialContent);
  }, [initialTitle, initialContent]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:12345/edit-entry/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, emailID }),
      });

      const data = await response.json();

      if (response.ok) {
        // Entry successfully updated
        console.log('Entry updated successfully:', data);

        // Show a success notification
        toast.success('Changes have been saved successfully');
        handleClose();
      } else {
        console.error('Error updating entry:', data.error);
        // Handle the error as needed
      }
    } catch (error) {
      console.error('Update error:', error.message);
      // Handle the error as needed
    }
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="edit-entry-modal-title"
      aria-describedby="edit-entry-modal-description"
    >
      <div className="modal-content">
        <h2 id="edit-entry-modal-title">Edit Entry</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              className="form-control"
              id="content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default EditEntryModal;
