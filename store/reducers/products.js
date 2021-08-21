import PRODUCTS from '../../data/dummy-data';
import { REMOVE_PRODUCT } from '../actions/products';
import { INSERT_PRODUCT } from '../actions/products';
import { UPDATE_PRODUCT } from '../actions/products';
import { SELECT_PRODUCTS } from '../actions/products';
import Product from '../../models/product';
const initialState = {
    availableProducts: [],
    userProducts: []
};
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
console.log(initialState.userProducts);
export default (state = initialState, action) => {
    switch (action.type) {
        case SELECT_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.userProducts
            }
        case INSERT_PRODUCT:
            const product = new Product(
                action.product.id,  // ovo nam reducer vraca iz baze 
                action.product.userId,
                action.product.name,
                action.product.imageUrl,
                action.product.description,
                action.product.price);
            return {
                ...state,
                availableProducts: state.availableProducts.concat(product),
                userProducts: state.userProducts.concat(product)
            }
        case UPDATE_PRODUCT:
            const index = state.userProducts.findIndex(product => product.productId === action.pId);
            const updatedProduct = new Product(
                action.pId,
                state.userProducts[index].userId,
                action.product.name,
                action.product.imageUrl,
                action.product.description,
                state.userProducts[index].price
            )
            const updatedUserProducts = [...state.userProducts]; //prvo sacuvam prethodno stanje 
            updatedUserProducts[index] = updatedProduct; // pa dodam na taj niz novi element

            const availableProdsIndex = state.availableProducts.findIndex(product => product.productId === action.pId);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[availableProdsIndex] = updatedProduct;

            return{
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            }
        case REMOVE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.productId != action.pId),
                userProducts: state.userProducts.filter(product => product.productId != action.pId)
            }
    }
    return state;
};