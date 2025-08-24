import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function ProfileManager() {
  const defaultProfile = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    bio: "",
    birthday: "",
    gender: "",
    avatar: "",
  };

  const [profile, setProfile] = useState(defaultProfile);
  const [originalProfile, setOriginalProfile] = useState(defaultProfile); // bản gốc để so sánh
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  // ✅ Load profile khi mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) {
          const data = res.data.data;
          const formatted = {
            ...data,
            birthday: data.birthday ? String(data.birthday).slice(0, 10) : "",
          };
          setProfile(formatted);
          setOriginalProfile(formatted);
        } else {
          toast.error(res.data.message || "Failed to load profile");
        }
      } catch (err) {
        toast.error("Error loading profile");
      }
    };
    fetchProfile();
  }, []);

  // ✅ Validate form
  const validate = (data) => {
    const e = {};
    if (!data.fullName || data.fullName.trim().length < 3)
      e.fullName = "Họ tên phải có ít nhất 3 ký tự";
    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email))
      e.email = "Email không hợp lệ";
    if (data.phone && !/^\+?[0-9\-\s]{7,20}$/.test(data.phone))
      e.phone = "Số điện thoại không hợp lệ";
    if (data.bio && data.bio.length > 500)
      e.bio = "Tiểu sử không quá 500 ký tự";
    return e;
  };

  const handleChange = (field) => (e) => {
    if (!editing) return;
    const value = e.target.value;
    setProfile((p) => ({ ...p, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleAvatar = (e) => {
    if (!editing) return;
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Chỉ chạy khi click nút "Lưu"
  const handleSave = async () => {
    if (!editing) return;

    if (JSON.stringify(profile) === JSON.stringify(originalProfile)) {
      toast.info("Không có thay đổi nào để cập nhật");
      setEditing(false);
      return;
    }

    const eobj = validate(profile);
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    try {
      const token = localStorage.getItem("token");
      const dataToSend = { ...profile };
      if (!dataToSend.birthday) delete dataToSend.birthday;
      if (!dataToSend.avatar) delete dataToSend.avatar;

      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        dataToSend,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        const data = res.data.data;
        const formatted = {
          ...data,
          birthday: data.birthday ? String(data.birthday).slice(0, 10) : "",
        };
        setProfile(formatted);
        setOriginalProfile(formatted);
        toast.success("Cập nhật thông tin thành công!");
        setEditing(false);
      } else {
        toast.error(res.data.message || "Cập nhật thất bại");
      }
    } catch (err) {
      toast.error("Có lỗi xảy ra khi lưu thông tin");
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile); // khôi phục dữ liệu gốc
    setErrors({}); // clear errors
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleResetAvatar = () => {
    if (!editing) return;
    setProfile((p) => ({ ...p, avatar: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white shadow rounded-2xl h-screen px-10 md:px-30 overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left column: avatar */}
        <div className="md:w-1/3 p-6 bg-gradient-to-b from-white to-slate-50 md:border-r">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="relative">
              <div className="w-36 h-36 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt="avatar"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-400">No avatar</div>
                )}
              </div>
              {editing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 right-0 bg-white border p-2 rounded-full shadow text-sm"
                  aria-label="Thay đổi avatar"
                >
                  ✏️
                </button>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold">
                {profile.fullName || "Tên người dùng"}
              </h3>
              <p className="text-sm text-slate-500">
                {profile.email || "Chưa có email"}
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatar}
              className="hidden"
            />
          </div>
        </div>

        {/* Right column: form - KHÔNG dùng form tag để tránh submit tự động */}
        <div className="h-screen md:w-2/3 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Quản lý thông tin cá nhân</h2>
            <div className="text-sm text-slate-500">
              {editing ? "Đang chỉnh sửa" : "Chỉ xem"}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Họ và tên */}
            <div>
              <label className="block text-sm font-medium">Họ và tên</label>
              <input
                value={profile.fullName}
                onChange={handleChange("fullName")}
                readOnly={!editing}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                  editing
                    ? "focus:ring-indigo-200 border-gray-200"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                value={profile.email}
                readOnly
                className="mt-1 block w-full rounded-lg border px-3 py-2 bg-gray-100 text-gray-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Số điện thoại</label>
              <input
                value={profile.phone}
                onChange={handleChange("phone")}
                readOnly={!editing}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                  editing
                    ? "focus:ring-indigo-200 border-gray-200"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Ngày sinh */}
            <div>
              <label className="block text-sm font-medium">Ngày sinh</label>
              <input
                type="date"
                value={profile.birthday || ""}
                onChange={handleChange("birthday")}
                readOnly={!editing}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                  editing
                    ? "focus:ring-indigo-200 border-gray-200"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Địa chỉ */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Địa chỉ</label>
              <input
                value={profile.address || ""}
                onChange={handleChange("address")}
                readOnly={!editing}
                className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                  editing
                    ? "focus:ring-indigo-200 border-gray-200"
                    : "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              />
            </div>

            {/* Giới tính */}
            <div className="md:col-span-2 flex items-center gap-4">
              <label className="text-sm font-medium">Giới tính</label>
              <select
                value={profile.gender || ""}
                onChange={handleChange("gender")}
                disabled={!editing}
                className={`ml-2 rounded-lg border px-2 py-1 ${
                  !editing && "bg-gray-100 text-gray-500 cursor-not-allowed"
                }`}
              >
                <option value="">Chọn</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </div>
          </div>

          {/* Actions - Tách riêng khỏi form */}
          <div className="mt-6 flex items-center gap-3">
            {editing ? (
              <>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                >
                  Lưu
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg border"
                >
                  Hủy
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 rounded-lg border"
              >
                Chỉnh sửa thông tin
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}