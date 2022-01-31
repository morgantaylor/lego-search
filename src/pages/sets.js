import React, { useState, useEffect, useRef } from 'react'
import { getSets, PAGE_SIZE } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'
import NoResults from '../components/noResults.js'
import Pagination from '../components/pagination.js'

const SetsPage = () => {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [sets, setSets] = useState([])
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

  const fetchSets = async (page = 1, search = '') => {
    const { results, count, next, previous } = await getSets(page, search)
    setSets(results)
    setTotal(count)
    setIsNext(next)
    setIsPrev(previous)
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
          <>
            {!sets.length && <NoResults />}
            {sets.length > 0 &&
              <>{sets.map((item, ix) => <Card key={ix} item={item} />)}</>}
          </>}
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

export default SetsPage
