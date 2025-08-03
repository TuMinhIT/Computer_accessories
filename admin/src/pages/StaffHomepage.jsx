import { useNavigate } from "react-router-dom";

export default function StaffHomepage() {
    const staffToken = localStorage.getItem("staffToken");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("staffToken");
        localStorage.removeItem("pendingUsername");
        navigate("/");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
            <h1 className="text-3xl font-bold text-blue-700">Staff Dashboard</h1>
            <p className="mt-4 text-lg text-gray-700">
                Welcome, Staff! You can view your tasks and sales here.
            </p>

            {!staffToken && (
                <p className="text-red-500 mt-2">You are not authenticated</p>
            )}

            {staffToken && (
                <button
                    onClick={handleLogout}
                    className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            )}
        </div>
    );
}
