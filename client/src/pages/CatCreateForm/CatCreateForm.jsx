import { Link, redirect, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createCat } from "../../models/Cat";
import './CatCreateForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


export default function CatCreateForm() {
    //useState - vytvoreni promenne v reactu
    //nazev promenne, setter        useState(default_hodnota)
    const [formData, setFormData] = useState();
    const [info, setInfo] = useState();
    const navigate = useNavigate();

    const postForm = async () => {
        const cat = await createCat(formData);
        if (cat.status === 201) {
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
        return navigate(`/createdcat/${id}`);
    };


    return (
        <>

            <div className="container">
                <div className="title-container">
                    <h1 className="title is-1">Formulář pro vytvoření inzerátu kočky</h1>
                </div>
                <div className="cat-create-form">
                    <form className="form">

                        <input className="input is-rounded" type="text" required name="name" placeholder="Zadejte jméno" onChange={e => handleChange(e)} />
                        <input className="input is-rounded" type="number" required name="legs" placeholder="Zadejte počet nohou" onChange={e => handleChange(e)} />
                        <input className="input is-rounded" type="text" required name="color" placeholder="Zadejte barvu" onChange={e => handleChange(e)} />
                        <div className="form-controls">

                            <Link to={"/"}>
                                <FontAwesomeIcon size="2x" color="black" icon={faArrowLeft} />
                            </Link>
                            <button className="button is-light" onClick={handlePost}>
                                Vytvořit inzerát
                            </button>
                        </div>
                    </form>
                    <p>{info}</p>


                </div>
            </div>

        </>
    )
}