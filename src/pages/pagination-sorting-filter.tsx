/**
 * A custom example with pagination + sorting + filtering implementation
 */

 import React from 'react';
 import styled from 'styled-components';
 import { useTable, usePagination, useSortBy, useFilters, Column, Row } from 'react-table';
 import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
 import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
 import makeData from '../components/makeData';
 
 const Styles = styled.div`
   padding: 1rem;
   table {
     border-spacing: 0;
     border: 1px solid black;
     tr {
       :last-child {
         td {
           border-bottom: 0;
         }
       }
     }
     th,
     td {
       margin: 0;
       padding: 0.5rem;
       border-bottom: 1px solid black;
       border-right: 1px solid black;
       :last-child {
         border-right: 0;
       }
       span {
         display: inline-block;
         vertical-align: middle;
         svg {
             vertical-align: middle;
           }
       }
     }
   }
   .pagination {
     padding: 0.5rem;
   }
 `;

// use this custom interface for the filter
interface DefaultColumn {
    column : {
        filterValue: any,
        preFilteredRows: Row[],
        setFilter: (filterValue:any) =>void
    }
}

 // Define a default UI for filtering
const DefaultColumnFilter = ({
    column: { filterValue, preFilteredRows, setFilter }
  }:DefaultColumn) => {
    return (
      <input
        value={filterValue || ""}
        onChange={(e) => {
          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
        }}
        placeholder="Search..."
      />
    );
  }
 
 // TBD: change the any type from columns and data
 const Table = ({ columns, data }: { columns: any, data: any }) => {

    const defaultColumn = React.useMemo(
        () => ({
          // Let's set up our default Filter UI
          Filter: DefaultColumnFilter
        }),
        []
      );

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
             disableSortRemove: true, // un-sorted state will not be available to columns once they have been sorted
             defaultColumn  // this is for filtering
         },
         useFilters, // Important! Place the useFilters before useSortBy and usePagination hooks!
         useSortBy,
         usePagination,
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
                     {headerGroups.map(headerGroup => (
                         <tr {...headerGroup.getHeaderGroupProps()}>
                             {headerGroup.headers.map(column => (
                                 // Add the sorting props to control sorting. For this example
                                 // we can add them into the header props
                                 <th >
                                    {/* Render the columns filter UI */}
                                    <div>{column.canFilter ? column.render("Filter") : null}</div>

                                     <div {...column.getHeaderProps(column.getSortByToggleProps())}>
                                     <span>{column.render('Header')}</span>
                                     {/* Add a sort direction indicator */}
                                     <span>
                                         {column.canSort && 
                                             column.isSorted
                                             ?  (column.isSortedDesc && <ArrowDropDownIcon/>) || (!column.isSortedDesc && <ArrowDropUpIcon/>)
                                             : <ArrowDropDownIcon color="disabled"/>
                                         }
                                     </span>
                                     </div>

                                 </th>
                             ))}
                         </tr>
                     ))}
                 </thead>
                 <tbody {...getTableBodyProps()}>
                     {page.map((row, i) => {
                         prepareRow(row)
                         return (
                             <tr {...row.getRowProps()}>
                                 {row.cells.map(cell => {
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
 
 export const PaginationSortingFilter = () => {
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
                 disableFilters: true
             },
             {
                 Header: 'Visits',
                 accessor: 'visits',
                 disableFilters: true
             },
             {
                 Header: 'Status',
                 accessor: 'status',
                 disableSortBy: true
             },
             {
                 Header: 'Profile Progress',
                 accessor: 'progress',
                 disableSortBy: true,
                 disableFilters: true
             }
         ],
         []
     )
 
     const data = React.useMemo(() => makeData(100), [])
 
     return (
         <Styles>
             <Table columns={columns} data={data} />
         </Styles>
     )
 }
 