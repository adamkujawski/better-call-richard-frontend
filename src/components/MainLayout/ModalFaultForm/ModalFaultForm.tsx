import React, {useEffect, useState} from "react";
import {FaultForm} from "./FaultForm/FaultForm";
import "./ModalFaultForm.css"

interface Props {
    addFault: () => boolean;
}

export const ModalFaultForm = ({addFault} : Props) =>{



    return (
        <>
            {

                <div className="modal-fault-container">
                    <button className="btn-close" onClick={addFault}>X</button>
                    <FaultForm/>

                </div>

            }


        </>
    )
}
