import { useState } from "react";
import { createPortal } from "react-dom";
import { UserHooks } from "../../hooks/userHoocks";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
const EditEmployeeModal = ({ empData, setShowEditModal }) => {
  const [emp, setEmp] = useState(empData);
  if (!empData) return null;

  const onChange = (e) => {
    setEmp({ ...empData, [e.target.name]: e.target.value });
  };

  const { useUpdateUser } = UserHooks();
  const { mutate, isPending } = useUpdateUser();

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      mutate(
        { data: emp },
        {
          onSuccess: (res) => {
            if (res.success) {
              toast.success("Update successfully!");
              setShowEditModal(false);
            } else {
              toast.error(res.message);
            }
          },
        }
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      {/* overlay click */}
      <div
        className="absolute inset-0"
        onClick={() => setShowEditModal(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
        {isPending && <Spinner />}
        <form onSubmit={handleSave} className="space-y-4">
          {/* name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              onChange={onChange}
              value={emp.fullName || ""}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          {/* email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={emp.email || ""}
              readOnly
              className="w-full border rounded px-3 py-2 bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          {/* phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={emp.phone || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          {/* salary */}
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={emp.salary || ""}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={() => setShowEditModal(false)}
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

        {/* close button */}
        <button
          onClick={() => setShowEditModal(false)}
          className="absolute text-2xl top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    </div>,
    document.body
  );
};

export default EditEmployeeModal;
