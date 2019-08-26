import React,{Fragment} from 'react';

const onClickPlus = () =>{
  const curr = window.location.href
  let newHref = window.location.origin
  const containsSearchQuery = curr.includes('?')
  const containsPageQuery = curr.includes('page')
  if(containsPageQuery){
    let index = curr.indexOf("page")
    let nextPage = Number(curr.charAt( (index+5) )) + 1
    newHref = curr.replace(curr.substr(index, 6),`page=${nextPage}`)
  }else if(containsSearchQuery){
    newHref = curr.concat('&page=2')
  }else{
    newHref = curr.concat('?page=2')
  }
  window.location.href = newHref
}

const onClickMinus = () =>{
  const curr = window.location.href
  let index = curr.indexOf("page")
  let prevPage = Number(curr.charAt( (index+5) )) - 1
  let newHref = curr.replace(curr.substr(index, 6),`page=${prevPage}`)
  window.location.href = newHref
}

const getNextPageUrl = () =>{
  const curr = window.location.search
  let newHref = window.location.origin
  const containsSearchQuery = curr.includes('?')
  const containsPageQuery = curr.includes('page')
  if(containsPageQuery){
    let index = curr.indexOf("page")
    let nextPage = Number(curr.charAt( (index+5) )) + 1
    newHref = curr.replace(curr.substr(index, 6),`page=${nextPage}`)
  }else if(containsSearchQuery){
    newHref = curr.concat('&page=2')
  }else{
    newHref = curr.concat('?page=2')
  }
  return newHref
}

const getPrevPageUrl = () =>{
  const curr = window.location.search
  let index = curr.indexOf("page")
  let prevPage = Number(curr.charAt( (index+5) )) - 1
  return curr.replace(curr.substr(index, 6),`page=${prevPage}`)
}

export default function Pagination({ match }){
  console.log(match)
  const params= window.location.search
  const hasPrevPage = !params.includes("page") || params.includes("page=1")
  const page = params.includes("page") ? params.charAt(params.indexOf("page") + 5) : 1
  return(
    <Fragment>
    </Fragment>
  )
}