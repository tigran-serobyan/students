const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Student = mongoose.model('Student', new Schema({
    name: {
        type: String,
        require: [true, 'Name is required']
    },
    surname: {
        type: String,
        require: [true, 'Surname is required']
    },
    username: {
        type: String,
        require: [true, 'Ssername is required']
    },
    password: {
        type: String,
        require: [true, 'Password is required']
    },
    email: {
        type: String,
        require: [true, 'Email is required']
    }
}));

exports.getStudents = () => {
    return Student.find();
}

exports.getStudent = (username) => {
    return Student.findOne({ username: username });
}

exports.addStudent = (obj) => {
    const student = new Student(obj);
    return student.save();
}

exports.editStudent = (obj) => {
    return Student.updateOne({ username: obj.username }, {
        $set: obj
    });
}

exports.deleteStudent = (username) => {
    return Student.deleteOne({ username: username });
}