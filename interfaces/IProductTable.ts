import {IProduct, IProductWithCount} from "@/interfaces/IProduct";

type ContextType = 'admin' | 'cart';

interface IProductTableBase {
    action: 'edit' | 'remove';
    context: ContextType;
    products?: IProduct[] | IProductWithCount[];
}

interface IProductTableAdmin extends IProductTableBase {
    context: 'admin';
}

interface IProductTableCart extends IProductTableBase {
    context: 'cart';
}

export type IProductTable = IProductTableAdmin | IProductTableCart;
