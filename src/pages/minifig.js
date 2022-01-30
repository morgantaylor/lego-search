import React, { useState, useEffect, useRef } from 'react'
import { getMiniFigures } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'

const MinifigsPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [minifigs, setMinifigs] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)
  const usePrevious = value => {
    const ref = useRef()
    useEffect(() => {
      ref.current = value
    }, [value])
    return ref.current
  }

  const nextPage = () => setPage(p => p + 1)
  const prevPage = () => setPage(p => p - 1)

  const fetchMinifigs = async (page = 1, search = '') => {
    const { results, count } = await getMiniFigures(page, search)
    setMinifigs(results)
    setTotal(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchMinifigs()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchMinifigs(page)
  }, [page, firstLoad])

  const prevSearch = usePrevious(search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevSearch !== search) fetchMinifigs(page, search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search, page, prevSearch])

  return (
    <>
      <section className='search'>
        <Input
          placeholder='Search minifigures...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </section>
      <section className='page-results'>
        {!loading &&
          <>{minifigs.map((item, ix) => <Card key={ix} item={item} />)}</>}
        {loading && <p className='spinner'>Loading...</p>}
      </section>
      <section className='pagination'>
        <button type='button' className='btn btn--blue pagination__item' onClick={prevPage} disabled={loading}>Prev</button>
        <p className='page-total'>Total minifigures: {total}</p>
        <button type='button' className='btn btn--blue pagination__item' onClick={nextPage} disabled={loading}>Next</button>
      </section>
    </>
  )
}

export default MinifigsPage
