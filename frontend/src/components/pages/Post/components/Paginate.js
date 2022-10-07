import React from 'react'
import { Button } from 'react-bootstrap'

export const Paginate = (props) => {
  const { handleClickPrev, handleClickNext, prevPage, nextPage } = props

  return (
    <div className="text-center">
      <Button
        variant="dark"
        onClick={handleClickPrev}
        disabled={prevPage === null ? true : false}
      >
        Anterior
      </Button>{' '}
      <Button
        variant="dark"
        onClick={handleClickNext}
        disabled={nextPage === null ? true : false}
      >
        Siguiente
      </Button>
    </div>
  )
}
