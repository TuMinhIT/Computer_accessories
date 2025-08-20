// import { createPortal } from "react-dom";

// const AddEmployeeModal = ({ setShowAddModal }) => {
//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div
//         className="absolute inset-0"
//         onClick={() => setShowAddModal(false)}
//       />
//       <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
//         <h2 className="text-lg font-bold mb-4">Add new Employee</h2>
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//           }}
//           className="space-y-4"
//         >
//           {/* name */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               name="username"
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//               required
//             />
//           </div>
//           {/* mail */}
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               name="email"
//               placeholder="abc@gmail.com"
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Phone</label>
//             <input
//               type="number"
//               name="phone"
//               placeholder="+84"
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Salary</label>
//             <input
//               type="number"
//               name="salary"
//               placeholder="&"
//               className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
//               required
//             />
//           </div>
//           <div className="flex justify-end gap-2 mt-6">
//             <button
//               type="button"
//               onClick={() => setShowAddModal(false)}
//               className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
//             >
//               Save
//             </button>
//           </div>
//         </form>
//         <button
//           onClick={() => setShowAddModal(false)}
//           className="absolute text-2xl top-2 right-2 text-gray-400 hover:text-gray-600"
//         >
//           ×
//         </button>
//       </div>
//     </div>,
//     document.body
//   );
// };

// export default AddEmployeeModal;

import { toast } from "react-toastify";

import { createPortal } from "react-dom";
import { useState } from "react";
import axios from "axios";

const AddEmployeeModal = ({ setShowAddModal, onEmployeeAdded }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/employees", form);
      if (res.data.success) {
        toast.success("Employee added & activation email sent!");
        onEmployeeAdded();
        setShowAddModal(false);
      }
    } catch (err) {
      toast.error("❌ Error adding employee");
    }
  };


  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="absolute inset-0" onClick={() => setShowAddModal(false)} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Add new Employee</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="abc@gmail.com"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+84"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={form.salary}
              onChange={handleChange}
              placeholder="&"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 rounded bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
        <button
          onClick={() => setShowAddModal(false)}
          className="absolute text-2xl top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

export default AddEmployeeModal;
