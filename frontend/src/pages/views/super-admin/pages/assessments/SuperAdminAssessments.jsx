import React, { useState } from 'react';
import { Search, Plus, Clock, CheckCircle, XCircle } from 'lucide-react';

const superAdminAssessments = [
  {
    title: 'Final JavaScript Exam',
    instructor: 'Sarah Wilson',
    subject: 'JavaScript',
    dueDate: '2024-03-25',
    status: 'Active',
    submissions: 45,
    totalStudents: 50,
    type: 'MCQ',
  },
  {
    title: 'React Fundamentals Quiz',
    instructor: 'John Doe',
    subject: 'React',
    dueDate: '2024-03-20',
    status: 'Ended',
    submissions: 48,
    totalStudents: 48,
    type: 'MCQ',
  },
  {
    title: 'TypeScript Basics Test',
    instructor: 'Michael Brown',
    subject: 'TypeScript',
    dueDate: '2024-03-28',
    status: 'Active',
    submissions: 0,
    totalStudents: 45,
    type: 'Coding',
  },
  {
    title: 'Node.js Advanced Assessment',
    instructor: 'Anna Taylor',
    subject: 'Node.js',
    dueDate: '2024-04-05',
    status: 'Active',
    submissions: 30,
    totalStudents: 40,
    type: 'Coding',
  },
  {
    title: 'HTML & CSS Quiz',
    instructor: 'Chris Anderson',
    subject: 'Web Development',
    dueDate: '2024-03-22',
    status: 'Ended',
    submissions: 50,
    totalStudents: 50,
    type: 'MCQ',
  },
  {
    title: 'Python Basics Test',
    instructor: 'Emily Carter',
    subject: 'Python',
    dueDate: '2024-03-30',
    status: 'Active',
    submissions: 5,
    totalStudents: 25,
    type: 'Coding',
  },
  {
    title: 'AI Concepts Quiz',
    instructor: 'James Brown',
    subject: 'Artificial Intelligence',
    dueDate: '2024-04-01',
    status: 'Active',
    submissions: 20,
    totalStudents: 50,
    type: 'MCQ',
  },
  {
    title: 'Database Systems Exam',
    instructor: 'Linda Martin',
    subject: 'Databases',
    dueDate: '2024-03-18',
    status: 'Ended',
    submissions: 35,
    totalStudents: 40,
    type: 'MCQ',
  },
  {
    title: 'Machine Learning Test',
    instructor: 'Oliver Smith',
    subject: 'Machine Learning',
    dueDate: '2024-04-10',
    status: 'Active',
    submissions: 25,
    totalStudents: 50,
    type: 'Coding',
  },
  {
    title: 'Cybersecurity Quiz',
    instructor: 'Sophia Wilson',
    subject: 'Cybersecurity',
    dueDate: '2024-03-26',
    status: 'Ended',
    submissions: 30,
    totalStudents: 30,
    type: 'MCQ',
  },
];


const SuperAdminAssessmentsInfo = () => {
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter superAdminAssessments based on the selected type, status, and search query
  const filteredAssessments = superAdminAssessments.filter((assessment) => {
    const matchesType =
      selectedType === "All Types" || assessment.type === selectedType;
    const matchesStatus =
      selectedStatus === "All Status" || assessment.status === selectedStatus;
    const matchesSearch =
      searchQuery === "" ||
      assessment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assessment.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-white">Assessments</h1>
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-palatte-primary2 rounded-lg shadow-md">
        <div className="flex gap-4 items-center">
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search superAdminAssessments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2 bg-palatte-extraLight border rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 text-palatte-dark"
            />
          </div>
          <select
            className="w-1/4 px-4 py-2 bg-palatte-secondary text-palatte-extraLight border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 cursor-pointer"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option>All Types</option>
            <option>MCQ</option>
            <option>Coding</option>
          </select>
          <select
            className="w-1/4 px-4 py-2 bg-palatte-secondary text-palatte-extraLight border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-palatte-primary4 cursor-pointer"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Ended</option>
          </select>
        </div>
      </div>

      {/* InstructorAssessments List */}
      <div className="overflow-y-auto max-h-[60vh] stylish-scrollbar bg-palatte-primary2 p-4 flex flex-col gap-4 rounded-lg shadow-md">
        {filteredAssessments.length > 0 ? (
          filteredAssessments.map((assessment, index) => (
            <div
              key={index}
              className="p-4 bg-palatte-primary3 text-palatte-extraLight rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{assessment.title}</h3>
                  <p className="text-sm text-palatte-medium">
                    Instructor: {assessment.instructor}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    assessment.status === "Active"
                      ? "bg-green-500 bg-opacity-20 text-green-400"
                      : "bg-yellow-500 bg-opacity-20 text-yellow-400"
                  }`}
                >
                  {assessment.status}
                </span>
              </div>

              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 text-gray-400 mr-2" />
                  Due: {assessment.dueDate}
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                  {assessment.submissions} submissions
                </div>
                <div className="flex items-center">
                  <XCircle className="w-4 h-4 text-red-400 mr-2" />
                  {assessment.totalStudents - assessment.submissions} pending
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-palatte-medium h-2 rounded-full"
                    style={{
                      width: `${
                        (assessment.submissions / assessment.totalStudents) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-sm text-palatte-medium mt-1">
                  {Math.round(
                    (assessment.submissions / assessment.totalStudents) * 100
                  )}
                  % completion rate
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-palatte-error  ">
            No matching results found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminAssessmentsInfo;
