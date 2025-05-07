import type { ProductType } from "../types/product";

export class Product implements ProductType {
    image: {
      thumbnail: string;
      mobile: string;
      tablet: string;
      desktop: string;
    };
    name: string;
    category: string;
    price: number;
  
    constructor(
      image: { thumbnail: string; mobile: string; tablet: string; desktop: string },
      name: string,
      category: string,
      price: number
    ) {
      this.image = image;
      this.name = name;
      this.category = category;
      this.price = price;
    }
  }