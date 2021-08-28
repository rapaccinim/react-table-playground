/**
 * React Table library example of a custom mix of pagination and sorting features implemented in TypeScript.
 */

import React from 'react';
import { useTable, usePagination, useSortBy, Column, HeaderGroup, Row, Cell } from 'react-table';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import makeData from '../components/makeData';
import { TableBasicStyles } from '../shared/types-interfaces-styles';

// TBD: change the any type from columns and data
const Table = ({ columns, data }: { columns: Column[], data: string[] }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data,
            initialState: {
                pageIndex: 0,
                sortBy: [
                    {
                        id: 'age',
                        desc: true
                    }
                ]
            },
            // un-sorted state will not be available to columns once they have been sorted
            disableSortRemove: true,
            //disableMultiRemove: true
        },
        useSortBy,
        usePagination
    )

    // Render the UI for your table
    return (
        <>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
            </div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup:HeaderGroup<object>) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column:HeaderGroup<object>) => (
                                // Add the sorting props to control sorting. For this example
                                // we can add them into the header props
                                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    <span>{column.render('Header')}</span>
                                    {/* Add a sort direction indicator */}
                                    <span>
                                        {column.canSort && 
                                            column.isSorted
                                            ?  (column.isSortedDesc && <ArrowDropDownIcon/>) || (!column.isSortedDesc && <ArrowDropUpIcon/>)
                                            : <ArrowDropDownIcon color="disabled"/>
                                        }
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map((row:Row<object>) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell:Cell<object, any>) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export const PaginationAndSorting = () => {
    const columns = React.useMemo(
        () => [
            {
                Header: 'First Name',
                accessor: 'firstName',
            },
            {
                Header: 'Last Name',
                accessor: 'lastName',
            },
            {
                Header: 'Age',
                accessor: 'age',
            },
            {
                Header: 'Visits',
                accessor: 'visits',
            },
            {
                Header: 'Status',
                accessor: 'status',
                disableSortBy: true
            },
            {
                Header: 'Profile Progress',
                accessor: 'progress',
                disableSortBy: true
            }
        ],
        []
    )

    const data:string[] = React.useMemo<string[]>(() => makeData(50), []);

    return (
        <TableBasicStyles>
            <Table columns={columns} data={data} />
        </TableBasicStyles>
    )
}
