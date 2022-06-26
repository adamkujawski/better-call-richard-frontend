import React, {useEffect, useState} from "react";
import {FaultForm} from "../FaultForm/FaultForm";
import "./ModalFaultForm.css"

interface Props{
    show: boolean;
}

export const ModalFaultForm = ({show}: Props) =>{

    const [visible, setVisible] = useState(false);

     const showModal = () => {
        setVisible(prev => !prev);
     }

     useEffect(()=>{
         showModal()
     },[show])


    return (
        <>
            {
                visible &&
                <div className="modal-container">
                    <button className="btn-close" onClick={showModal}>X</button>
                    <FaultForm/>

                </div>

            }


        </>
    )
}
