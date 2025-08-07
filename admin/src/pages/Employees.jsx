import { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import EmployeeRow from "../component/employees/EmployeeRow";
import AddEmployeeModal from "../component/employees/AddEmployeeModal";

import Search from "../component/Search";

const mockEmployees = [
  {
    id: 1,
    avatar: assets.user_img,
    username: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0987654321",
    active: false,
    createAt: "2024-01-15",
    locked: false,
    salary: 5400,
  },
  {
    id: 2,
    avatar: assets.user_img,
    username: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0987654321",
    active: true,
    createAt: "2024-01-15",
    locked: false,
    salary: 5400,
  },
  {
    id: 4,
    avatar: assets.user_img,
    username: "John Doe",
    email: "johndoe@gmail.com",
    phone: "0987654321",
    active: true,
    createAt: "2024-01-15",
    locked: false,
    salary: 5400,
  },
  {
    id: 5,
    avatar: assets.user_img,
    username: "John Dodde",
    email: "johndoe@gmail.com",
    phone: "0987654321",
    active: false,
    createAt: "2024-01-15",
    locked: true,
    salary: 54200,
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    setEmployees(mockEmployees);
  }, []);

  return (
    <>
      {showAddModal && <AddEmployeeModal setShowAddModal={setShowAddModal} />}

      <div className="bg-white rounded-xl shadow-sm border ">
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Employees</h3>

          <Search />

          <button
            onClick={() => {
              setShowAddModal(true);
            }}
            className="bg-gray-100 text-black px-4 py-2 border border-gray-500 rounded-lg hover:bg-gray-200 transition-colors"
          >
            + New
          </button>
        </div>
        <div className="overflow-x-auto h-screen">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className=" flex items-center px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name & Email
                  <svg
                    className="rotate-90 hover:bg-amber-100"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="20px"
                    fill="#264E5B"
                  >
                    <path d="M400-200 120-480l280-280v560Zm-60-145v-270L205-480l135 135Zm220 145v-560l280 280-280 280Z" />
                  </svg>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Salary
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Create At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {employees.map((emp) => (
                <EmployeeRow key={emp.id} emp={emp} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employees;
