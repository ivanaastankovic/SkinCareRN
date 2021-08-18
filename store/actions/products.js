
export const REMOVE_PRODUCT = 'DELETE PRODUCT';
export const INSERT_PRODUCT = 'INSERT_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = productId => {
    return { type: REMOVE_PRODUCT, pId: productId };
}

export const insertProduct = (name, description, imageUrl, price) => {
    return {
        type: INSERT_PRODUCT, 
        product: {
            name: name,
            description: description,
            imageUrl: imageUrl,
            price: price
        }
    };
}

export const updateProduct = (id, name, description, imageUrl) => {
    return {
        type: UPDATE_PRODUCT,
        pId:id,
        product: {
            name: name,
            description: description,
            imageUrl: imageUrl
        }
    };
}