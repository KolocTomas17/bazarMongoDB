import { Link } from "react-router-dom";
import CarLink from "./CarLink";
import { useState, useEffect } from "react";
import { getAllCars } from "../../models/Car";
import "./CarList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function CarList() {
  const [cars, setCars] = useState();
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  const load = async () => {
    const data = await getAllCars();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCars(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (load === null) {
    return (
      <>
        <p>Auta nebyla nalezena</p>
      </>
    );
  }
  if (!loaded) {
    return (
      <>
        <p>Jejda, prozatím tu nic není :/ </p>
      </>
    );
  }

  const handleAddToCart = (carId) => {
    setCart((prevCart) => [...prevCart, carId]);
  };

  const handleRemoveFromCart = (carId) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const index = newCart.indexOf(carId);
      if (index !== -1) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, carId) => {
      const car = cars.find((car) => car._id === carId);
      return total + (car ? car.price : 0);
    }, 0);
  };

  return (
    <>
<div className="cat-title-container">
        <h1 className="title is-1">Seznam aut</h1>
      </div>
      <div className="CatListContainer is-flex-wrap-wrap ">
        {cars.map((car, index) => (
         <div key={index} className="cat-container">
            <img className="cat-img" src={car.img} alt="Car" />
         <CarLink name={car.name} id={car._id} price={car.price} />
         <button
           className="button is-primary"
           onClick={() => handleAddToCart(car._id)}
         >
           
           Přidat do košíku
         </button>
       </div>
     ))}
      </div>
      <div className="cart-container">
        <h2 className="title">Košík</h2>
        <ul>
          {cart.map((carId, index) => (
            <li className="box boxik" key={index}>
              {cars.find((car) => car._id === carId).name}
              <img className="small-cat" src={cars.find((car) => car._id === carId).img} alt="car" />
              <div className="btn">
              <button
                className="button is-danger btn"
                onClick={() => handleRemoveFromCart(carId)}
              >
               
                Odebrat
              </button>
              </div>
             <carId className="price">{cars.find((car) => car._id === carId).price}Kč</carId>
            </li>
          ))}
          
        </ul>
        <div className="total-price title is-5">
          <h3>Celková cena: {calculateTotalPrice()} Kč</h3>
          <button className="button is-danger">zaplatit</button>
        </div>
      </div>
      <Link to={"/"} className="catIcon">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" color="black" />
      </Link>
    </>
  );
}
