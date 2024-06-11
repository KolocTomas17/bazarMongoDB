import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCar, getCarById } from "../../models/Car";
import './CarUpdateForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CarUpdateForm() {
    //useState - vytvoreni promenne v reactu
    //nazev promenne, setter        useState(default_hodnota)
    const { id } = useParams();
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const [loaded, setLoaded] = useState();
    const [car, setCar] = useState();
    const navigate = useNavigate();

    const load = async () => {
        const data = await getCarById(id);
        if (data.status === 500 || data.status === 404) return setLoaded(null);
        if (data.status === 200) {
            setCar(data.payload);
            setLoaded(true);
        }
    }


    const postForm = async () => {
        const car = await updateCar(id, formData);
        if (car.status === 200) {
            redirectToSuccessPage(car.payload._id);
        } else {
            setInfo(car.msg);
        }
    };
    //handle - interakce s html
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handlePost = (e) => {
        e.preventDefault();
        postForm();
    };
    const redirectToSuccessPage = (id) => {
        return navigate(`/car/${id}`);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          setFormData({ ...formData, img: reader.result });
        };
        reader.onerror = (error) => {
          console.log("Error: ", error);
        };
      };

    useEffect(() => {
        load();
    }, []);

    if (loaded === null) {
        return (
            <>
                <p>Auto nebylo nalezeno</p>
            </>
        )
    }

    if (!loaded) {
        return (
            <>
                <p>Načítání auta...</p>
            </>
        )
    }

    return (
        <>
            <div className="container">
                <div className="title-container">
                    <h1 className="title is-1">Aktualizování formuláře pro auto</h1>
                </div>
                <div className="car-create-form">
                <form>

                <input className="input is-rounded" type="text" required name="name" placeholder="Zadejte značku" defaultValue={car.name} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="text" required name="color" placeholder="Zadejte barvu" defaultValue={car.color} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="text" required name="type" placeholder="Zadejte druh auta" defaultValue={car.type} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="hp" placeholder="Zadejte počet koní" defaultValue={car.hp} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="price" placeholder="Zadejte cenu" defaultValue={car.price} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="file" required name="img" placeholder="Vyberte obrázek" accept="image/*" onChange={(e) => handleImageChange(e)} />

                <Link to={"/"}>
                                <FontAwesomeIcon size="2x" color="black" icon={faArrowLeft} />
                            </Link>
                <button className="button is-light" onClick={handlePost}>
                    Aktualizovat formulář
                </button>
            </form>
            <p>{info}</p>
            </div>
            </div>
        </>
    )
}