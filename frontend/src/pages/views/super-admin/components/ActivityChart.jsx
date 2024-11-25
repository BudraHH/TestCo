import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', users: 400, superAdminAssessments: 240 },
  { name: 'Tue', users: 300, superAdminAssessments: 139 },
  { name: 'Wed', users: 520, superAdminAssessments: 380 },
  { name: 'Thu', users: 400, superAdminAssessments: 300 },
  { name: 'Fri', users: 550, superAdminAssessments: 450 },
  { name: 'Sat', users: 600, superAdminAssessments: 520 },
  { name: 'Sun', users: 450, superAdminAssessments: 400 },
];

const ActivityChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Activity Overview</h2>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#4F46E5" strokeWidth={2} />
            <Line type="monotone" dataKey="superAdminAssessments" stroke="#10B981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivityChart;