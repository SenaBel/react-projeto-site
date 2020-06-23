
import React, { useState, useEffect } from 'react';
import useApi from '../../utils/useApi'
import { useHistory } from 'react-router-dom'

import Modal from '../../modals/modal'
import './Form.css'

const initialValue = {
    title: "",
    url: "",
    imageUrl: "",
    price: 0,
}

const PromotionForm = ({ id }) => {
    const [values, setValues] = useState(id ? null : initialValue)
    const [isModalVisible, setisModalVisible] = useState(false)
    const history = useHistory()


    const [load] = useApi({
        url: `/promotions/${id}`,
        method: 'get',
        onCompleted: (res) => {
            setValues(res.data)
        }
    })

    const [save, saveInfo] = useApi({
        url: id
            ? `promotions/${id}`
            : '/promotions',
        method: id ? 'put' : 'post',
        onCompleted: (res) => {
            if (!res.error) {
                history.push('/')
            }
        }
    })

    useEffect(() => {
        if (id) {
            load()
        }
    }, [id])

    function onChange(ev) {
        const { name, value } = ev.target
        //console.log({name, value})

        setValues({ ...values, [name]: value })
    }

    function onSubmit(ev) {
        ev.preventDefault()
        save({
            data: values
        })
    }

    return (
        <div>
            <h1> Site Promoção </h1>
            <h2> Nova Promoção </h2>
            {!values
                ? (
                    <div>Carregando...</div>
                ) : (
                    <form onSubmit={onSubmit}>


                        {saveInfo.loading && <span>Salvando Dados...</span>}

                        <div className="promotion-form__group">
                            <label htmlFor="title">Título</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                onChange={onChange}
                                value={values.title}
                            />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor="url">Link</label>
                            <input
                                id="url"
                                name="url"
                                type="text"
                                onChange={onChange}
                                value={values.url}
                            />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor="imageUrl">Imagem (URL)</label>
                            <input
                                id="imageUrl"
                                name="imageUrl"
                                type="text"
                                onChange={onChange}
                                value={values.imageUrl}
                            />
                        </div>

                        <div className="promotion-form__group">
                            <label htmlFor="price">Preço</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                onChange={onChange}
                                value={values.price}
                            />
                        </div>

                        <div className="app">
                            {/* <button type="submit" className=""> Salvar </button> */}

                            <button type="button" onClick={() => setisModalVisible(true)}> Salvar </button>
                            {isModalVisible ? (
                                <Modal onSave={onSubmit} onClose={() => { setisModalVisible(false) }}>  </Modal>
                            )
                                : null}

                        </div>

                    </form>

                )}

        </div>

    );
}
export default PromotionForm;