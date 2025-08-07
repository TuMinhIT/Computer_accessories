import { createPortal } from "react-dom";

const EditEmployeeModal = ({
  empData,
  setEmpData,
  onSave,
  setShowEditModal,
}) => {
  const onChange = (e) => {
    setEmpData({ ...empData, [e.target.name]: e.target.value });
  };
  if (!empData) return null;
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div
        className="absolute inset-0"
        onClick={() => setShowEditModal(false)}
      />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-lg font-bold mb-4">Edit Employee</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setShowEditModal(false);
            onSave();
          }}
          className="space-y-4"
        >
          {/* name */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              name="username"
              value={empData.username}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          {/* mail */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={empData.email}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="number"
              name="phone"
              value={empData.phone}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Salary</label>
            <input
              type="number"
              name="salary"
              value={empData.salary}
              onChange={onChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              required
            />
          </div>
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
