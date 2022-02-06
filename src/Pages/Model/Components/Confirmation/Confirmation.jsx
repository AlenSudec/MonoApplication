import React from "react";
import { inject } from "mobx-react";
import { withRouter } from "../../../../Common/hooks/withRouter";

class Confirmation extends React.Component{
    render(){
        const EditStore = this.props.editStore;
        return(
            <>
            <div 
                className="confirmation__bg" 
                onClick={()=>{EditStore.setShowConf()}}
            ></div>
            <div className="confirmation__box">
                <h3 className="conf__title">Delete Confirmation</h3>
                <hr className="conf__line"/>
                <div className="box__text">
                    <div className="instructions">
                        <p>Are you sure you want to delete this Vehicle Make?</p>
                    </div>                
                </div>
            <div className="box__btns">
                <button 
                    className="btn btn--back" 
                    onClick={() => {EditStore.setShowConf()}}
                >
                    Back
                </button>
                <button 
                    className="btn btn--del" 
                    onClick={() => { 
                        EditStore.setShowConf(); 
                        EditStore.deleteMake(); 
                        this.props.navigate("/models") 
                    }}
                >
                    Delete
                </button>                
            </div>
        </div>
        </>
        )
    }
}

export default withRouter(inject("editStore")(Confirmation));