import { useParams, Link } from "react-router-dom";

export default function CreatedCar() {
    const { id } = useParams();
    return(
        <>
            <p>Auto bylo vytvořeno: {id}</p>
            <Link to={`/car/${id}`}>
                <p>Zobrazit auto</p>
            </Link>
            <Link to={`/`}>
                <p>Domů</p>
            </Link>
        </>
    );

}