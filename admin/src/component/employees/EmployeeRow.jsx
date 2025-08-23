import { useState } from "react";
import { assets } from "../../assets/assets";
import EditEmployeeModal from "./EditEmployeeModal";
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserHooks } from "../../hooks/userHoocks";
import { ShopContext } from "../../context/ShopContext";

const EmployeeRow = ({ emp: empData }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { currency } = useContext(ShopContext);
  const { useBlockUser, useSendActivation, useDeleteUser } = UserHooks();

  const { mutate: blockUser, isPending: loadBlock } = useBlockUser();
  const handleBlock = async () => {
    blockUser(
      { id: empData._id },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Successfully!");
          } else {
            toast.error(res.message);
          }
        },
      }
    );
  };

  const { mutate: deleteUser, isPending: loadDelete } = useDeleteUser();
  const handleDelete = async () => {
    deleteUser(
      { id: empData._id },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Employee deleted");
          } else {
            toast.error(res.message);
          }
        },
      }
    );
  };

  const { mutate: sendMail, isPending: loadSend } = useSendActivation();
  const handleSendActivate = async () => {
    sendMail(
      { data: empData.email },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success("Send email activation success!");
          } else {
            toast.error(res.message);
          }
        },
      }
    );
  };

  return (
    <>
      {/* modal edit */}
      {showEditModal && (
        <EditEmployeeModal
          empData={empData}
          setShowEditModal={setShowEditModal}
        />
      )}

      {/* modal confirm delete */}
      {showConfirmModal && (
        <ConfirmModal
          title="Delete Employee"
          message={`Are you sure you want to delete ${empData.name}?`}
          onConfirm={handleDelete}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}

      {/* row */}

      <tr className="hover:bg-gray-50 transition-colors px-8 relative ">
        <td className="px-6 py-4">
          {loadSend && (
            <p className="text-xl text-blue-600">
              ..........loading..............
            </p>
          )}
          {!empData.isActive && (
            <>
              <p className="text-xl text-red-500">not activated</p>
            </>
          )}

          {empData.locked && (
            <p className="absolute left-0 border-2 border-red-500 w-3/4 top-[50%]" />
          )}

          <div className="flex items-center">
            <img
              src={empData?.avatar ? empData.avatar : assets.user_img}
              alt="User Avatar"
              className="w-10 h-10 rounded-full mr-3"
            />

            <div>
              <div className="text-sm font-medium text-gray-900">
                {empData.fullName}
              </div>
              <div className="text-sm text-gray-500">{empData.email}</div>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 text-sm">{empData.phone}</td>
        <td className="px-6 py-4 text-sm">
          {empData.salary.toLocaleString()}
          {currency}
        </td>
        <td className="px-6 py-4">
          {new Date(empData.createdAt).toISOString().split("T")[0]}
        </td>

        <td className="px-6 py-4 text-sm ">
          <div className="p-2 rounded-full hover:bg-gray-100 w-10 relative group">
            <img src={assets.more_vert} alt="" />
            <div className="z-10 absolute right-0  top-8 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 hidden group-hover:block">
              {!empData.locked ? (
                <ul className="py-2 text-sm text-gray-700 ">
                  <li
                    className="cursor-pointer"
                    onClick={() => setShowEditModal(true)}
                  >
                    <p className="block px-4 py-2 hover:bg-gray-100 ">Edit</p>
                  </li>
                  <li className="cursor-pointer" onClick={handleBlock}>
                    <p className="block px-4 py-2 hover:bg-gray-100 ">Block</p>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    <p className="block px-4 py-2 hover:bg-gray-100 ">Delete</p>
                  </li>
                  {!empData.isActive && (
                    <li className="cursor-pointer" onClick={handleSendActivate}>
                      <p className="block px-4 py-2 hover:bg-gray-100 ">
                        Resent active
                      </p>
                    </li>
                  )}
                </ul>
              ) : (
                <ul className="py-2 text-sm text-gray-700 ">
                  <li className="cursor-pointer" onClick={handleBlock}>
                    <p className="block px-4 py-2 hover:bg-gray-100 ">
                      Unblock
                    </p>
                  </li>
                  <li
                    className="cursor-pointer"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    <p className="block px-4 py-2 hover:bg-gray-100 ">Delete</p>
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
