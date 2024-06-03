import { useParams, Link } from "react-router-dom";

export default function CreatedCat() {
    const { id } = useParams();
    return(
        <>
            <p>Kočka byla vytvořena: {id}</p>
            <Link to={`/cat/${id}`}>
                <p>Zobrazit kočku</p>
            </Link>
            <Link to={`/`}>
                <p>Domů</p>
            </Link>
        </>
    );

}