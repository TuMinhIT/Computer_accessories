import { motion, useInView } from 'framer-motion';
import React, { useRef, useState, useEffect } from 'react';



const productsData = [
  {
    category: 'Laptop',
    items: [
      { id: 1, name: 'Laptop Dell XPS 13', barcode: 'DLXPS13', category: 'Laptop', creationDate: '2024-01-15', retailPrice: 1500, importPrice: 1200, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 2, name: 'Laptop MacBook Air M2', barcode: 'MBAM2', category: 'Laptop', creationDate: '2024-02-20', retailPrice: 1200, importPrice: 1000, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 3, name: 'Laptop HP Spectre x360', barcode: 'HPSX360', category: 'Laptop', creationDate: '2024-03-10', retailPrice: 1400, importPrice: 1100, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 4, name: 'Laptop Lenovo ThinkPad X1', barcode: 'LNTPX1', category: 'Laptop', creationDate: '2024-04-05', retailPrice: 1600, importPrice: 1300, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 5, name: 'Laptop Asus ROG Zephyrus', barcode: 'ASRGZ', category: 'Laptop', creationDate: '2024-05-12', retailPrice: 2000, importPrice: 1700, image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 6, name: 'Laptop Acer Predator Helios', barcode: 'ACPH', category: 'Laptop', creationDate: '2024-06-18', retailPrice: 1800, importPrice: 1500, image: 'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 7, name: 'Laptop Microsoft Surface Laptop 5', barcode: 'MSSFL5', category: 'Laptop', creationDate: '2024-07-22', retailPrice: 1300, importPrice: 1100, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 8, name: 'Laptop Razer Blade 15', barcode: 'RZBL15', category: 'Laptop', creationDate: '2024-08-30', retailPrice: 2200, importPrice: 1900, image: 'https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 9, name: 'Laptop Samsung Galaxy Book3', barcode: 'SSGB3', category: 'Laptop', creationDate: '2024-09-14', retailPrice: 1100, importPrice: 900, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 10, name: 'Laptop LG Gram 17', barcode: 'LGGR17', category: 'Laptop', creationDate: '2024-10-25', retailPrice: 1700, importPrice: 1400, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    category: 'RAM',
    items: [
      { id: 11, name: 'RAM Corsair Vengeance 16GB', barcode: 'CRV16GB', category: 'RAM', creationDate: '2024-01-05', retailPrice: 80, importPrice: 60, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 12, name: 'RAM Kingston HyperX 32GB', barcode: 'KTHX32GB', category: 'RAM', creationDate: '2024-02-15', retailPrice: 150, importPrice: 120, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 13, name: 'RAM G.Skill Trident Z 64GB', barcode: 'GSTZ64GB', category: 'RAM', creationDate: '2024-03-20', retailPrice: 300, importPrice: 250, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 14, name: 'RAM Crucial Ballistix 8GB', barcode: 'CRBL8GB', category: 'RAM', creationDate: '2024-04-10', retailPrice: 50, importPrice: 40, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 5, name: 'RAM TeamGroup T-Force 16GB', barcode: 'TGT F16GB', category: 'RAM', creationDate: '2024-05-25', retailPrice: 70, importPrice: 55, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 6, name: 'RAM ADATA XPG 32GB', barcode: 'ADXPG32GB', category: 'RAM', creationDate: '2024-06-08', retailPrice: 140, importPrice: 110, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 7, name: 'RAM Patriot Viper 64GB', barcode: 'PVV64GB', category: 'RAM', creationDate: '2024-07-12', retailPrice: 280, importPrice: 230, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 8, name: 'RAM HyperX Fury 8GB', barcode: 'HXF8GB', category: 'RAM', creationDate: '2024-08-18', retailPrice: 45, importPrice: 35, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 9, name: 'RAM OLOy Owl 16GB', barcode: 'OLOW16GB', category: 'RAM', creationDate: '2024-09-22', retailPrice: 65, importPrice: 50, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 10, name: 'RAM Silicon Power 32GB', barcode: 'SP32GB', category: 'RAM', creationDate: '2024-10-30', retailPrice: 130, importPrice: 100, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    category: 'Chuột (Mouse)',
    items: [
      { id: 21, name: 'Chuột Logitech MX Master 3', barcode: 'LGMXM3', category: 'Chuột', creationDate: '2024-01-10', retailPrice: 100, importPrice: 80, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 22, name: 'Chuột Razer DeathAdder V2', barcode: 'RZDAV2', category: 'Chuột', creationDate: '2024-02-25', retailPrice: 70, importPrice: 50, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 23, name: 'Chuột Apple Magic Mouse 2', barcode: 'APMM2', category: 'Chuột', creationDate: '2024-03-15', retailPrice: 80, importPrice: 60, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 24, name: 'Chuột Corsair Nightsword RGB', barcode: 'CRNSRGB', category: 'Chuột', creationDate: '2024-04-20', retailPrice: 90, importPrice: 70, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 25, name: 'Chuột SteelSeries Rival 600', barcode: 'SSR600', category: 'Chuột', creationDate: '2024-05-30', retailPrice: 85, importPrice: 65, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 26, name: 'Chuột Microsoft Surface Mouse', barcode: 'MSSM', category: 'Chuột', creationDate: '2024-06-05', retailPrice: 50, importPrice: 40, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 27, name: 'Chuột HyperX Pulsefire Haste', barcode: 'HXPH', category: 'Chuột', creationDate: '2024-07-15', retailPrice: 60, importPrice: 45, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 28, name: 'Chuột Zowie EC2', barcode: 'ZWEC2', category: 'Chuột', creationDate: '2024-08-25', retailPrice: 70, importPrice: 55, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 29, name: 'Chuột Glorious Model O', barcode: 'GLMO', category: 'Chuột', creationDate: '2024-09-10', retailPrice: 65, importPrice: 50, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 30, name: 'Chuột Endgame Gear XM1', barcode: 'EGXM1', category: 'Chuột', creationDate: '2024-10-20', retailPrice: 75, importPrice: 60, image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    category: 'Phone',
    items: [
      { id: 31, name: 'iPhone 15 Pro', barcode: 'IP15P', category: 'Phone', creationDate: '2024-01-01', retailPrice: 1200, importPrice: 1000, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 32, name: 'Samsung Galaxy S24', barcode: 'SGS24', category: 'Phone', creationDate: '2024-02-01', retailPrice: 1100, importPrice: 900, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 33, name: 'Google Pixel 8', barcode: 'GP8', category: 'Phone', creationDate: '2024-03-01', retailPrice: 800, importPrice: 650, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 34, name: 'OnePlus 12', barcode: 'OP12', category: 'Phone', creationDate: '2024-04-01', retailPrice: 900, importPrice: 750, image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 35, name: 'Xiaomi 14', barcode: 'XM14', category: 'Phone', creationDate: '2024-05-01', retailPrice: 700, importPrice: 550, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 36, name: 'Sony Xperia 1 V', barcode: 'SX1V', category: 'Phone', creationDate: '2024-06-01', retailPrice: 1300, importPrice: 1100, image: 'https://images.unsplash.com/photo-1580915411954-282cb1b0d780?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 37, name: 'Huawei P60 Pro', barcode: 'HWP60P', category: 'Phone', creationDate: '2024-07-01', retailPrice: 1000, importPrice: 850, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 38, name: 'Oppo Find X7', barcode: 'OPFX7', category: 'Phone', creationDate: '2024-08-01', retailPrice: 950, importPrice: 800, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 39, name: 'Vivo X100', barcode: 'VVX100', category: 'Phone', creationDate: '2024-09-01', retailPrice: 850, importPrice: 700, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 40, name: 'Nokia G400', barcode: 'NKG400', category: 'Phone', creationDate: '2024-10-01', retailPrice: 300, importPrice: 250, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ],
  },
  {
    category: 'Phụ Kiện (Accessories)',
    items: [
      { id: 41, name: 'Tai Nghe AirPods Pro', barcode: 'APPRO', category: 'Phụ Kiện', creationDate: '2024-01-05', retailPrice: 250, importPrice: 200, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 42, name: 'Sạc Nhanh 20W', barcode: 'SN20W', category: 'Phụ Kiện', creationDate: '2024-02-10', retailPrice: 30, importPrice: 20, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 43, name: 'Ốp Lưng iPhone', barcode: 'OPIP', category: 'Phụ Kiện', creationDate: '2024-03-15', retailPrice: 20, importPrice: 15, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 44, name: 'Cáp Sạc USB-C', barcode: 'CSUSBC', category: 'Phụ Kiện', creationDate: '2024-04-20', retailPrice: 15, importPrice: 10, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 45, name: 'Pin Dự Phòng 10000mAh', barcode: 'PDP10K', category: 'Phụ Kiện', creationDate: '2024-05-25', retailPrice: 40, importPrice: 30, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 46, name: 'Kính Cường Lực', barcode: 'KCL', category: 'Phụ Kiện', creationDate: '2024-06-30', retailPrice: 10, importPrice: 5, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 47, name: 'Tai Nghe Có Dây', barcode: 'TNCD', category: 'Phụ Kiện', creationDate: '2024-07-05', retailPrice: 25, importPrice: 18, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 48, name: 'Sạc Không Dây', barcode: 'SKD', category: 'Phụ Kiện', creationDate: '2024-08-10', retailPrice: 35, importPrice: 25, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 49, name: 'Bao Da Điện Thoại', barcode: 'BDT', category: 'Phụ Kiện', creationDate: '2024-09-15', retailPrice: 18, importPrice: 12, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
      { id: 50, name: 'Gậy Selfie', barcode: 'GSF', category: 'Phụ Kiện', creationDate: '2024-10-20', retailPrice: 20, importPrice: 15, image: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    ],
  },
];

const categoryVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

const productVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
};

function Product() {
  const [role, setRole] = useState('sales');
  const refs = useRef(productsData.map(() => useRef(null)));

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'sales';
    setRole(userRole);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-indigo-700 mb-12 text-center"
        >
          Product Catalog
        </motion.h1>

        {role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 4px 12px rgba(79,70,229,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => console.log('Add new product')}
            className="mb-12 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium shadow-md hover:bg-indigo-700 transition duration-300 block mx-auto"
          >
            Add New Product
          </motion.button>
        )}

        {productsData.map((category, catIndex) => {
          const ref = refs.current[catIndex];
          const inView = useInView(ref, { triggerOnce: true, threshold: 0.1 });

          return (
            <motion.section
              key={category.category}
              ref={ref}
              variants={categoryVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="mb-16"
            >
              <motion.h2
                variants={productVariants}
                className="text-3xl font-semibold text-gray-900 mb-8 border-b-2 border-indigo-200 pb-2"
              >
                {category.category}
              </motion.h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.items.map((product, prodIndex) => (
                  <motion.div
                    key={product.id}
                    variants={productVariants}
                    whileHover={{ scale: 1.05, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                    className="bg-white rounded-2xl overflow-hidden shadow-md transition-all duration-300 cursor-pointer group"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">Barcode: {product.barcode}</p>
                      <p className="text-gray-600 text-sm mb-1">Category: {product.category}</p>
                      <p className="text-gray-600 text-sm mb-4">Created: {new Date(product.creationDate).toLocaleDateString()}</p>
                      <p className="text-indigo-700 font-bold text-lg mb-2">Retail Price: ${product.retailPrice.toFixed(2)}</p>
                      {role === 'admin' && (
                        <p className="text-red-600 font-bold text-lg mb-4">Import Price: ${product.importPrice.toFixed(2)}</p>
                      )}
                      <div className="flex space-x-3 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex-1 bg-green-500 text-white py-3 rounded-xl font-medium text-base shadow-sm hover:bg-green-600 transition duration-200 flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Add to Cart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-medium text-base shadow-sm hover:bg-indigo-700 transition duration-200 flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          Buy Now
                        </motion.button>
                      </div>
                      {role === 'admin' && (
                        <div className="flex space-x-3 mt-4">
                          <button className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition duration-200 text-sm font-medium">
                            Edit
                          </button>
                          <button className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-200 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              {category.items.length === 0 && (
                <p className="text-center text-gray-600 text-lg mt-8">No products in this category.</p>
              )}
            </motion.section>
          );
        })}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: productsData.length * 0.5 }}
          className="text-center mt-12 p-8 bg-white rounded-2xl shadow-md max-w-md mx-auto"
        >
          <svg className="w-16 h-16 mx-auto mb-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-2xl font-semibold text-gray-800 mb-2">End of Product Catalog</p>
          <p className="text-gray-600">You've reached the end. Check back for new additions!</p>
        </motion.div>
      </div>
    </div>
  );
}

export default Product;