import { Link } from "react-router-dom";
import CatLink from "./CatLink";
import { useState, useEffect } from "react";
import { getAllCats } from "../../models/Cat";
import "./CatList.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";


export default function CatList() {
  const [cats, setCats] = useState();
  const [loaded, setLoaded] = useState(false);
  const [cart, setCart] = useState([]);

  const load = async () => {
    const data = await getAllCats();
    if (data.status === 500 || data.status === 404) return setLoaded(null);
    if (data.status === 200) {
      setCats(data.payload);
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (load === null) {
    return (
      <>
        <p>Kočky nebyly nalezeny</p>
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

  const handleAddToCart = (catId) => {
    setCart((prevCart) => [...prevCart, catId]);
  };

  const handleRemoveFromCart = (catId) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const index = newCart.indexOf(catId);
      if (index !== -1) {
        newCart.splice(index, 1);
      }
      return newCart;
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, catId) => {
      const cat = cats.find((cat) => cat._id === catId);
      return total + (cat ? cat.price : 0);
    }, 0);
  };

  return (
    <>
      <div className="cat-title-container">
        <h1 className="title is-1">Seznam koček</h1>
      </div>
      <div className="CatListContainer is-flex-wrap-wrap ">
        {cats.map((cat, index) => (
         <div key={index} className="cat-container">
         <CatLink name={cat.name} id={cat._id} price={cat.price} />
         <button
           className="button is-primary"
           onClick={() => handleAddToCart(cat._id)}
         >
           
           Přidat do košíku
         </button>
       </div>
     ))}
      </div>
      <div className="cart-container">
        <h2 className="title">Košík</h2>
        <ul>
          {cart.map((catId, index) => (
            <li className="box" key={index}>
              {cats.find((cat) => cat._id === catId).name}
              <button
                className="button is-danger"
                onClick={() => handleRemoveFromCart(catId)}
              >
               
                Odebrat
              </button>
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
