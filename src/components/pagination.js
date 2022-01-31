import React from 'react'

const Pagination = ({
  prevPage,
  nextPage,
  loading,
  isPrev,
  isNext,
  page,
  pageSize,
  total
}) => {
  return (
    <section className='pagination'>
      <button
        type='button'
        className='btn btn--blue pagination__item'
        onClick={prevPage}
        disabled={loading || !isPrev}
      >
        Prev
      </button>
      <p className='page-total'>{(page - 1) * pageSize + 1} - {Math.min((page - 1) * pageSize + pageSize, total)} of {total}</p>
      <button
        type='button'
        className='btn btn--blue pagination__item'
        onClick={nextPage}
        disabled={loading || !isNext}
      >
        Next
      </button>
    </section>
  )
}

export default Pagination
