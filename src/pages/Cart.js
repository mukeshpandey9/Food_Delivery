import React from "react";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import axios from "axios";

const Cart = () => {
  let data = useCart();
  let dispatch = useDispatchCart();
  console.log(data);
  if (data.length === 0) {
    return (
      <div className="w-100 h-100">
        <div className="d-flex text-white align-content-center justify-content-center m-5 fs-2 text-center w-100">
          The cart is empty
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      let userEmail = localStorage.getItem("userEmail");
      let res = await fetch("http://localhost:3000/api/v1/user/orderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_data: data,
          email: userEmail,
          order_date: new Date().toLocaleDateString(),
        }),
      });

      if (res.status === 200) {
        dispatch({ type: "DROP" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <>
      <table className="table table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Food</th>
            <th scope="col">Quantity</th>
            <th scope="col">Size</th>
            <th scope="col">Price</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((food, index) => (
            <tr>
              <th scope="row">{index + 1}</th>
              <td>{food.name} </td>
              <td>{food.qty} </td>
              <td>{food.size} </td>
              <td>{food.price} </td>
              <td>
                <button type="button" className="btn p-0">
                  <i
                    className="bi bi-trash"
                    onClick={() => {
                      dispatch({ type: "REMOVE", index: index });
                    }}
                  >
                    X
                  </i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h1 className="fs-2 text-white">Total Price :{totalPrice} </h1>
      </div>
      <button
        className="btn btn-sm btn-outline-warning"
        type="submit"
        onClick={handleCheckout}
      >
        Check Out
      </button>
    </>
  );
};

export default Cart;
