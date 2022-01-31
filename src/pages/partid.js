import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getPart, PAGE_SIZE } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'
import Pagination from '../components/pagination.js'

const PartIDPage = () => {
  const { partId } = useParams()
  const location = useLocation()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [parts, setParts] = useState([])
  const [total, setTotal] = useState(0)
  const [isPrev, setIsPrev] = useState(true)
  const [isNext, setIsNext] = useState(true)
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

  const fetchPart = useCallback(async (page = 1, search = '') => {
    const { results, count, next, previous } = await getPart(page, partId, search)
    setParts(results)
    setTotal(count)
    setIsNext(next)
    setIsPrev(previous)
    setLoading(false)
  }, [partId])

  useEffect(() => {
    fetchPart()
    setFirstLoad(false)
  }, [fetchPart])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchPart(page)
  }, [page, firstLoad, fetchPart])

  const prevSearch = usePrevious(search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevSearch !== search) fetchPart(page, search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search, page, prevSearch, fetchPart])

  return (
    <>
      <h2 className='page-subtitle'>{location.state.partName}</h2>
      <section className='search'>
        <Input
          placeholder='Search parts...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </section>
      <section className='page-results'>
        {!loading &&
          <>{parts.map((item, ix) => <Card key={ix} item={item} />)}</>}
        {loading && <p className='spinner'>Loading...</p>}
      </section>
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        loading={loading}
        isPrev={isPrev}
        isNext={isNext}
        page={page}
        pageSize={PAGE_SIZE}
        total={total}
      />
    </>
  )
}

export default PartIDPage
