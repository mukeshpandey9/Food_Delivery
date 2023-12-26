import React, { useEffect, useRef, useState } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

const Card = (props) => {
  let options = props.options;
  let price = Object.keys(options);

  let data = useCart();

  let dispatch = useDispatchCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  let priceRef = useRef();

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const addToCartHandler = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          img: props.foodItem.img,
          size: size,
        });
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      img: props.foodItem.img,
      size: size,
    });
  };

  return (
    <>
      <div>
        <div className="card pb-3" style={{ width: "18rem" }}>
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="food"
            style={{ width: "100%", height: "250px" }}
          />
          <div className="card-body">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <p className="card-text fs-6">{props.foodItem.description}</p>
          </div>

          <div className="container w-100">
            <select
              name=""
              className="m-2 h-100 rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return <option key={i + 1}>{i + 1}</option>;
              })}
            </select>

            <select
              name=""
              className="m-2 h-100 rounded"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {price.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <span>₹{finalPrice} /-</span>
            <hr />
            <button
              className="btn btn-sm btn-warning text-white w-100"
              type="submit"
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
