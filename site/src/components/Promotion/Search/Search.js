import React, {useEffect, useState} from 'react';
import useApi from '../../utils/useApi'
import PromotionList from 'components/Promotion/List/List'
import {Link} from 'react-router-dom'
//import axios from 'axios'


import './Search.css'

const PromotionSearch = () => {
    
    const [search, setSearch] = useState('')
    
    // my hooks
    const [load, loadInfo] = useApi({
      url: '/promotions',
      method: 'get',
      params: {
        _embed:'comments',
        _order:'desc',
        _sort: 'id',
        title_like: search || undefined,
      },
    })

  useEffect(() => {
    load()
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
        <PromotionList 
        promotions={loadInfo.data} 
        loading={loadInfo.loading} 
        error={loadInfo.error}
        />
      </div>
  )
}


export default PromotionSearch;