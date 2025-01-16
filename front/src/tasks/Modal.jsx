import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const Modal = ({ task, open, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Set initial values when the modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  const handleSave = async () => {
    // Construct the updated task object
    const updatedTask = { ...task, title, description };

    // Call the onSave function passed from the parent (Display)
    onSave(updatedTask);

    // Close the modal
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Task Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
