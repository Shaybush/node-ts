import { basket, TechItem } from "../stub/basket.stub";

const getBasket = (): TechItem[] => {
    try {
        return basket;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

/**
 * TODO - add the following services:
 *  **deleteItem** - params: id should delete id from the list
 *  **editItem** - params: id body: { name, category, brand, price, quantity }
 *  should edit item
 *  **addItem** - body: { name, category, brand, price, quantity }
 *  */

export { getBasket }