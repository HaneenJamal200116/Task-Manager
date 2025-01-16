import express from 'express';
import Task from '../models/Task.js';
import authenticateJWT from '../middleware/authenticate.js';

const router=express.Router();

// Get all tasks
router.get('/all', authenticateJWT, async (req, res) => {
    try {
      const tasks = await Task.find({ user: req.user.id }); // Fetch tasks for logged-in user
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch tasks', error });
    }
  });
  

// Create task
router.post('/add',authenticateJWT,async(req,res)=>{
    const {title,description}=req.body;
    try{
        const newTask=new Task({
            user:req.user.id,
            title,
            description
        });
        await newTask.save();
        res.status(201).json(newTask);
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

router.put('/update/:id', authenticateJWT, async (req, res) => {
    const { title, description, status } = req.body; // Get data from the body
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status }, // Update with the new values
            { new: true } // Return the updated task
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(updatedTask); // Send the updated task as the response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/delete/:id', authenticateJWT, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted.' });
    } catch (error) {
        res.status(500).json({ error: 'Server error.' });
    }
});

router.put('/update-status/:id', authenticateJWT, async (req, res) => {
    const { status } = req.body; // Only status is needed
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status }, // Update the status field
            { new: true }
        );
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;