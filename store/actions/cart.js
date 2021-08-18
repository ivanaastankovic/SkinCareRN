export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const addProduct = product => {
    return {type: ADD_PRODUCT, addedProduct:product} 
}

export const deleteProduct = productId => {
    return { type: DELETE_PRODUCT, pid: productId };
  };