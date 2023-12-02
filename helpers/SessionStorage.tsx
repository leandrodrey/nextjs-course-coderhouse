'use client'
import {ICartItem} from "@/interfaces/ICart";

interface Cart {
    items: ICartItem[];
    totalPayment: number;
}

export const saveCartInSessionStorage = (key: string, item: Cart): void => {
    sessionStorage.setItem(key, JSON.stringify(item));
}

export const getCartFromSessionStorage = (key: string): Cart | null => {
    const storedItem = sessionStorage.getItem(key);
    if (storedItem) {
        try {
            const parsedCart: Cart = JSON.parse(storedItem);
            if ('items' in parsedCart && 'totalPayment' in parsedCart) {
                return parsedCart;
            } else {
                console.log('Invalid cart data in sessionStorage.');
            }
        } catch (error) {
            console.log('Error parsing cart data from sessionStorage:', error);
        }
    }
    return null;
};
