import React, { useState, useEffect, useRef } from 'react'
import { getSets } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'

const SetsPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sets, setSets] = useState([])
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

  const fetchSets = async (page = 1, search = '') => {
    const { results, count } = await getSets(page, search)
    setSets(results)
    setTotal(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchSets()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchSets(page)
  }, [page, firstLoad])

  const prevSearch = usePrevious(search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevSearch !== search) fetchSets(page, search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search, page, prevSearch])

  return (
    <>
      <section className='search'>
        <Input
          placeholder='Search sets...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </section>
      <section className='page-results'>
        {loading && <p className='spinner'>Loading...</p>}
        {!loading &&
          <>{sets.map((item, ix) => <Card key={ix} item={item} />)}</>}
      </section>
      <section className='pagination'>
        <button type='button' className='btn btn--blue pagination__item' onClick={prevPage} disabled={loading}>Prev</button>
        <p className='page-total'>Total Sets: {total}</p>
        <button type='button' className='btn btn--blue pagination__item' onClick={nextPage} disabled={loading}>Next</button>
      </section>
    </>
  )
}

export default SetsPage
