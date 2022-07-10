import React, {useEffect, useState} from "react";
import './ModalStatusForm.css'
import {StatusForm} from "./StatusForm/StatusForm";


interface Props{
    show: boolean;
}

export const ModalStatusForm = ({show}:Props) =>{

    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(prev => !prev);
    }

    useEffect(()=>{
        showModal()
    },[show])

    return (
        <>
            <>
                {
                    visible &&
                    <div className="modal-status-container">
                        <button className="btn-close" onClick={showModal}>X</button>
                        <StatusForm/>
                    </div>
                }
            </>

        </>
    )

}
