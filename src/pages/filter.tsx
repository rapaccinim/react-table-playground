/**
 * React Table library example of filtering feature implemented in TypeScript.
 * JS basic input examples are coming from tannerlinsley's repo: https://github.com/tannerlinsley/react-table/tree/master/examples/filtering
 */

import React from "react";
import { useTable, useFilters, Column, Cell, Row, HeaderGroup } from "react-table";
import makeData from "../components/makeData";
import { TableBasicStyles } from "../shared/types-interfaces-styles";
import { DefaultColumnFilter } from "../components/default-column-filter";

const Table = ({ columns, data } : { columns:Column[], data:string[] }) => {

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
    },
    useFilters // useFilters!
  );

  // do not render all the rows for this example, just 10 is ok
  const firstPageRows = rows.slice(0, 10);

  return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup:HeaderGroup<object>) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column:HeaderGroup<object>) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}

        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row:Row<object>) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell:Cell<object, any>) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
  );
}

export const Filter = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "First Name",
        accessor: "firstName"
      },
      {
        Header: "Last Name",
        accessor: "lastName"
      }
    ],
    []
  );

  const data:string[] = React.useMemo<string[]>(() => makeData(50), []);

  return (
    <TableBasicStyles>
      <Table columns={columns} data={data} />
    </TableBasicStyles>
  );
}