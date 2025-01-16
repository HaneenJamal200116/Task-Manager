import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Modal from './Modal';

const Display = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null); // Track selected task

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/tasks/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data.tasks);
        } else {
          setError(data.message || 'Failed to fetch tasks.');
        }
      } catch (error) {
        setError('An error occurred while fetching tasks.');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/tasks/delete/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
        console.log('Task deleted successfully.');
      } else {
        console.error('Failed to delete task.');
      }
    } catch (error) {
      console.error('Error during task deletion:', error);
    }
  };
  const handleStatusChange = async (taskId, newStatus) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/tasks/update-status/${taskId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus }) // newStatus is now boolean
      });
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updatedTask._id ? updatedTask : task
          )
        );
      } else {
        console.error('Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };
  
  const handleUpdate = async (updatedTask) => {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:5000/tasks/update/${updatedTask._id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedTask), // Send the updated task details
        });

        if (response.ok) {
            const task = await response.json();
            // Update the task in the frontend state
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task._id === updatedTask._id ? { ...task, ...updatedTask } : task
                )
            );
            console.log('Task updated successfully.');
        } else {
            console.error('Failed to update task.');
        }
    } catch (error) {
        console.error('Error during task update:', error);
    }
  };

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-md max-h-[600px] w-[1000px] overflow-y-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li key={task._id} className="p-4 border border-gray-300 rounded shadow-sm w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <Checkbox 
                  checked={task.status} 
                  onChange={(e) => handleStatusChange(task._id, e.target.checked)}
                  ripple={false}
                  className="h-5 w-5 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
                />
                <h2 className={`text-lg font-semibold ml-2 ${task.status ? 'line-through' : ''}`}>
                  {task.title}
                </h2>

                  
                </div>
                <div className="flex gap-2">
                  {/* Pass the task to the modal and set the modal state */}
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => setSelectedTask(task)} // Set the task to update
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(task._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 mt-2">{task.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tasks available. Add some tasks to get started!</p>
      )}

      {/* Modal */}
      {selectedTask && (
        <Modal
          task={selectedTask}
          open={Boolean(selectedTask)} // Modal is open when selectedTask is set
          onClose={() => setSelectedTask(null)} // Close the modal by resetting selectedTask
          onSave={handleUpdate} // Save updated task
        />
      )}
    </div>
  );
};

export default Display;
