import { getBasketRepository } from "../repositories/basket.repository";
import { TechItem } from "../stub/basket.stub";

const getBasket = async (): Promise<TechItem[]> => {
    try {
        const basketRepository = getBasketRepository();
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const addItem = async (item: TechItem) => {
    try {
        const basketRepository = getBasketRepository();
        await basketRepository.addItem(item);
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const deleteItem = async (id: number) => {
    try {
        const basketRepository = getBasketRepository();
        const isDeleted = await basketRepository.deleteItem(id);
        if (!isDeleted) {
            throw new Error('Item not found');
        }
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const editItem = async (id: number, item: TechItem) => {
    try {
        const basketRepository = getBasketRepository();
        await basketRepository.editItem(id, item);
        return await basketRepository.getBasket();
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { getBasket, addItem, deleteItem, editItem }