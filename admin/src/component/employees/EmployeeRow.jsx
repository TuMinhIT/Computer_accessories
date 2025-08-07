import { useState } from "react";
import { assets } from "../../assets/assets";
import EditEmployeeModal from "./EditEmployeeModal";
import { toast } from "react-toastify";
import LoadingBar from "./LoadingBar";
const EmployeeRow = ({ emp }) => {
  const [empData, setEmpData] = useState(emp);
  const currency = "$";
  const [showEditModal, setShowEditModal] = useState(false);

  const onSave = () => {
    toast.success("call api saved");
  };

  const onBlock = () => {
    toast.success("call api blocked");
    // setEmpData({ ...empData, locked: !empData.locked });
  };
  const onDelete = () => {
    toast.success("call api deleted");
  };
  return (
    <>
      {showEditModal && (
        <EditEmployeeModal
          empData={empData}
          setEmpData={setEmpData}
          onSave={onSave}
          setShowEditModal={setShowEditModal}
        />
      )}

      <tr className="hover:bg-gray-50 transition-colors px-8 relative ">
        <td className="px-6 py-4">
          {empData.active && (
            <div className="">
              <LoadingBar />
            </div>
          )}

          {empData.locked && (
            <p className="absolute left-0 border border-red-500 w-3/4 top-[50%]" />
          )}

          <div className="flex items-center">
            <img
              src={emp.avatar}
              alt=""
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <div className="text-sm font-medium text-gray-900">
                {emp.username}
              </div>
              <div className="text-sm text-gray-500">{emp.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm">{emp.phone}</td>
        <td className="px-6 py-4 text-sm">
          {emp.salary.toLocaleString()}
          {currency}
        </td>
        <td className="px-6 py-4">{emp.createAt}</td>
        <td className="px-6 py-4 text-sm ">
          <div className="p-2 rounded-full hover:bg-gray-100 w-10 relative group">
            <img src={assets.more_vert} alt="" />
            {/* Dropdown menu hiển thị khi hover group */}
            <div
              id="dropdownDivider"
              className="z-10 absolute  top-8 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 hidden group-hover:block"
            >
              {!empData.locked && (
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownDividerButton"
                >
                  <li
                    className="cursor-pointer"
                    onClick={() => setShowEditModal(true)}
                  >
                    <p className="block px-4 py-2 hover:bg-gray-100 ">Edit</p>
                  </li>
                  <li className="cursor-pointer" onClick={onBlock}>
                    <p href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      Block
                    </p>
                  </li>

                  <li className="cursor-pointer" onClick={onDelete}>
                    <p href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      Delete
                    </p>
                  </li>
                </ul>
              )}

              {empData.locked && (
                <ul
                  className="py-2 text-sm text-gray-700 "
                  aria-labelledby="dropdownDividerButton"
                >
                  <li className="cursor-pointer" onClick={onBlock}>
                    <p href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      Unblock
                    </p>
                  </li>

                  <li className="cursor-pointer" onClick={onDelete}>
                    <p href="#" className="block px-4 py-2 hover:bg-gray-100 ">
                      Delete
                    </p>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </td>
      </tr>
    </>
  );
};

export default EmployeeRow;
