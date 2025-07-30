import logo from "./logo.png";
import shopping_cart from "./shopping-cart.png";
import user_img from "./user-img.jpg";
import background from "./background.png";
import background1 from "./background1.jpg";
import sell from "./sell.png";
import chevron_left from "./chevron_left.png";
import chevron_right from "./chevron_right.png";
import search from "./search.png";
import close from "./close.png";
export const assets = {
  logo,
  shopping_cart,
  user_img,
  background1,
  background,
  sell,
  chevron_left,
  chevron_right,
  search,
  close,
};

import m1 from "./mouse_item/m1.webp";
import m2 from "./mouse_item/m2.webp";
import m3 from "./mouse_item/m3.webp";
import m4 from "./mouse_item/m4.webp";
import m5 from "./mouse_item/m5.webp";

import c1_1 from "./screen1/screen1_1.webp";
import c1_2 from "./screen1/screen1_2.webp";
import c1_3 from "./screen1/screen1_3.webp";
import c1_4 from "./screen1/screen1_4.webp";
import c1_5 from "./screen1/screen1_5.webp";

import c2_1 from "./screen2/screen2_1.webp";
import c2_2 from "./screen2/screen2_2.webp";
import c2_3 from "./screen2/screen2_3.webp";
import c2_4 from "./screen2/screen2_4.webp";
import c2_5 from "./screen2/screen2_5.webp";

import key1 from "./keyboard/key1.webp";
import key2 from "./keyboard/key2.webp";
import key3 from "./keyboard/key3.webp";
export const products = [
  {
    id: 1,
    name: "Laptop Dell XPS 13",
    barcode: "DLXPS13",
    category: "Laptop",
    creationDate: "2024-01-15",
    retailPrice: 1500,
    importPrice: 1200,
    image: [m1, m2, m3, m4, m5],
  },
  {
    id: 2,
    name: "Màn hình ACER KG240Y M5 24",
    barcode: "HGHB HGIY",
    category: "Screen",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [c1_1, c1_2, c1_3, c1_4, c1_5],
  },
  {
    id: 3,
    name: "Màn hình ACER ",
    barcode: "HGHB HGIY",
    category: "Screen",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [c1_2, c1_4, c1_5],
  },
  {
    id: 4,
    name: "Màn hình Asus ",
    barcode: "HGHB HGIY",
    category: "Screen",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [c2_2, c1_4, c2_5],
  },
  {
    id: 5,
    name: "Màn hình Asus Ad  ",
    barcode: "HGHB HGIY",
    category: "Screen",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [c2_3, c1_4, c2_5],
  },
  {
    id: 5,
    name: "Màn hình macc  ",
    barcode: "HGHB HGIY",
    category: "Screen",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [c2_1, c1_4, c2_5],
  },

  {
    id: 6,
    name: "Bàn phím Logitech không dây  ",
    barcode: "HGHB HGIY",
    category: "mouse",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [key1, key2, key3],
  },
  {
    id: 7,
    name: "Bàn phím Logitech không dây Wave Keys Ergonomic Trắng Bàn phím Logitech không dây Wave Keys Ergonomic Trắng   ",
    barcode: "HGHB HGIY",
    category: "mouse",
    creationDate: "2024-01-15",
    retailPrice: 12300,
    importPrice: 15600,
    image: [key3, key2, key3],
  },
];
