export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch,getState) => {
    const userId = getState().user.userId;
    const serverResponse = await fetch(`https://skin-care-rn-default-rtdb.firebaseio.com/orders/${userId}.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cartItems,
          totalAmount
        })
      });

    const responseData = await serverResponse.json();
    dispatch(
      {
        type: ADD_ORDER,
        orderData: { id: responseData.id, items: cartItems, amount: totalAmount }
      }
    )


  }
};
