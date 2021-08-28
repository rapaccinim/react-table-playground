/**
 * React Table library example of sorting feature implemented in TypeScript.
 * JS basic input examples are coming from tannerlinsley's repo: https://github.com/tannerlinsley/react-table/tree/master/examples/sorting
 */

import React from 'react'
import { useTable, useSortBy, Column, HeaderGroup, Row, Cell } from 'react-table'
import { TableBasicStyles } from '../../shared/types-interfaces-styles'
import makeData from '../makeData'

const Table = ({ columns, data }:{columns:Column[], data:string[]}) => {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      // the following initialState is necessary for having the default sorting by age
      initialState: {
          sortBy: [
              {
                  id: 'age',
                  desc: true
              }
          ]
      }
    },
    useSortBy
  )

  // do not render all the rows for this example, just 20 is ok
  const firstPageRows = rows.slice(0, 20)

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup:HeaderGroup<object>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column:HeaderGroup<object>) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? (column.isSortedDesc && ' 🔽') || ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map(
            (row:Row<object>) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell:Cell<object, any>) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </table>
      <br />
      <div>Showing the first 20 results of {rows.length} rows</div>
    </>
  )
}

export const Sorting = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
        ],
      },
      {
        Header: 'Info',
        columns: [
          {
            Header: 'Age',
            accessor: 'age',
            sortDescFirst: true
          },
          {
            Header: 'Visits',
            accessor: 'visits',
          },
          {
            Header: 'Status',
            accessor: 'status',
          },
          {
            Header: 'Profile Progress',
            accessor: 'progress',
          },
        ],
      },
    ],
    []
  )

  const data = React.useMemo<string[]>(() => makeData(50), [])

  return (
    <TableBasicStyles>
      <Table columns={columns} data={data} />
    </TableBasicStyles>
  )
}

