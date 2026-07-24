import { useEffect, useState, useRef } from "react";
import { UserHooks } from "../../hooks/userHoocks";
export default function ProfileManager() {
  const { useProfile } = UserHooks();
  const { mutate, isPending } = useProfile();
  const [profile, setProfile] = useState();
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  // Load saved profile
  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (res) => {
          setProfile(res.data);
        },
      }
    );
  }, []);

  // Basic validation
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
    const value = e.target.value;
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const handleAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Basic client-side image preview via Data URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfile((p) => ({ ...p, avatar: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const eobj = validate(profile);
    setErrors(eobj);
    if (Object.keys(eobj).length > 0) return;

    // Emulate save => persist to localStorage and exit edit mode
    localStorage.setItem("profile_demo_v1", JSON.stringify(profile));
    setEditing(false);
    // Optionally show a toast (not implemented) or small visual feedback
  };

  const handleCancel = () => {
    // reload saved profile or reset
    const saved = localStorage.getItem("profile_demo_v1");
    if (saved) setProfile(JSON.parse(saved));
    else setProfile(defaultProfile);
    setErrors({});
    setEditing(false);
  };

  const handleResetAvatar = () => {
    setProfile((p) => ({ ...p, avatar: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="">
      <div className="bg-white h-screen shadow rounded-2xl overflow-hidden">
        {profile && (
          <div className="flex flex-col md:flex-row">
            {/* Left column: avatar + quick info */}
            <div className="md:w-1/3 p-6 bg-gradient-to-b from-white to-slate-50 border-r">
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
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 right-0 bg-white border p-2 rounded-full shadow text-sm"
                    aria-label="Thay đổi avatar"
                  >
                    ✏️
                  </button>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {profile.fullName || "Your name"}
                  </h3>
                  <p className="text-sm text-slate-500">
                    {profile.email || "your email"}
                  </p>
                </div>

                <div className="flex gap-2">
                  <div className="flex items-center gap-2">
                    {/* <button
                    type="button"
                    onClick={handleResetAvatar}
                    className="px-3 py-1 rounded-lg border"
                    disabled={!editing || !profile.avatar}
                  >
                    Xóa avatar
                  </button> */}
                  </div>
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

            {/* Right column: form */}
            <form onSubmit={handleSave} className="md:w-2/3 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  Personal information management
                </h2>

                <div className="text-sm text-slate-500">
                  {editing ? "editing" : "View only"}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">FullName</label>
                  <input
                    value={profile.fullName || ""}
                    onChange={handleChange("fullName")}
                    readOnly={!editing}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 transition ${errors.fullName ? "border-red-400" : "border-gray-200"
                      }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium">Username</label>
                  <input
                    value={profile.username || ""}
                    onChange={handleChange("username")}
                    readOnly={!editing}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 transition ${errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">Email</label>
                  <input
                    value={profile.email || " "}
                    onChange={handleChange("email")}
                    readOnly={!editing}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 transition ${errors.email ? "border-red-400" : "border-gray-200"
                      }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium">Phone</label>
                  <input
                    value={profile.phone || " "}
                    onChange={handleChange("phone")}
                    readOnly={!editing}
                    className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-200 transition ${errors.phone ? "border-red-400" : "border-gray-200"
                      }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3">
                {editing ? (
                  <>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 rounded-lg border"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      // setErrors({});
                      setEditing((v) => !v);
                    }}
                    className="px-4 py-2 rounded-lg border"
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
