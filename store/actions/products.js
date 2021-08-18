
export const REMOVE_PRODUCT ='DELETE PRODUCT';

export const deleteProduct = productId => {
    return {type: REMOVE_PRODUCT, pId: productId};
}