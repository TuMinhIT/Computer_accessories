const [form, setForm] = useState({
  name: "",
  barcode: "",
  category: "",
  brand: "",
  price: "",
  cost: "",
  stock: "",
  warrantyMonths: "",
  description: "",
  bestseller: false,
  images: [],
});
const [imagePreviews, setImagePreviews] = useState([]);

const handleChange = (e) => {
  const { name, value, type, checked } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value,
  }));
};

const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setForm((prev) => ({ ...prev, images: files }));
  setImagePreviews(files.map((file) => URL.createObjectURL(file)));
};

const handleSubmit = (e) => {
  e.preventDefault();
  // Xử lý submit ở đây
  alert("Product added! (demo)");
  setShowAddModal(false);
};
