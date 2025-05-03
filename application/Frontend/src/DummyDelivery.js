const dummyDelivery = {
    delivery_id: 101,
    vendor_id: 1,
    courier_id: 1,
    buyer_id: 1,
    product_id: 1,
    product_name: "Laptop Charger",
    condition: "New",
    image_url: "/placeholder.png",
    pickup: "Gator Market, SFSU",
    dropoff: "Library",
    quantity: 1,
    buyer_special_request: "Leave at circulation desk",
    vendor_special_request: "Ensure packaging is intact",
    delivery_status: "Picked Up",
    timestamp: new Date().toISOString()
};

export default dummyDelivery;
