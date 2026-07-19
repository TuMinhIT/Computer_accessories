import { toast } from "react-toastify";

import { createPortal } from "react-dom";
import { useState } from "react";
import Spinner from "../Spinner";
import { UserHooks } from "../../hooks/userHoocks";
const AddEmployeeModal = ({ setShowAddModal }) => {
  const { useCreateUser } = UserHooks();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    salary: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const { mutate, isPending } = useCreateUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutate(
      { data: form },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Add success & sent email!");
            setShowAddModal(false);
          } else {
            toast.error(res.message);
          }
        },
      }
    );
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="absolute inset-0"
        onClick={() => setShowAddModal(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Add new Employee</h2>
        {isPending && <Spinner />}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
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
              maxLength={10}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="number"
              maxLength={10}
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
