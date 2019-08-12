import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import * as routePaths from 'client/utils/routePaths'
import cats from 'client/utils/cats'
import CatCard from 'client/components/CatCard'

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

const RankingLink = styled.div`
  display: flex;
  justify-content: center;
  a {
    text-decoration: none;
    color: inherit;
  }
`

const Title = styled.h1`
  text-align: center;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const getRandom = max => Math.floor(Math.random() * max)

const Home = () => {
  const [updateCatScore] = useMutation(UPDATE_CAT_SCORE)

  const [leftCat, setLeftCat] = useState(cats[getRandom(cats.length)])
  const [rightCat, setRightCat] = useState(cats[getRandom(cats.length)])

  return (
    <Wrapper>
      <Title>Votez pour le chat le plus mignon !</Title>
      <Cats>
        <CatCard
          cat={leftCat}
          onClick={async () => {
            await updateCatScore({
              variables: { winnerId: leftCat.id, looserId: rightCat.id },
            })
            setLeftCat(cats[getRandom(cats.length)])
            setRightCat(cats[getRandom(cats.length)])
          }}
        />
        <CatCard
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
      <RankingLink>
        <Link to={routePaths.ranking()}>See the ranking</Link>
      </RankingLink>
    </Wrapper>
  )
}

export default Home
