import { Link, useParams } from "react-router-dom";


export default function CatDeleted() {
    const { id } = useParams();


    return (
        <>
            <p>
            Váš inzerát kočky {id} byl smazán
            </p>
            <Link to={"/"}>
            <p>
                Domů
            </p>
            </Link>
        </>
    )
}