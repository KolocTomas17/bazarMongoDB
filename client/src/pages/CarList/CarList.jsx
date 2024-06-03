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

  return (
    <>
      <div className="car-title-container">
        <h1 className="title is-1">Seznam aut</h1>
      </div>
      <div className="CarListContainer is-flex-wrap-wrap ">
        {cars.map((car, index) => (
          <CarLink
            className="car-container"
            key={index}
            name={car.name}
            id={car._id}
          />
        ))}
      </div>
      <Link to={"/"} className="carIcon">
        <FontAwesomeIcon icon={faArrowLeft} size="2x" color="black" />
      </Link>
    </>
  );
}
