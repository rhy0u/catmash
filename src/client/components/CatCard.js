import React from 'react'
import styled from 'styled-components'

const CatImage = styled.div`
  border-radius: 25%;
  border: 15px solid blue;
  height: 400px;
  width: 400px;
  background: center / cover no-repeat ${p => `url(${p.imageUrl})`};
`
const Cat = ({ cat, onClick }) => {
  return <CatImage imageUrl={cat.url} onClick={onClick} />
}

export default Cat
