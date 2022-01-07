import { observer } from "mobx-react";
import MakeStore from "../../Pages/Make/Stores/MakeStore";
import Item from "../../Pages/Make/Components/Item";
import EmptyListMsg from "../EmptyListMsg";
import "./List.css";

const List = observer((props) => {
    return(
        <>
            {MakeStore.data.length !== 0 ? (
                <div className="list">
                    <div className="list__make list__make--header">
                        <div className="list__child list__child--first">Ime</div>
                         <div className="list__child">Skraćenica</div>
                    </div>
                    {props.data.map(item =>
                        <Item item = {item} key={item.docId}/>
                    )}
                </div>
            ) : (
                <EmptyListMsg msg={props.msg}/>
            )}
        </>
    )
})
export default List;