'use client'
import {ICartItem} from "@/interfaces/ICart";

export const saveCartInSessionStorage = (key: string, item: ICartItem): void => {
    sessionStorage.setItem(key, JSON.stringify(item));
}

export const getCartFromSessionStorage = (key: string): ICartItem | null => {
    const storedItem = sessionStorage.getItem(key);
    if (storedItem) {
        try {
            const parsedCart: ICartItem = JSON.parse(storedItem);
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
