import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCat, getCatById } from "../../models/Cat";
import './CatUpdateForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function CatUpdateForm() {
    //useState - vytvoreni promenne v reactu
    //nazev promenne, setter        useState(default_hodnota)
    const { id } = useParams();
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const [loaded, setLoaded] = useState();
    const [cat, setCat] = useState();
    const navigate = useNavigate();

    const load = async () => {
        const data = await getCatById(id);
        if (data.status === 500 || data.status === 404) return setLoaded(null);
        if (data.status === 200) {
            setCat(data.payload);
            setLoaded(true);
        }
    }


    const postForm = async () => {
        const cat = await updateCat(id, formData);
        if (cat.status === 200) {
            redirectToSuccessPage(cat.payload._id);
        } else {
            setInfo(cat.msg);
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

    const redirectToSuccessPage = (id) => {
        return navigate(`/cat/${id}`);
    };

    useEffect(() => {
        load();
    }, []);

    if (loaded === null) {
        return (
            <>
                <p>Kočka nebyla nalezena</p>
            </>
        )
    }

    if (!loaded) {
        return (
            <>
                <p>Načítání kočky...</p>
            </>
        )
    }

    return (
        <>
            <div className="container">
                <div className="title-container">
                    <h1 className="title is-1">Aktualizování formuláře pro kočku</h1>
                </div>
                <div className="cat-create-form">
                <form>

                <input className="input is-rounded" type="text" required name="name" placeholder="Zadejte jméno" defaultValue={cat.name} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="legs" placeholder="Zadejte počet nohou" defaultValue={cat.legs} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="text" required name="color" placeholder="Zadejte barvu" defaultValue={cat.color} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="price" placeholder="Zadejte cenu" defaultValue={cat.price} onChange={(e) => handleChange(e)} />
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