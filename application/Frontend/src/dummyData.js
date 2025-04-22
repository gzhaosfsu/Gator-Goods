import macBookImg from "./components/images/macbookimg.png";
import MathBookImg from "./components/images/MathBook.png";
export const dummyData = [
    {
      product_id: 1,
      description: "This is a brand new book",
      category: "books",
      title: "Math Book",
      vendor_id: 1,
      image: MathBookImg,
      isFeatured: true
    },
    {
      product_id: 2,
      description: "Shirt has some holes but still good, pick up only",
      category: "clothing",
      title: "Green Shirt XL",
      vendor_id: 1,
      image: "https://via.placeholder.com/150?text=Green+Shirt+XL",
      isFeatured: false
    },
    {
      product_id: 3,
      description: "Laptop 16GB",
      category: "electronics",
      title: "Macbook Pro 13 inches",
      vendor_id: 2,
      image: macBookImg,
      isFeatured: true
    },
    {
      product_id: 4,
      description: "Thursday Food Market on campus",
      category: "food",
      title: "Aloha Food Vendor",
      vendor_id: 3,
      image: "https://via.placeholder.com/150?text=Aloha+Food+Vendor",
      isFeatured: false
    },
  ];
  