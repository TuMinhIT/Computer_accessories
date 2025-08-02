const Employees = () => {
  const employees = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Manager",
      department: "Sales",
      email: "alice@company.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Developer",
      department: "IT",
      email: "bob@company.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Carol Davis",
      role: "Designer",
      department: "Marketing",
      email: "carol@company.com",
      status: "Active",
    },
  ];
  return (
    <div className="h-screen">
      {/* Employees Tab */}

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Employee Management
          </h3>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            + Add Employee
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {employee.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {employee.role}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {employee.department}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {employee.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button className="text-blue-600 hover:text-blue-800">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employees;
