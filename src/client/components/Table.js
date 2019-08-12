import styled from 'styled-components'

const Table = styled.table`
  width: 100%;
`

Table.Head = 'thead'
Table.Body = styled.tbody`
  > tr:nth-child(even) {
    background-color: #e4f0f5;
  }
`
Table.Row = styled.tr`
  margin: 0 16px;
`
Table.TableHead = 'th'
Table.TableCell = styled.td`
  margin: 0 16px;
  border: none;
`

export default Table
