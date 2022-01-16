import "./Confirmation.css";
import EditStore from "../../Stores/EditStore";
import { useNavigate } from "react-router-dom";

const Confirmation = () => {
    const navigate = useNavigate();
    return (
    <>
        <div className="confirmation__bg" onClick={()=>{ EditStore.setShowConf()} }>
        </div>
        <div className="confirmation__box">
            <h3 className="conf__title">Delete Confirmation</h3>
            <hr className="conf__line"/>
            <div className="box__text">
                {EditStore.hasModels ? (
                    <div className="instructions">
                        <p className="warning">This Vehicle Make currently has Vehicle Models that are connected to it.</p>
                        <p>To be able to delete this Vehicle Make, all Vehicle Models that are connected with this Make have to be deleted.</p>
                    </div>
                    
                ) : (
                    <div className="instructions">
                        <p className="goahead">There are no Vehicle Models connected to this Vehicle Make.</p>
                        <p>You can now safely delete this Vehicle Make.</p>
                    </div>
                )}
                
            </div>
            <div className="box__btns">
                <button 
                    className="btn btn--back" 
                    onClick={() => {EditStore.setShowConf()}}
                >
                    Back
                </button>
                {EditStore.hasModels ? ( "" ) :
                (
                    <button 
                        className="btn btn--del" 
                        onClick={() => { EditStore.setShowConf(); EditStore.deleteMake(); navigate("/") }}
                    >
                        Delete
                    </button>
                )}
                
            </div>
        </div>
    </>
    );
}
export default Confirmation;