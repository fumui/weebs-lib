import React,{Fragment} from 'react';
const Pagination = (props) => {
  return(
    <Fragment>
      <Button className="btn btn-warning" 
      disabled={props.page === 1}
      onClick={()=>{props.pageHandler(-1)}}
      >
        {'<'}
      </Button>
      <Button variant="warning">{props.page}</Button>
      <Button className="btn btn-warning" onClick={()=>{props.pageHandler(+1)}}>{'>'}</Button>
    </Fragment>
  )
}