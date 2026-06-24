const restaurant = {
  name: "Burger House",
  rating: 4.1,
  reviewCount: 317,
  description: "Die besten Burger, Pizza und Salate alles an einem Ort.",
  deliveryFee: 4.99,
  heroImage: "img/hero.jpg",
  restaurantLogo: "img/logo_round.png",
};

const menu = [
  {
    id: "burger",
    name: "Burger",
    icon: "",
    dishes: [
      {
        id: 1,
        name: "Veggie Mushroom Black Burger",
        price: 16.90,
        description: "Gemischter Salat, Tomaten, Edamame, Pilze",
        image: "img/dish_1.jpg",
      },
      {
        id: 2,
        name: "All Meat Burger",
        price: 15.90,
        description: "Rindfleisch, Bacon, Dill-Gurken, Räucherkäse, Ketchup, BBQ-Sauce",
        image: "img/dish_2.jpg",
      },
      {
        id: 3,
        name: "Beef Red Burger",
        price: 14.90,
        description: "Rindfleisch, Käse, Tomaten, Salat, Zwiebeln",
        image: "img/dish_3.jpg",
      },
      {
        id: 4,
        name: "Big Chicken Burger",
        price: 15.90,
        description: "Hähnchen, Käse, Tomaten, Salat, Zwiebeln, Paprika",
        image: "img/dish_4.jpg",
      },
    ],
  },
  {
    id: "pizza",
    name: "Pizza (30cm)",
    icon: "",
    dishes: [
      {
        id: 5,
        name: "Pizza Margherita",
        price: 11.90,
        description: "Tomatensauce, Mozzarella",
        image: "img/dish_5.jpg",
      },
      {
        id: 6,
        name: "Pizza Chorizo",
        price: 13.90,
        description: "Tomatenscheiben, Mozzarella, Chorizo",
        image: "img/dish_6.jpg",
      },
      {
        id: 7,
        name: "Funghi",
        price: 12.90,
        description: "Rote Zwiebeln, Oliven, Champignons, Mozzarella",
        image: "img/dish_7.jpg",
      },
      {
        id: 8,
        name: "Quattro Formaggi mit Hähnchen",
        price: 15.90,
        description: "Hähnchen, Mozzarella, Gorgonzola, Fontina, Parmigiano Reggiano",
        image: "img/dish_8.jpg",
      },
    ],
  },
  {
    id: "salad",
    name: "Salate",
    icon: "",
    dishes: [
      {
        id: 9,
        name: "Warmer Rindfleisch-Rucola-Salat",
        price: 16.90,
        description: "Rindfleisch, Rucola, Feldsalat, griechischer Feta, Kirschtomaten, getrocknete Tomaten, Balsamico-Dressing",
        image: "img/dish_9.jpg",
      },
      {
        id: 10,
        name: "Mini Green Salad",
        price: 7.90,
        description: "Grüner Salat, Gurke, Karotten, Petersilie, Radieschen",
        image: "img/dish_10.jpg",
      },
      {
        id: 11,
        name: "Grüner Salat mit Meeresfrüchten",
        price: 16.90,
        description: "Gemischte Blattsalate, Kirschtomaten, rote Zwiebeln, Muscheln, Tintenfischringe, Garnelen, Dill-Zitronen-Dressing",
        image: "img/dish_11.jpg",
      },
      {
        id: 12,
        name: "Veganer Grüner Salat mit Tofu",
        price: 14.90,
        description: "Grüner Salat, Kirschtomaten, Gurke, Babyspinat, Edamame, Radieschen, Brunnenkresse, Tofu, Erdnüsse",
        image: "img/dish_12.jpg",
      },
    ],
  },
];
