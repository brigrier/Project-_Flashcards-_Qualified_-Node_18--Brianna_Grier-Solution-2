import React, {useState} from "react";
import { useNavigate } from "react-router-dom"
function CardForm({submitHandler, changeHandler, formData}) {
    const navigate = useNavigate()
    const [placeHolder, setPlaceHolder] = useState({...formData})
       if (!placeHolder.front && !placeHolder.back) {
        setPlaceHolder({
            front: "Front side of card",
            back: "Back side of card"
        })
    }
    const goToDeck = () => {
        navigate(-1);
    }
        return (
            <form onSubmit={submitHandler}>
                <label htmlFor="front" className="d-flex flex-column" >
                    Front
                    <textarea
                        id="front"
                        type="text"
                        name="front"
                        onChange={changeHandler}
                        value={formData.front}
                        placeholder={placeHolder.front}
                        required
                        className="form-control"
                    />
                </label>

                <label htmlFor="back" className="d-flex flex-column">
                    Back
                    <textarea
                        id="back"
                        type="text"
                        name="back"
                        onChange={changeHandler}
                        value={formData.back}
                        placeholder={placeHolder.back}
                        required
                        className="form-control"
                    />
                </label>  
                <button className="btn btn-sm btn-secondary mr-2" onClick={goToDeck}>Cancel</button>
                <button className="btn btn-sm btn-primary">Submit</button>                  
            </form>
        )
         }

export default CardForm