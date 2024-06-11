import { Link, useParams, useNavigate } from "react-router-dom";
import { getCatById, deleteCat } from "../../models/Cat";
import { useEffect, useState } from "react";
import "../CarView/View.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function CatView() {
    const { id } = useParams();
    const [cat, setCat] = useState();
    const [loaded, setLoaded] = useState();
    const [FormData, setFormData] = useState();
    const navigate = useNavigate();
    const [info, setInfo] = useState();

    const load = async () => {
        const data = await getCatById(id);
        if(data.status === 500 || data.status === 404) return setLoaded(null);
        if(data.status === 200) {
            setCat(data.payload);
            setLoaded(true);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if(FormData === cat.name) {
            const result = await deleteCat(id);
            if(result.status === 200){
                redirect(id);
            } else {
                setInfo(result.msg);
            }
        } else {
            setInfo("Wrong cat name");
        }
    }

    const handleChange = (e) => {
        setFormData(e.target.value);
    }

    const redirect = (id) => {
        return navigate(`/deletedcat/${id}`);
    }



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

    return(
        <>
        <h1 className="title">Informace o kočce</h1>
            <div className="content">
                <p>Kočky id: {id}</p>
                <img src={cat.img} alt="kočka" className="img"/>
                <p>Jméno: {cat.name}</p>
                <p>Počet nohou: {cat.legs}</p>
                <p>Barva: {cat.color}</p>
                <p>Cena: {cat.price}</p>
                    <form>
                        <p className="subtitle">
                            Napište jméno kočky pro smazání kočky
                        </p>
                        <input type="text" placeholder={cat.name} onChange={handleChange} className="input is-rounded" />
                        <button className="button is-light" onClick={handleDelete}>Smazat kočku</button>
                        <p>
                            {info}
                        </p>
                    </form>
                <Link to={`/updatecat/${id}` }>
                    <button className="button">Aktualizovat formulář kočky</button>
                </Link>
                <Link to={"/"}>
                    <FontAwesomeIcon size="2x" color="black" icon={faArrowLeft} className="btn"/>
                </Link>
        </div>
        
        </>
    )
}