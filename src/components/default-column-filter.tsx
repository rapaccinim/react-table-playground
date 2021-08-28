/**
 * Component for having a defaul column filter.
 */

import { Row } from 'react-table';

// customcustom interface for the filter
export interface DefaultColumn {
  column: {
    filterValue: any,
    preFilteredRows: Row[],
    setFilter: (filterValue: any) => void
  }
}

// Define a default UI for filtering
export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter }
}: DefaultColumn) => {
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