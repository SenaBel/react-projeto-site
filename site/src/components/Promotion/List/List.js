import React from 'react';
import PromotionCard from '../Card/Card'

import './List.css'

const PromotionList = ({loading, error, promotions}) => {

    if (error) {
        return <div>Algo de Errado Aconteceu</div>
    }

    if (loading || promotions === null) {

        return <div> Carregando... </div>    
    }   
    
    if (promotions.length === 0){
        return <div> Nenhum Resultado Para Esta Pesquisa </div> 
    }

        return (
            <div className="promotion-list">
                {promotions.map((promotions) => (
                <PromotionCard promotion={promotions} />
                ))}
            </div>
        )
    
    }

export default PromotionList;