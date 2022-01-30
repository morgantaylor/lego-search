import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPartsCaregories, getPartPicture } from '../actions/actions.js'
import Card from '../components/card'
import Input from '../components/input.js'

const PartsPage = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [parts, setParts] = useState([])
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

  const handleGetPart = async (id, name) => navigate(`/parts/${id}`, { state: { partName: name } })

  const fetchParts = async (page = 1, search = '') => {
    const { results, count } = await getPartsCaregories(page, search)
    const unresolved = results.map(async (part) => {
      const results = await getPartPicture(page, part.id)
      return results
    })
    const resolved = await Promise.all(unresolved)
    const updated = results.map((part, ix) => ({ ...part, part_img_url: resolved.find(i => i.part_cat_id === part.id).part_img_url }))
    setParts(updated)
    setTotal(count)
    setLoading(false)
  }

  useEffect(() => {
    fetchParts()
    setFirstLoad(false)
  }, [])

  useEffect(() => {
    if (!firstLoad && page >= 1) fetchParts(page)
  }, [page, firstLoad])

  const prevSearch = usePrevious(search)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (prevSearch !== search) fetchParts(page, search)
    }, 1000)
    return () => clearTimeout(timer)
  }, [search, page, prevSearch])

  return (
    <>
      <section className='search'>
        <Input
          placeholder='Search parts...'
          onChange={e => setSearch(e.target.value)}
          value={search}
        />
      </section>
      <section className='page-results'>
        {!loading &&
          <>{parts.map((item, ix) => <Card key={ix} item={item} handleGetPart={handleGetPart} />)}</>}
        {loading && <p className='spinner'>Loading...</p>}
      </section>
      <section className='pagination'>
        <button type='button' className='btn btn--blue pagination__item' onClick={prevPage} disabled={loading}>Prev</button>
        <p className='page-total'>Total Response: {total}</p>
        <button type='button' className='btn btn--blue pagination__item' onClick={nextPage} disabled={loading}>Next</button>
      </section>
    </>
  )
}

export default PartsPage
