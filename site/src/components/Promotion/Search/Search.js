import React, {useEffect, useState} from 'react';
import PromotionList from 'components/Promotion/List/List'
import {Link} from 'react-router-dom'
import axios from 'axios'

import './Search.css'

const PromotionSearch = () => {
    const [promotions, setPromotions] = useState([])
    const [search, setSearch] = useState('')

  useEffect(() => {
      const params = {}
      if (search) {
          params.title_like = search
      }
    axios.get('http://localhost:5000/promotions?_embed=comments&_order=desc&_sort=id', {params})
        .then((response) => {
        setPromotions(response.data)
    
    })

  }, [search])

  return (
      <div className="promotion-search">
          <header className="promotion-search__header">
              <h1>Site Promoção</h1>

              <Link 
              to="/create" 
              className="promotion-search__header-link"
              >
              Nova Promoção
              </Link>
              
          </header>
          <input type="search" 
          className="promotion-search__input"
          placeholder="Buscar" 
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
          />
        <PromotionList promotions={promotions} loading={!promotions.length} />
      </div>
  )
}


export default PromotionSearch;