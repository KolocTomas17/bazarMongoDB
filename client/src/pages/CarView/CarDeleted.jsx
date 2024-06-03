import { Link, useParams } from "react-router-dom";


export default function CarDeleted() {
    const { id } = useParams();


    return (
        <>
            <p>
                Váš inzerát auta {id} byl smazán
            </p>
            <Link to={"/"}>
            <p>
                Domů
            </p>
            </Link>
        </>
    )
}