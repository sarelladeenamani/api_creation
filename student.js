import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
