import React, { useState, useEffect, useRef } from 'react'
import { getColors } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'

const ColorsPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [colors, setColors] = useState([])
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

  const fetchColors = async (page = 1) => {
    const { results, count } = await getColors(page)
    setTotal(count)
    setColors(results)
    setLoading(false)
  }

  useEffect(() => {
    fetchColors()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchColors(page)
  }, [page, firstLoad])

  const prevSearch = usePrevious(search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevSearch !== search) fetchColors(page, search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search, page, prevSearch])

  return (
    <>
      <section className='search'>
        <Input
          placeholder='Search colors...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </section>
      <section className='page-results'>
        {!loading &&
          <>{colors.map((item, ix) => <Card key={ix} item={item} />)}</>}
        {loading && <p className='spinner'>Loading...</p>}
      </section>
      <section className='pagination'>
        <button type='button' className='btn btn--blue pagination__item' onClick={prevPage}>Prev</button>
        <p className='page-total'>Total Colors: {total}</p>
        <button type='button' className='btn btn--blue pagination__item' onClick={nextPage}>Next</button>
      </section>
    </>
  )
}

export default ColorsPage
