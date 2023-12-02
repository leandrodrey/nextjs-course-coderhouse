
export interface ICart {
    items: ICartItem[];
    totalPayment: number;
}

export interface ICartItem {
    id?: string;
    price: number;
    count: number;
}
