import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Task', TaskSchema);
