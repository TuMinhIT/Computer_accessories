

import { UserHooks } from "@/hooks/userHoocks";
import Spinner from "@components/Spinner";
const Customers = () => {

  const { useUsers } = UserHooks();
  const { isPending, data: users, error } = useUsers();
  console.log(users)

  return (
    <div className="p-8">
      {isPending && <Spinner />}
      <h1 className="text-2xl font-bold mb-6">Customer Management</h1>
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="overflow-x-auto rounded-lg shadow border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Orders
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Spent (₫)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users && users.map((c, idx) => (
              <tr key={c.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {idx + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {c.userName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {c.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {c.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {c.orderCount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {/* {c.totalSpent.toLocaleString()} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {c.createdAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
