import { ADD_PRODUCT, DELETE_PRODUCT } from "../actions/cart";
import CartItem from '../../models/cartItem';
import { ADD_ORDER } from "../actions/orders";
import { REMOVE_PRODUCT } from "../actions/products";
const initialState = {
    cartProducts: {}, // products ce biti objekat koji sadrzi key-value par, gde je key Id, a value objekat koji sadrzi name producta i amount
    sum: 0
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PRODUCT:
            const addedProduct = action.addedProduct;
            const price = addedProduct.price;
            const name = addedProduct.name;
            // ne zelim da se proizvodi u korpi ponavljaju, ako ih ima vise od 1, vec da se samo updateuje kolicina tog proizvoda u korpi
            // zato proveravam da li je proizvod vec u korpi (products iz cartProducts)

            if (state.cartProducts[addedProduct.productId]) {
                // proizvod je u korpi, treba da updateujem kolicinu
                const existingCartProduct = new CartItem(
                    state.cartProducts[addedProduct.productId].amount + 1,
                    price,
                    name,
                    state.cartProducts[addedProduct.productId].totalSum + price
                );
                return {
                    ...state,
                    cartProducts: { ...state.cartProducts, [addedProduct.productId]: existingCartProduct },
                    sum: state.sum + price
                }
            }
            else {
                //proizvod nije u korpi
                const newCartProduct = new CartItem(1, price, name, price);
                return {
                    ...state,  // kopiram na vec postojece stanje state-a novi state; generalno moze i bez ovoga, jer svakako uzimam dole stanje i za products i za sum, ali u slucaju da ne uzimam oba, morala bih da kopiram prethodni state
                    cartProducts: { ...state.cartProducts, [addedProduct.productId]: newCartProduct },  // vracam niz sa svim vec ubacenim proizvodima u korpu i uz to sasljem i key:value par gde je key ID, a value je proizvod koji je ubacen
                    sum: state.sum + price
                }
            }
        case DELETE_PRODUCT:
            const currentAmount = state.cartProducts[action.pid].amount;
            let updatedItems;
            if (currentAmount > 1) {
                // proveravam da li je kolicina tog proizvoda u korpi veca od 1, ako jeste, smanjujem broj 
                const updatedItem = new CartItem(
                    state.cartProducts[action.pid].amount - 1,
                    state.cartProducts[action.pid].price,
                    state.cartProducts[action.pid].name,
                    state.cartProducts[action.pid].totalSum - state.cartProducts[action.pid].price
                );
                updatedItems = { ...state.cartProducts, [action.pid]: updatedItem }
            }
            else {
                // ako je kolicina ==1 onda treba skroz da izbrisem iz korpe 
                updatedItems = { ...state.cartProducts };
                delete updatedItems[action.pid];
            }

            return {
                ...state,
                cartProducts: updatedItems,
                sum: state.sum - state.cartProducts[action.pid].price
            }
        case ADD_ORDER:
            return initialState;
            //ako se proizvod izbrise iz baze, ne bi trebalo da bude u korpi, jer ga vise nema, pa moram da obradim slucaj kada se izbrise proizod iz liste svih available proizvoda
        case REMOVE_PRODUCT:
            //proveravam slucaj ukoliko proizvod koji se brise uopste nije u korpi, tj. ne bude true da vrati postojece stanje
            if(!state.cartProducts[action.pId]){
                return state;
            }

            const currentProducts ={...state.cartProducts};
            const totalCartSum =   state.cartProducts[action.pId].totalSum;
            delete currentProducts[action.pId]
            return {
                ...state,
                cartProducts: currentProducts,
                sum: state.sum - totalCartSum
            }
    }
    return state;
}