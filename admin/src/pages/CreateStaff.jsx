import { useState } from "react";
import axios from "axios";

export default function CreateStaff() {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem("adminToken");
            const res = await axios.post(
                "http://localhost:5000/api/users/create-staff",
                { fullName, email },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(res.data.message);
        } catch (err) {
            alert(err.response?.data?.message || "Error creating staff");
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-10">
            <h1 className="text-xl font-bold mb-4">Create Staff</h1>
            <input
                className="border p-2 w-full mb-2"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />
            <input
                className="border p-2 w-full mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button
                className="bg-green-500 text-white p-2 w-full"
                onClick={handleCreate}
            >
                Create Staff
            </button>
        </div>
    );
}
