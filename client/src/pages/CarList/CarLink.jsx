import { Link } from "react-router-dom"
import "./CarList.css";


export default function CarLink(props) {

    return(
        <>
        <div className="box carbox">
            <p className="subtitle">Značka: {props.name}</p>
            <Link className="car-container" to={`/car/${props.id}`}>
                <p>Zobrazit auto</p>
            </Link>
            </div>
        </>
    )
}