import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateCat, getCatById } from "../../models/Cat";
import './CatUpdateForm.css';

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
            <h1 className="tittle">Aktualizování formuláře pro kočku</h1>
            <div className="cat-update-form">
            <form>

                <input className="input is-rounded" type="text" required name="name" placeholder="Zadejte jméno" defaultValue={cat.name} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="legs" placeholder="Zadejte počet nohou" defaultValue={cat.legs} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="text" required name="color" placeholder="Zadejte barvu" defaultValue={cat.color} onChange={(e) => handleChange(e)} />
                <input className="input is-rounded" type="number" required name="price" placeholder="Zadejte cenu" defaultValue={cat.price} onChange={(e) => handleChange(e)} />
                <button className="button is-light" onClick={handlePost}>
                    Aktualizovat formulář
                </button>
            </form>
            <p>{info}</p>

            <Link to={"/"}>
                <p>Domů</p>
            </Link>
            </div>
        </>
    )
}