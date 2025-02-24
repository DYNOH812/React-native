import { createContext, PropsWithChildren, useContext, useState } from "react"; 
import { CartItem, Product } from "../types";
import {randomUUID} from 'expo-crypto';

type cartType = {
    items: CartItem[];
    addItem: (product: Product,size:CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number;
}

const CartContext = createContext<cartType>({
    items: [],
    addItem: () => {},
    updateQuantity: () => {},
    total: 0,
});

const CartProvider = ({children}:PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const addItem = (  product: Product, size: CartItem['size']) => {
        // if already in cart increment
    const existingItem = items.find((item) => item.product_id === product.id && item.size === size);

    if(existingItem) {
        updateQuantity(existingItem.id, 1);
        return;
    }

    const newCartItem:CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity:1

        };
        setItems([...items, newCartItem]);
        };

            // update quantity
    const updateQuantity = (itemId: string, amount: -1 | 1) => {
        const updatedItems = items.map((item) => item.id === itemId ? 
        {...item, quantity: item.quantity + amount} : item).filter((item) => item.quantity > 0);
        setItems(updatedItems);
    };

    const total = items.reduce((sum, item) => sum + item.quantity * item.product
    .price, 0);

    return(
        <CartContext.Provider value={{items, addItem, updateQuantity, total}}>
           {children}
        </CartContext.Provider>
    )
}

export default CartProvider;

export const useCart = () => useContext(CartContext);