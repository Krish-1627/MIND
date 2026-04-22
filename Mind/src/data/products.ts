export interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    rating: number;
    reviewCount: number;
    image: string;
    description: string;
    specs: string[];
}

export const products: Product[] = [
    // --- Smartphones (10) ---
    {
        id: 'iphone-16',
        name: 'Apple iPhone 16 (128 GB) - Ultramarine',
        category: 'Smartphones',
        price: 79900,
        rating: 4.8,
        reviewCount: 1500,
        image: '/products/Apple iPhone 16 (128 GB) - Ultramarine.jpg',
        description: 'The latest iPhone with A18 chip and Camera Control.',
        specs: ['A18 chip', 'Camera Control', '48MP Fusion camera', 'USB-C']
    },
    {
        id: 'iphone-16-pro-max',
        name: 'Apple iPhone 16 Pro Max (256 GB) - Desert Titanium',
        category: 'Smartphones',
        price: 144900,
        rating: 4.9,
        reviewCount: 800,
        image: '/products/Apple iPhone 16 Pro Max (256 GB)  Desert Titanium.png',
        description: 'The ultimate iPhone with a massive 6.9-inch display and A18 Pro chip.',
        specs: ['A18 Pro chip', '6.9-inch display', '5x Telephoto camera', 'Titanium design']
    },
    {
        id: 'iphone-15',
        name: 'Apple iPhone 15 (128 GB) - Black',
        category: 'Smartphones',
        price: 69900,
        rating: 4.7,
        reviewCount: 12000,
        image: '/products/Apple iPhone 15 (128 GB) - Black.png',
        description: 'Dynamic Island comes to iPhone 15.',
        specs: ['A16 Bionic', '48MP Main camera', 'USB-C', 'Precision finding']
    },
    {
        id: 'oneplus-12',
        name: 'OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB Storage)',
        category: 'Smartphones',
        price: 64999,
        rating: 4.6,
        reviewCount: 3500,
        image: '/products/OnePlus 12 (Flowy Emerald, 12GB RAM, 256GB Storage).png',
        description: 'Smooth Beyond Belief with Snapdragon 8 Gen 3.',
        specs: ['Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W SuperVOOC', '2K AMOLED']
    },
    {
        id: 'oneplus-nord-ce4',
        name: 'OnePlus Nord CE 4 (Dark Chrome, 8GB RAM, 128GB Storage)',
        category: 'Smartphones',
        price: 24999,
        rating: 4.4,
        reviewCount: 5000,
        image: '/products/OnePlus Nord CE 4 (Dark Chrome, 8GB RAM, 128GB Storage).jfif',
        description: 'Fast and smooth performance at an affordable price.',
        specs: ['Snapdragon 7 Gen 3', '5500mAh Battery', '100W Charging', '120Hz AMOLED']
    },
    {
        id: 'realme-gt-6',
        name: 'Realme GT 6 (Fluid Silver, 12GB RAM, 256GB Storage)',
        category: 'Smartphones',
        price: 40999,
        rating: 4.5,
        reviewCount: 1200,
        image: '/products/Realme GT 6 (Fluid Silver, 12GB RAM, 256GB Storage).jpg',
        description: 'AI Flagship Killer with Ultra Bright Display.',
        specs: ['Snapdragon 8s Gen 3', '6000nits Peak Brightness', '50MP Sony Camera', '120W Charging']
    },
    {
        id: 'realme-narzo-70',
        name: 'Realme Narzo 70 5G (Ice Blue, 6GB RAM, 128GB Storage)',
        category: 'Smartphones',
        price: 15999,
        rating: 4.3,
        reviewCount: 2200,
        image: '/products/Realme Narzo 70 5G (Ice Blue, 6GB RAM, 128GB Storage).png',
        description: 'Turbo Charge your life with the Narzo 70.',
        specs: ['Dimensity 7050', '45W Charging', '120Hz AMOLED', '50MP AI Camera']
    },
    {
        id: 'redmi-note-13-pro',
        name: 'Redmi Note 13 Pro 5G (Midnight Black, 8GB RAM, 128GB Storage)',
        category: 'Smartphones',
        price: 25999,
        rating: 4.4,
        reviewCount: 6000,
        image: '/products/Redmi Note 13 Pro 5G (Midnight Black, 8GB RAM, 128GB Storage).png',
        description: 'SuperNote with 200MP Camera.',
        specs: ['200MP Camera', 'Snapdragon 7s Gen 2', '1.5K AMOLED', '67W Turbo Charge']
    },
    {
        id: 'redmi-12-5g',
        name: 'Redmi 12 5G (Moonstone Silver, 6GB RAM, 128GB Storage)',
        category: 'Smartphones',
        price: 11999,
        rating: 4.2,
        reviewCount: 15000,
        image: '/products/Redmi 12 5G (Moonstone Silver, 6GB RAM, 128GB Storage).png',
        description: 'India\'s fastest 5G smartphone under 12k.',
        specs: ['Snapdragon 4 Gen 2', '5000mAh Battery', 'Crystal Glass Design', '90Hz Display']
    },
    {
        id: 'samsung-s24',
        name: 'Samsung Galaxy S24 5G (Amber Yellow, 8GB RAM, 256GB Storage)',
        category: 'Smartphones',
        price: 74999,
        rating: 4.6,
        reviewCount: 2000,
        image: '/products/Samsung Galaxy S24 5G (Amber Yellow, 8GB RAM, 256GB Storage).jpg',
        description: 'Galaxy AI is here.',
        specs: ['Galaxy AI', 'Exynos 2400', 'Dynamic AMOLED 2X', '50MP Main Camera']
    },

    // --- Fashion – Bottom Wear (7) ---
    {
        id: 'black-formal-trousers-men',
        name: 'Black Formal Trousers for Men - Slim Fit',
        category: 'Bottom Wear',
        price: 1299,
        rating: 4.1,
        reviewCount: 500,
        image: '/products/Black Formal Trousers for Men - Slim Fit.png',
        description: 'Premium formal trousers for meetings and office wear.',
        specs: ['Wrinkle resistant', 'Breathable fabric', 'Stretchable']
    },
    {
        id: 'white-formal-trousers-men',
        name: 'White Formal Trousers for Men - Classic Fit',
        category: 'Bottom Wear',
        price: 1499,
        rating: 4.2,
        reviewCount: 200,
        image: '/products/White Formal Trousers for Men - Classic Fit.png',
        description: 'Dashing white trousers for special occasions.',
        specs: ['Premium Cotton', 'Regular fit', 'Easy wash']
    },
    {
        id: 'blue-denim-jeans-men',
        name: 'Blue Denim Jeans for Men - Bootcut',
        category: 'Bottom Wear',
        price: 1999,
        rating: 4.4,
        reviewCount: 3000,
        image: '/products/Blue Denim Jeans for Men - Bootcut.png',
        description: 'Comfortable and durable blue denim.',
        specs: ['Heavy denim', 'Faded look', 'Reinforced seams']
    },
    {
        id: 'slim-fit-blue-jeans-women',
        name: 'Slim Fit Blue Jeans for Women',
        category: 'Bottom Wear',
        price: 1799,
        rating: 4.5,
        reviewCount: 4500,
        image: '/products/Slim Fit Blue Jeans for Women.png',
        description: 'Trendy slim fit jeans for everyday style.',
        specs: ['Super stretch', 'High waist', 'Mid-wash blue']
    },
    {
        id: 'cotton-casual-shorts',
        name: 'Cotton Casual Shorts - Khaki',
        category: 'Bottom Wear',
        price: 899,
        rating: 4.3,
        reviewCount: 1500,
        image: '/products/Cotton Casual Shorts - Khaki.jpg',
        description: 'Relaxed cotton shorts for summer outings.',
        specs: ['100% Cotton', 'Drawstring waist', 'Six pockets']
    },
    {
        id: 'track-pants-black',
        name: 'Track Pants for Gym & Sports - Black',
        category: 'Bottom Wear',
        price: 999,
        rating: 4.4,
        reviewCount: 8000,
        image: '/products/Track Pants for Gym & Sports - Black.png',
        description: 'Breathable activewear for maximum performance.',
        specs: ['Quick-dry', 'Stretchable', 'Reflective logo']
    },
    {
        id: 'cargo-pants-olive',
        name: 'Cargo Pants for Men - Olive Green',
        category: 'Bottom Wear',
        price: 1599,
        rating: 4.2,
        reviewCount: 600,
        image: '/products/Cargo Pants for Men - Olive Green.png',
        description: 'Rugged cargo pants with multiple utility pockets.',
        specs: ['Heavy duty cotton', 'Relaxed fit', 'Taped seams']
    },

    // --- Fashion – Top Wear (8) ---
    {
        id: 'white-formal-shirt',
        name: 'White Formal Shirt for Men - Solid',
        category: 'Top Wear',
        price: 1199,
        rating: 4.3,
        reviewCount: 4000,
        image: '/products/White Formal Shirt for Men - Solid.png',
        description: 'Sharp white shirt for formal attire.',
        specs: ['Egyptian cotton', 'Spread collar', 'Button-down']
    },
    {
        id: 'blue-formal-shirt',
        name: 'Blue Formal Shirt for Men - Stripe Pattern',
        category: 'Top Wear',
        price: 1299,
        rating: 4.2,
        reviewCount: 2500,
        image: '/products/Blue Formal Shirt for Men - Stripe Pattern.png',
        description: 'Smart blue shirt with subtle stripes.',
        specs: ['Twill weave', 'Slim fit', 'Machine washable']
    },
    {
        id: 'cream-casual-shirt',
        name: 'Cream Casual Shirt - Linen Blend',
        category: 'Top Wear',
        price: 1399,
        rating: 4.4,
        reviewCount: 1200,
        image: '/products/Cream Casual Shirt - Linen Blend.png',
        description: 'Perfect for a weekend party or beach day.',
        specs: ['Linen blend', 'Soft texture', 'Half sleeves']
    },
    {
        id: 'red-t-shirt',
        name: 'Red Round Neck T-Shirt - Cotton',
        category: 'Top Wear',
        price: 499,
        rating: 4.5,
        reviewCount: 15000,
        image: '/products/Red Round Neck T-Shirt - Cotton.png',
        description: 'Vibrant red tee for casual wear.',
        specs: ['Bio-washed', 'Preshrunk', 'Regular fit']
    },
    {
        id: 'blue-t-shirt',
        name: 'Blue V-Neck T-Shirt - Sports Edition',
        category: 'Top Wear',
        price: 599,
        rating: 4.4,
        reviewCount: 9000,
        image: '/products/Blue V-Neck T-Shirt - Sports Edition.png',
        description: 'Sporty blue tee for workouts.',
        specs: ['Moisture wicking', 'Lightweight', 'Anti-odor']
    },
    {
        id: 'white-t-shirt',
        name: 'White Polo T-Shirt - Classic',
        category: 'Top Wear',
        price: 799,
        rating: 4.6,
        reviewCount: 6000,
        image: '/products/White Polo T-Shirt - Classic.jpg',
        description: 'Elegant white polo for semi-formal looks.',
        specs: ['Pique fabric', 'Ribbed collar', 'Side slits']
    },
    {
        id: 'checked-casual-shirt',
        name: 'Checked Casual Shirt - Flannel',
        category: 'Top Wear',
        price: 1599,
        rating: 4.1,
        reviewCount: 800,
        image: '/products/Checked Casual Shirt - Flannel.png',
        description: 'Cozy flannel shirt for chilly days.',
        specs: ['Pure cotton', 'Double pocket', 'Soft finish']
    },
    {
        id: 'printed-t-shirt',
        name: 'Printed Graphic T-Shirt - Urban Style',
        category: 'Top Wear',
        price: 649,
        rating: 4.3,
        reviewCount: 3000,
        image: '/products/Printed Graphic T-Shirt - Urban Style.png',
        description: 'Express your style with trendy graphics.',
        specs: ['Screen printed', 'Compact cotton', 'Modern fit']
    },

    // --- Footwear & Accessories (5) ---
    {
        id: 'running-shoes-men',
        name: 'Running Shoes for Men - Lightweight Performance',
        category: 'Footwear',
        price: 2499,
        rating: 4.4,
        reviewCount: 12000,
        image: '/products/Running Shoes for Men - Lightweight Performance.png',
        description: 'Designed for comfort and speed.',
        specs: ['EVA sole', 'Mesh upper', 'Anti-slip']
    },
    {
        id: 'casual-sneakers-white',
        name: 'Casual Sneakers for Men - Minimal White',
        category: 'Footwear',
        price: 1899,
        rating: 4.5,
        reviewCount: 5000,
        image: '/products/Casual Sneakers for Men - Minimal White.png',
        description: 'Clean white sneakers for any outfit.',
        specs: ['Synthetic leather', 'Cushioned insole', 'Clean finish']
    },
    {
        id: 'sports-socks-p3',
        name: 'Sports Socks (Pack of 3) - Cushioned',
        category: 'Accessories',
        price: 449,
        rating: 4.6,
        reviewCount: 3500,
        image: '/products/Sports Socks (Pack of 3) - Cushioned.png',
        description: 'Stay fresh and comfortable all day.',
        specs: ['Antimicrobial', 'Sweat absorption', 'Arch support']
    },
    {
        id: 'leather-belt-black',
        name: 'Leather Belt for Men - Genuine Black',
        category: 'Accessories',
        price: 899,
        rating: 4.2,
        reviewCount: 1500,
        image: '/products/Leather Belt for Men - Genuine Black.png',
        description: 'Classic genuine leather belt for formal wear.',
        specs: ['Genuine leather', 'Zinc alloy buckle', 'Adjustable length']
    },
    {
        id: 'backpack-laptop',
        name: 'Laptop Backpack - 15.6 inch Professional',
        category: 'Accessories',
        price: 1999,
        rating: 4.7,
        reviewCount: 10000,
        image: '/products/Laptop Backpack - 15.6 inch Professional.png',
        description: 'Secure and organized backpack for work.',
        specs: ['Water resistant', 'USB charging port', 'Padded laptop sleeve']
    },

    // --- Electronics & Accessories (7) ---
    {
        id: 'wired-headphones',
        name: 'Wired Headphones - Deep Bass',
        category: 'Electronics',
        price: 799,
        rating: 4.1,
        reviewCount: 20000,
        image: '/products/Wired Headphones - Deep Bass.png',
        description: 'Classic wired headphones for everyday listening.',
        specs: ['40mm drivers', 'Inline mic', 'Adjustable headband']
    },
    {
        id: 'wireless-bluetooth-headphones',
        name: 'Wireless Bluetooth Headphones - Noise Cancelling',
        category: 'Electronics',
        price: 4999,
        rating: 4.5,
        reviewCount: 8000,
        image: '/products/Wireless Bluetooth Headphones - Noise Cancelling.png',
        description: 'Premium noise-cancelling wireless headphones.',
        specs: ['Active Noise Cancellation', '40hr Battery life', 'Bluetooth 5.2']
    },
    {
        id: 'realme-buds-tws',
        name: 'Realme Buds Air 5 Pro TWS Earbuds',
        category: 'Electronics',
        price: 4999,
        rating: 4.6,
        reviewCount: 3000,
        image: '/products/Realme Buds Air 5 Pro TWS Earbuds.png',
        description: 'Industry-leading noise cancellation.',
        specs: ['Dual drivers', '50dB ANC', 'LDAC support']
    },
    {
        id: 'noise-tws-earbuds',
        name: 'Noise Buds VS104 TWS Earbuds',
        category: 'Electronics',
        price: 1299,
        rating: 4.3,
        reviewCount: 50000,
        image: '/products/Noise Buds VS104 TWS Earbuds.png',
        description: 'Great sound and long battery at an entry-level price.',
        specs: ['30h Playtime', '13mm drivers', 'Instacharge']
    },
    {
        id: 'power-bank-20000',
        name: 'Power Bank 20000mAh - Fast Charging',
        category: 'Electronics',
        price: 1999,
        rating: 4.4,
        reviewCount: 15000,
        image: '/products/Power Bank 20000mAh - Fast Charging.png',
        description: 'Keep your devices charged on the go.',
        specs: ['20W Fast charge', 'Triple output', 'Safety protection']
    },
    {
        id: 'usb-type-c-charger',
        name: 'USB Type-C Fast Charger - 33W',
        category: 'Electronics',
        price: 899,
        rating: 4.5,
        reviewCount: 4000,
        image: '/products/USB Type-C Fast Charger - 33W.png',
        description: 'Rapid charging for your smartphone.',
        specs: ['33W SuperVOOC', 'Heat protection', 'Compact build']
    },
    {
        id: 'phone-back-cover',
        name: 'Mobile Phone Back Cover - Matte Finish',
        category: 'Electronics',
        price: 299,
        rating: 4.2,
        reviewCount: 1000,
        image: '/products/Mobile Phone Back Cover - Matte Finish.png',
        description: 'Sleek protection for your phone.',
        specs: ['Anti-fingerprint', 'Drop protection', 'Perfect fit']
    },

    // --- Sports & Fitness (3) ---
    {
        id: 'cricket-bat-willow',
        name: 'Cricket Bat (English Willow) - Grade 1',
        category: 'Sports',
        price: 12999,
        rating: 4.8,
        reviewCount: 150,
        image: '/products/Cricket Bat (English Willow) - Grade 1.png',
        description: 'Professional grade cricket bat.',
        specs: ['English Willow', 'Lightweight pick-up', 'Premium handle']
    },
    {
        id: 'cricket-leather-ball',
        name: 'Cricket Leather Ball - Tournament Grade',
        category: 'Sports',
        price: 599,
        rating: 4.6,
        reviewCount: 800,
        image: '/products/Cricket Leather Ball - Tournament Grade.png',
        description: 'Durable leather ball for professional matches.',
        specs: ['Alum tanned', 'Four-piece', 'Water proof']
    },
    {
        id: 'badminton-racket',
        name: 'Badminton Racket - Carbon Fiber',
        category: 'Sports',
        price: 3499,
        rating: 4.7,
        reviewCount: 1200,
        image: '/products/Badminton Racket - Carbon Fiber.png',
        description: 'Lightweight racket for fast gameplay.',
        specs: ['High tension', 'Graphite frame', 'Slim shaft']
    }
];

