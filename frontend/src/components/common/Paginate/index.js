import ReactPaginate from 'react-paginate'

export const Paginate = (props) => {
  return (
    <ReactPaginate
      previousLabel={'Anterior'}
      nextLabel={'Siguiente'}
      breakLabel={'...'}
      pageCount={props.pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={2}
      onPageChange={props.onPageChange}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      activeClassName={'active'}
    />
  )
}
