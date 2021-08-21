import Product from "../../models/product";

export const REMOVE_PRODUCT = 'DELETE PRODUCT';
export const INSERT_PRODUCT = 'INSERT_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SELECT_PRODUCTS = 'SELECT_PRODUCTS';

export const selectProducts = () => {
    return async (dispatch, getState) => {
        const userID = getState().user.userId;
        try {

            const serverResponse = await fetch('https://skin-care-rn-default-rtdb.firebaseio.com/skinProducts.json',
                {
                    method: 'GET'
                });

            const responseData = await serverResponse.json(); // vraca objekat koji sadrzi key:value vrednosti, gde 
            // je kljuc ID proizvoda kao primarni kljuc u bazi, a value je objekat kao entitet iz baze
            console.log('-------------------------------------------')
            console.log(responseData)

            const dbProducts = [];
            for (const key in responseData) {
                dbProducts.push(
                    new Product(
                        key,
                        responseData[key].userId,
                        responseData[key].name,
                        responseData[key].imageUrl,
                        responseData[key].description,
                        responseData[key].price)
                );
            }
            dispatch({
                type: SELECT_PRODUCTS,
                products: dbProducts,
                userProducts: dbProducts.filter(product => product.userId === userID)
            })
        } catch (error) {
            console.log(error)
        }
    }
}


export const insertProduct = (name, description, imageUrl, price) => {
    return async (dispatch,getState) => {
        const userID = getState().user.userId;
        // const token = getState().user.token;
        const serverResponse = await fetch('https://skin-care-rn-default-rtdb.firebaseio.com/skinProducts.json?',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    imageUrl,
                    description,
                    price, 
                    userId: userID
                })
            });

        const responseData = await serverResponse.json();
        console.log(responseData)  // vraca 'name':'12396456586' sto je ustvari ID koji je generisao za taj entitet u bazi

        dispatch({          // ova metoda se dispathuje tek kada se sve await metode zavrse, znaci nece se dispatchovati stanje sve dok se ne zavrsi http request
            type: INSERT_PRODUCT,
            product: {
                id: responseData.name,
                name: name,
                description: description,
                imageUrl: imageUrl,
                price: price,
                userId: userID
            }
        })
    };
}

export const updateProduct = (id, name, description, imageUrl) => {
    return async (dispatch, getState) => {
        // const token = getState().user.token;
        await fetch(
            `https://skin-care-rn-default-rtdb.firebaseio.com/skinProducts/${id}.json`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    imageUrl,
                    description,
                })
            });
        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            product: {
                name: name,
                description: description,
                imageUrl: imageUrl
            }
        })
    };
}
export const deleteProduct = productId => {
    return async (dispatch,getState)  => {
        // const token = getState().user.token;
        await fetch(
            `https://skin-care-rn-default-rtdb.firebaseio.com/skinProducts/${productId}.json`,
            {
                method: 'DELETE'
            });
        dispatch({ type: REMOVE_PRODUCT, pId: productId });
    } 
}