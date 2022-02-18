import "./Confirmation.css";
import React from "react";
import { withRouter } from "../../../../Common/hooks/withRouter";


class Confirmation extends React.Component {
    
    render(){
        
        const confStore = this.props.confStore;
        return(
            <>
                <div className="confirmation__bg" onClick={()=>{ confStore.hideConf()} }>
                </div>
                <div className="confirmation__box">
                    <h3 className="conf__title">Delete Confirmation</h3>
                    <hr className="conf__line"/>
                    <div className="box__text">
                        {confStore.onHasModels ? (
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
                            onClick={() => {confStore.hideConf()}}
                        >
                            Back
                        </button>
                        {confStore.onHasModels ? ( "" ) :
                        (
                            <button 
                                className="btn btn--del" 
                                onClick={() => { confStore.hideConf(); confStore.deleteMake();  this.props.navigate("/")}}
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </>
        )
    }
}
export default withRouter(Confirmation);