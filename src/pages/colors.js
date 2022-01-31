import React, { useState, useEffect } from 'react'
import { getColors, PAGE_SIZE } from '../actions/actions.js'
import Card from '../components/card'
import Pagination from '../components/pagination.js'

const ColorsPage = () => {
  const [page, setPage] = useState(1)
  const [colors, setColors] = useState([])
  const [total, setTotal] = useState(0)
  const [isPrev, setIsPrev] = useState(true)
  const [isNext, setIsNext] = useState(true)
  const [loading, setLoading] = useState(true)
  const [firstLoad, setFirstLoad] = useState(true)

  const nextPage = () => setPage(p => p + 1)
  const prevPage = () => setPage(p => p - 1)

  const fetchColors = async (page = 1) => {
    const { results, count, next, previous } = await getColors(page)
    setTotal(count)
    setColors(results)
    setIsNext(next)
    setIsPrev(previous)
    setLoading(false)
  }

  useEffect(() => {
    fetchColors()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchColors(page)
  }, [page, firstLoad])

  return (
    <>
      <section className='page-results'>
        {loading && <p className='spinner'>Loading...</p>}
        {!loading &&
          <>{colors.map((item, ix) => <Card key={ix} item={item} />)}</>}
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

export default ColorsPage
