import { Link } from "react-router-dom"
import "./CatList.css";


export default function CatLink(props) {

    return(
        <>
        <div className="box catbox">
            <p className="subtitle">Jméno: {props.name}</p>
            <Link className="cat-container" to={`/cat/${props.id}`}>
                <p>Zobrazit kočku</p>
            </Link>
            </div>
        </>
    )
}