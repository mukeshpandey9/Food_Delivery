import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "../styles/home.css";
import axios from "axios";

const Home = () => {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  // UserData

  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const loadData = async () => {
    let response = await fetch("http://localhost:3000/api/v1/user/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
      <div className="mb-5">
        <Navbar />
      </div>

      {/* Caurosel */}
      <div style={{ marginTop: "4rem" }}>
        <div
          id="carouselExampleRide"
          className="carousel slide carousel-fade"
          data-bs-ride="true"
        >
          <div className="carousel-inner" role="listbox" id="carousel">
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: "10" }}
            >
              <div className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="carousel-item active">
              <img
                src="https://img.freepik.com/free-photo/exploding-burger-with-vegetables-melted-cheese-black-background-generative-ai_157027-1734.jpg?w=826&t=st=1687584290~exp=1687584890~hmac=ec49d27b19d5c7fe93e1cb79e8b1481ce070659182a83159274aceae488bd0f1"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?w=740&t=st=1687584319~exp=1687584919~hmac=6262afef61315c1681c316e53dfc746549c5e75e099fa5e7f4600680eebf5c0a"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
            <div className="carousel-item">
              <div style={{ filter: "brightness(30%)" }}>
                <img
                  src="https://img.freepik.com/free-photo/chicken-skewers-with-slices-sweet-peppers-dill_2829-18813.jpg?w=740&t=st=1687584363~exp=1687584963~hmac=0c6af83d5a1dcf20fddb595b0b60419800ef0e9648ebabed1e9a353e01bd2a82"
                  className="d-block w-100"
                  style={{ filter: "brghtness(30%)" }}
                  alt="GoFood"
                />
              </div>
            </div>

            <div className="carousel-item">
              <img
                src="https://img.freepik.com/free-photo/club-sandwich-with-side-french-fries_140725-1744.jpg?w=740&t=st=1687584422~exp=1687585022~hmac=217462a0a1e20be5cd70d73b990987a91ef52f0745e3159162004f16ef5c4c9e"
                className="d-block w-100"
                alt="..."
                style={{ filter: "brightness(30%)" }}
              />
            </div>
          </div>

          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleRide"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((data) => {
            return (
              <div className="row">
                <div key={data._id} className="fs-2 m-4">
                  {data.CategoryName}{" "}
                </div>
                <hr />
                {foodItem !== [] ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-lg-4 col-md-6 my-5"
                        >
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div className="fs-1 text-center">No such Data Found</div>
                )}
              </div>
            );
          })
        ) : (
          <div>********</div>
        )}
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
