import PRODUCTS from '../../data/dummy-data';
import { REMOVE_PRODUCT } from '../actions/products';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.userId === 'u1')
};
console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
console.log(initialState.userProducts);
export default (state = initialState, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT:
            return {
                ...state,
                availableProducts: state.availableProducts.filter(product => product.productId != action.pId),
                userProducts: state.userProducts.filter(product => product.productId != action.pId)
            }
    }
    return state;
};