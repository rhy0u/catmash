import React from 'react'
import { Link } from 'react-router-dom'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import styled from 'styled-components'
import cats from 'client/utils/cats'
import Table from 'client/components/Table'
import * as routePaths from 'client/utils/routePaths'

const GET_CATS = gql`
  query Cats {
    cats {
      id
      score
    }
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const CatListImage = styled.img`
  max-width: 200px;
`

const Home = () => {
  const rankedCats = useQuery(GET_CATS)

  return (
    <Wrapper>
      <h1 style={{ textAlign: 'center' }}>Ranking</h1>
      <Link to={routePaths.home()}>Go back to VS.</Link>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.TableHead>photos</Table.TableHead>
            <Table.TableHead>scores</Table.TableHead>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {!rankedCats.loading &&
            rankedCats.data.cats.map(({ id, score }) => (
              <Table.Row key={id}>
                <Table.TableCell>
                  <CatListImage src={cats.find(cat => cat.id === id).url} />
                </Table.TableCell>
                <Table.TableCell>{score}</Table.TableCell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </Wrapper>
  )
}

export default Home
