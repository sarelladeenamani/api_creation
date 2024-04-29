import express from 'express';
import bodyParser from 'body-parser';
import connecTodb from './ConnectTodb.js';
import Student from './student.js'; 

const app = express();

app.use(bodyParser.json());

// Route to handle POST request to add data to the database
app.post('/students', async (req, res) => {
    try {
        // Validate that req.body is an array
        if (!Array.isArray(req.body)) {
            return res.status(400).send("Invalid data format. Expected an array of student details.");
        }

        // Assuming req.body contains an array of student details
        const studentDetails = req.body;

        // Loop through the studentDetails array and save each student to the database
        for (const detail of studentDetails) {
            const newStudent = new Student({
                id: detail.id,
                name: detail.name
            });
            await newStudent.save();
        }
        res.status(201).send("Data added successfully");
    } catch (error) {
        console.error("Error adding data to the database:", error);
        res.status(500).send("Internal server error");
    }
});

// Route to fetch all students from the database
app.get('/students', async (req, res) => {
    try {
        // Fetch all students from the database
        const allStudents = await Student.find();
        res.status(200).json(allStudents);
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        res.status(500).send("Internal server error");
    }
});

// Route to handle PUT request to edit data in the database
app.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        // Find the student by ID and update the name
        const updatedStudent = await Student.findByIdAndUpdate(id, { name }, { new: true });

        if (!updatedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).json(updatedStudent);
    } catch (error) {
        console.error("Error updating student data:", error);
        res.status(500).send("Internal server error");
    }
});

// Route to handle DELETE request to delete data from the database
app.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Find the student by ID and delete it
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).send("Student not found");
        }

        res.status(200).send("Student deleted successfully");
    } catch (error) {
        console.error("Error deleting student data:", error);
        res.status(500).send("Internal server error");
    }
});

app.listen(8080, () => {
    connecTodb();
    console.log("Server started");
});
