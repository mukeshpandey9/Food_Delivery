import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MyOrder() {
  const [orderData, setOrderData] = useState("");

  const fetchMyOrder = async () => {
    await fetch("http://localhost:3000/api/v1/user/myorderData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();
      await setOrderData(response);
    });
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div>
        <div className="container" style={{ marginTop: "7rem" }}>
          <div className="row ">
            {orderData !== {} ? (
              Array(orderData).map((data) => {
                return data.orderData
                  ? data.orderData.order_data
                      .slice(0)
                      .reverse()
                      .map((item) => {
                        return item.map((arrayData) => {
                          return (
                            <>
                              <div>
                                {arrayData.order_date ? (
                                  <div>
                                    {(data = arrayData.order_date)}
                                    <hr />
                                  </div>
                                ) : (
                                  <div className="col-lg-6 col-md-6">
                                    <div
                                      className="card mt-3"
                                      style={{
                                        width: "13rem",
                                        maxHeight: "20rem",
                                      }}
                                    >
                                      <img
                                        src={arrayData.img}
                                        className="card-img-top"
                                        alt=""
                                        style={{ height: "300px" }}
                                      />
                                      <div className="card-body">
                                        <h5 className="card-title">
                                          {arrayData.name}{" "}
                                        </h5>
                                        <div
                                          className="container w-100 p-0 d-flex flex-column"
                                          style={{ height: "25rem" }}
                                        >
                                          <span className="m-1">
                                            {arrayData.qty}
                                            {"   "} {arrayData.size}
                                          </span>

                                          <span className="m-1">{data}</span>

                                          <div className="d-inline ms-2 h-100 w-20 fs-4">
                                            Rs. {arrayData.price} /-
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </>
                          );
                        });
                      })
                  : "";
              })
            ) : (
              <div className="fs-1 d-flex align-text-center justify-content-center h-100 w-100">
                No Orders !
                <br />
                Please Order Some food
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}
