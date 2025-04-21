export const directMessage = [
    {
      message_id: 1,
      sender_id: 1,
      receiver_id: 2,
      content: "Hey, is this item still available?",
      timestamp: "2025-04-20T10:15:00Z",
      listing_id: 1
    },
    {
      message_id: 2,
      sender_id: 2,
      receiver_id: 1,
      content: "Yes, it's still available. Are you interested?",
      timestamp: "2025-04-20T10:16:30Z",
      listing_id: 1
    },
    {
        message_id: 6,
        sender_id: 1,
        receiver_id: 2,
        content: "Can we lower the price?",
        timestamp: "2025-04-20T10:16:30Z",
        listing_id: 1
      },
    {
      message_id: 3,
      sender_id: 3,
      receiver_id: 4,
      content: "Can you lower the price a bit?",
      timestamp: "2025-04-19T17:42:12Z",
      listing_id: 2
    },
    {
      message_id: 4,
      sender_id: 2,
      receiver_id: 3,
      content: "What price are you thinking?",
      timestamp: "2025-04-19T17:45:00Z",
      listing_id: 2
    },
    {
      message_id: 5,
      sender_id: 5,
      receiver_id: 6,
      content: "I can pick it up tomorrow if that works for you.",
      timestamp: "2025-04-18T09:20:00Z",
      listing_id: 3
    },
    {
        message_id: 7,
        sender_id: 2,
        receiver_id: 4,
        content: "available?",
        timestamp: "2025-04-19T17:45:00Z",
        listing_id: 5
      },
      {
        message_id: 8,
        sender_id: 2,
        receiver_id: 4,
        content: "ALso what size",
        timestamp: "2025-04-19T17:45:01Z",
        listing_id: 5
      }
  ];

  export const registeredUsers = [
    {
      id: 1,
      firstName: "Emily",
      lastName: "Wong",
      username: "emwong23",
      password: "Password123!", // NOTE: Only for dummy use; never store plain passwords in production
      sfsuEmail: "emwong23@mail.sfsu.edu",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      firstName: "Liam",
      lastName: "Nguyen",
      username: "liamng",
      password: "SecurePass!456",
      sfsuEmail: "liamnguyen@sfsu.edu",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      firstName: "Sofia",
      lastName: "Patel",
      username: "sofip",
      password: "SfsuRocks2025",
      sfsuEmail: "spatel@mail.sfsu.edu",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      firstName: "Daniel",
      lastName: "Kim",
      username: "dankim95",
      password: "DkimSecure777",
      sfsuEmail: "danielkim@sfsu.edu",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      firstName: "Ava",
      lastName: "Martinez",
      username: "avamartz",
      password: "AvaPass321!",
      sfsuEmail: "amartinez@mail.sfsu.edu",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ];

  export const listings = [
    {
      product_id: 1,
      title: "Wireless Bluetooth Headphones",
      description: "Noise-cancelling over-ear headphones with 30-hour battery life.",
      thumbnail: "binary-thumbnail-data-1",
      image: "binary-image-data-1",
      category: "electronics",
      vendor_id: 101
    },
    {
      product_id: 2,
      title: "Handmade Wooden Coffee Table",
      description: "Rustic oak coffee table with a natural finish, perfect for living rooms.",
      thumbnail: "binary-thumbnail-data-2",
      image: "binary-image-data-2",
      category: "furniture",
      vendor_id: 102
    },
    {
      product_id: 3,
      title: "Organic Matcha Green Tea Powder",
      description: "Premium ceremonial grade matcha sourced from Uji, Japan.",
      thumbnail: "binary-thumbnail-data-3",
      image: "binary-image-data-3",
      category: "food",
      vendor_id: 103
    },
    {
      product_id: 4,
      title: "Leather Journal Notebook",
      description: "Bound leather notebook with 120 pages of recycled paper.",
      thumbnail: "binary-thumbnail-data-4",
      image: "binary-image-data-4",
      category: "stationary",
      vendor_id: 104
    },
    {
      product_id: 5,
      title: "Unisex Cotton Hoodie",
      description: "Soft and breathable hoodie made from 100% organic cotton.",
      thumbnail: "binary-thumbnail-data-5",
      image: "binary-image-data-5",
      category: "clothing",
      vendor_id: 105
    },
    {
      product_id: 6,
      title: "The Art of Coding",
      description: "An inspiring book on software craftsmanship and best practices.",
      thumbnail: "binary-thumbnail-data-6",
      image: "binary-image-data-6",
      category: "books",
      vendor_id: 106
    },
    {
      product_id: 7,
      title: "Custom 3D-Printed Keychain",
      description: "Personalized keychain made with eco-friendly PLA filament.",
      thumbnail: "binary-thumbnail-data-7",
      image: "binary-image-data-7",
      category: "other",
      vendor_id: 107
    }
  ];