const mongoose = require('mongoose');
const studentModel = require('../../models/studentModel');
const userModel = require('../../models/userModel');
const bcrypt = require('bcrypt');

async function addNewStudent(req, res) {
  try {
    let {
      username,
      email,
      password,
      studentId,
      department,
      qualification,
      yearOfStudy,
      instructorId,
      assessments,
      createdBy,
      role,
    } = req.body;

    // Validate required fields
    if (!username || !email || !password || !studentId || !yearOfStudy || !role) {
      return res.status(400).json({
        message: "Missing required fields",
        success: false,
      });
    }

    // Validate role
    if (role !== "student") {
      return res.status(400).json({
        message: `Invalid role: ${role}. This endpoint only supports creating students.`,
        success: false,
      });
    }

    // Validate yearOfStudy (1 to 5)
    if (yearOfStudy < 1 || yearOfStudy > 5) {
      return res.status(400).json({
        message: "Invalid year of study. It must be between 1 and 5.",
        success: false,
      });
    }

    // Check for duplicate student (by email or studentId)
    const existingStudent = await userModel.findOne({
      $or: [{ email }, { studentId }],
    });
    if (existingStudent) {
      return res.status(409).json({
        message: "Student already exists with this email or studentId!",
        success: false,
      });
    }

    // Convert `instructorId` to an array of ObjectIds
    if (instructorId) {
      instructorId = instructorId.map((id) => mongoose.Types.ObjectId(id));
    }

    // Convert `createdBy` to ObjectId
    if (createdBy) {
      createdBy = mongoose.Types.ObjectId(createdBy);
    }

    // Hash the password
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the new student document
    const newStudent = new studentModel({
      username,
      email,
      password: hashedPassword,
      studentId,
      role,
      department: department || null,
      qualification: qualification || "Bachelor",
      yearOfStudy,
      instructorId: instructorId || [],
      assessments: assessments || [],
      createdBy: createdBy || null,
    });

    // Save the student
    const savedStudent = await newStudent.save();

    res.status(201).json({
      message: "Student created successfully",
      success: true,
      student: savedStudent,
    });
  } catch (err) {
    console.error("Error saving student:", err);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: err.message,
    });
  }
}

module.exports = addNewStudent;
