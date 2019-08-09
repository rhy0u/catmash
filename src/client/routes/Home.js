import React, { useState } from 'react'
import cats from 'client/utils/cats'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const UPDATE_CAT_SCORE = gql`
  mutation UpdateCatScore($winnerId: ID!, $looserId: ID!) {
    updateCatScore(winnerId: $winnerId, looserId: $looserId) {
      id
      score
    }
  }
`

const Cats = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const Title = styled.h1`
  text-align: center;
`
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const CatImage = styled.div`
  border-radius: 25%;
  border: 15px solid blue;
  height: 400px;
  width: 400px;
  background: center / cover no-repeat ${p => `url(${p.imageUrl})`};
`

const getRandom = max => Math.floor(Math.random() * max)

const Cat = ({ cat, onClick }) => {
  return <CatImage imageUrl={cat.url} onClick={onClick} />
}

const Home = () => {
  const [updateCatScore] = useMutation(UPDATE_CAT_SCORE)

  const [leftCat, setLeftCat] = useState(cats[getRandom(cats.length)])
  const [rightCat, setRightCat] = useState(cats[getRandom(cats.length)])

  return (
    <Wrapper>
      <Title>Votez pour le chat le plus mignon !</Title>
      <Cats>
        <Cat
          cat={leftCat}
          onClick={async () => {
            await updateCatScore({
              variables: { winnerId: leftCat.id, looserId: rightCat.id },
            })
            setLeftCat(cats[getRandom(cats.length)])
            setRightCat(cats[getRandom(cats.length)])
          }}
        />
        <Cat
          cat={rightCat}
          onClick={async () => {
            await updateCatScore({
              variables: { winnerId: leftCat.id, looserId: rightCat.id },
            })
            setLeftCat(cats[getRandom(cats.length)])
            setRightCat(cats[getRandom(cats.length)])
          }}
        />
      </Cats>
    </Wrapper>
  )
}

export default Home
