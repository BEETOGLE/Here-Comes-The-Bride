export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  sold: boolean;
  imageUrl?: string; // Imgur image URL
  imagePlaceholder?: string;
}

export const products: Product[] = [
  {
    "id": "dress-1",
    "name": "Classic White Wedding Dress",
    "category": "Wedding Dresses",
    "description": "A beautiful traditional white wedding dress with lace details.",
    "price": "$1,999",
    "sold": false,
    "imagePlaceholder": "Wedding Dress"
  },
  {
    "id": "dress-2",
    "name": "Flower Girl Pink Dress",
    "category": "Flower Girl Dresses",
    "description": "Adorable pink dress perfect for flower girls.",
    "price": "$299",
    "sold": false,
    "imagePlaceholder": "Flower Girl Dress"
  },
  {
    "id": "belt-1",
    "name": "Crystal Embellished Belt",
    "category": "Belts",
    "description": "Stunning crystal belt to accentuate your wedding dress.",
    "price": "$199",
    "sold": false,
    "imagePlaceholder": "Belt"
  },
  {
    "id": "dress-3",
    "name": "Mermaid Silhouette",
    "category": "Wedding Dresses",
    "description": "Stunning mermaid dress that hugs your curves and flares at the knee with beautiful train details.",
    "price": "$1,150",
    "imagePlaceholder": "Wedding Dress",
    "sold": false
  },
  {
    "id": "flower-1",
    "name": "Princess Flower Girl",
    "category": "Flower Girl Dresses",
    "description": "Adorable tea-length dress with a full tulle skirt and ribbon sash. Perfect for ages 4-8.",
    "price": "$199",
    "imagePlaceholder": "Flower Girl Dress",
    "sold": false
  },
  {
    "id": "flower-2",
    "name": "Lace Overlay Dress",
    "category": "Flower Girl Dresses",
    "description": "Sweet flower girl dress with lace overlay and satin ribbon. Available in multiple colors.",
    "price": "$225",
    "imagePlaceholder": "Flower Girl Dress",
    "sold": false
  },
  {
    "id": "veil-1",
    "name": "Cathedral Length Veil",
    "category": "Veils",
    "description": "Stunning cathedral-length veil with delicate lace edging. Adds a dramatic touch to any dress.",
    "price": "$299",
    "imagePlaceholder": "Veil",
    "sold": false
  },
  {
    "id": "veil-2",
    "name": "Fingertip Length Veil",
    "category": "Veils",
    "description": "Classic fingertip length veil with simple edge. Perfect for most dress styles.",
    "price": "$179",
    "imagePlaceholder": "Veil",
    "sold": false
  },
  {
    "id": "jewelry-1",
    "name": "Pearl Necklace Set",
    "category": "Jewelry",
    "description": "Elegant pearl necklace and earring set that complements any wedding dress style.",
    "price": "$149",
    "imagePlaceholder": "Jewelry",
    "sold": false
  },
  {
    "id": "hair-1",
    "name": "Crystal Hair Comb",
    "category": "Hair Pieces",
    "description": "Beautiful crystal hair comb that adds the perfect amount of sparkle to your bridal look.",
    "price": "$125",
    "imagePlaceholder": "Hair Piece",
    "sold": false
  }
]; 