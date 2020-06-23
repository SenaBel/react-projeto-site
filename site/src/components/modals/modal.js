
import React from 'react'
import './Styles.scss'

const Modal = ({onSave, onClose = () => {}, Children }) => {
    
    return (
        <div className="modal" onClick={onClose}>
            <div className="container">

                <button className="x" onClick={onClose}></button>              
                <div className="content"> <h1> Deseja Salvar? </h1> </div>
            
                <button className="closeModal" onClick={onSave} >Sim</button>
                <button className="closeModal" onClick={onClose}>Não</button>
            </div>  
        </div>
    )            
}

export default Modal

