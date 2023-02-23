import { Category } from "./categoryType";

export interface Product{
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category
    images: string[]
    bookmark?: boolean
}
