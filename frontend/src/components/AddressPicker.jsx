import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddressPicker({
  editing,
  profile,
  setProfile,
  originalProfile,
}) {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [hamlet, setHamlet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");

  const [initCityName, setInitCityName] = useState("");
  const [initDistrictName, setInitDistrictName] = useState("");
  const [initWardName, setInitWardName] = useState("");

  useEffect(() => {
    if (profile.address && !editing) {
      const parts = profile.address.split(",").map((s) => s.trim());
      setHouseNumber(parts[0] || "");
      setHamlet(parts[1] || "");
      setInitWardName(parts[2] || "");
      setInitDistrictName(parts[3] || "");
      setInitCityName(parts[4] || "");
    }
  }, [profile.address, editing]);

  useEffect(() => {
    axios
      .get("https://provinces.open-api.vn/api/?depth=1")
      .then((res) => {
        const onlyCities = (res.data || []).filter((p) =>
          (p?.name || "").toLowerCase().startsWith("thành phố")
        );
        setCities(onlyCities);
      })
      .catch(() => toast.error("Không tải được Thành phố"));
  }, []);

  useEffect(() => {
    if (!initCityName || cities.length === 0) return;
    const found = cities.find((c) => c.name === initCityName);
    if (found) setSelectedCity(String(found.code));
  }, [cities, initCityName]);

  useEffect(() => {
    if (!selectedCity) {
      setDistricts([]);
      setSelectedDistrict("");
      setWards([]);
      setSelectedWard("");
      return;
    }
    axios
      .get(`https://provinces.open-api.vn/api/p/${selectedCity}?depth=2`)
      .then((res) => setDistricts(res.data?.districts || []))
      .catch(() => toast.error("Không tải được Tỉnh/Quận/Huyện"));
  }, [selectedCity]);

  useEffect(() => {
    if (!initDistrictName || districts.length === 0) return;
    const found = districts.find((d) => d.name === initDistrictName);
    if (found) setSelectedDistrict(String(found.code));
  }, [districts, initDistrictName]);

  useEffect(() => {
    if (!selectedDistrict) {
      setWards([]);
      setSelectedWard("");
      return;
    }
    axios
      .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
      .then((res) => setWards(res.data?.wards || []))
      .catch(() => toast.error("Không tải được Xã/Phường"));
  }, [selectedDistrict]);

  useEffect(() => {
    if (!initWardName || wards.length === 0) return;
    const found = wards.find((w) => w.name === initWardName);
    if (found) setSelectedWard(String(found.code));
  }, [wards, initWardName]);

  const previewAddress = [
    houseNumber,
    hamlet,
    wards.find((w) => String(w.code) === String(selectedWard))?.name,
    districts.find((d) => String(d.code) === String(selectedDistrict))?.name,
    cities.find((c) => String(c.code) === String(selectedCity))?.name,
  ]
    .filter(Boolean)
    .join(", ");

  useEffect(() => {
    if (editing) {
      setProfile((prev) => ({ ...prev, address: previewAddress }));
    }
  }, [houseNumber, hamlet, selectedCity, selectedDistrict, selectedWard]);

  return (
    <>
      <div className="md:col-span-2">
        <h3 className="font-semibold text-gray-700 mt-4 mb-2">Địa chỉ</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Thành phố */}
          <div>
            <label className="block text-sm font-medium">Thành phố</label>
            <select
              value={selectedCity}
              onChange={(e) => {
                if (!editing) return;
                setSelectedCity(e.target.value);
                setSelectedDistrict("");
                setSelectedWard("");
              }}
              disabled={!editing}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
            >
              <option value="">Chọn thành phố</option>
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tỉnh/Quận/Huyện */}
          <div>
            <label className="block text-sm font-medium">
              Tỉnh / Quận / Huyện
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => {
                if (!editing) return;
                setSelectedDistrict(e.target.value);
                setSelectedWard("");
              }}
              disabled={!editing || !selectedCity}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
            >
              <option value="">Chọn tỉnh/quận/huyện</option>
              {districts.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Xã/Phường */}
          <div>
            <label className="block text-sm font-medium">Xã / Phường</label>
            <select
              value={selectedWard}
              onChange={(e) => {
                if (!editing) return;
                setSelectedWard(e.target.value);
              }}
              disabled={!editing || !selectedDistrict}
              className="mt-1 block w-full rounded-lg border px-3 py-2"
            >
              <option value="">Chọn xã/phường</option>
              {wards.map((w) => (
                <option key={w.code} value={w.code}>
                  {w.name}
                </option>
              ))}
            </select>
          </div>

          {/* Ấp / Thôn */}
          <div>
            <label className="block text-sm font-medium">Ấp / Thôn</label>
            <input
              value={hamlet}
              onChange={(e) => editing && setHamlet(e.target.value)}
              readOnly={!editing}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                editing
                  ? "focus:ring-indigo-200 border-gray-200"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>

          {/* Số nhà */}
          <div>
            <label className="block text-sm font-medium">Số nhà</label>
            <input
              value={houseNumber}
              onChange={(e) => editing && setHouseNumber(e.target.value)}
              readOnly={!editing}
              className={`mt-1 block w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 transition ${
                editing
                  ? "focus:ring-indigo-200 border-gray-200"
                  : "bg-gray-100 text-gray-500 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-600">
          Địa chỉ đầy đủ
        </label>
        <div className="mt-1 p-3 rounded-lg border bg-gray-50 text-sm">
          {editing
            ? previewAddress || "Chưa nhập"
            : profile.address || "Chưa có"}
        </div>
      </div>
    </>
  );
}
