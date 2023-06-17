import React, { useState } from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import { useTable } from "react-table";
import memoize from "memoize-one";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { StyledEngineProvider, useTheme } from "@mui/material/styles";

import Row from "./TableRow";
import styles from "./styles";
import { generateRowKey } from "./helpers";

const PrintableTable = ({
  hiddenColumns,
  columns,
  data,
  onClickTableRow,
  isNextPageLoading,
  hasNextPage,
  loadMore,
  textWrap,
  customProps,
  ...props
}) => {
  const DEFAULT_HEIGHT = 500;

  const theme = useTheme();
  const classes = styles(theme);

  const [selectedId, setSelectedId] = useState(false);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      onClickTableRow,
      initialState: {
        hiddenColumns: hiddenColumns?.length > 0 ? [...hiddenColumns] : [],
      },
    });

  const handleRowClick = (id, rowData) => {
    setSelectedId(id);
    onClickTableRow && onClickTableRow(id, rowData);
  };

  const createItemData = memoize((prepareRow, data) => ({
    prepareRow,
    selectedId,
    items: data,
    handleRowClick: handleRowClick,
    textWrap: textWrap,
  }));

  const itemData = createItemData(prepareRow, rows, selectedId);

  const loadMoreItems = isNextPageLoading ? () => {} : loadMore;
  const itemCount = hasNextPage ? rows.length + 1 : rows.length;

  return (
    <StyledEngineProvider injectFirst>
      <InfiniteScroll
        dataLength={itemCount}
        next={loadMoreItems}
        hasMore={hasNextPage}
        loader={<p>Loading...</p>}
        // height={customProps?.height ? customProps?.height : DEFAULT_HEIGHT}
        refreshFunction={isNextPageLoading}
      >
        <Table {...getTableProps()} stickyHeader>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={classes.head}
                    style={{
                      width: column.render("width"),
                      ...column?.headerStyles,
                    }}
                  >
                    {column.render("Header")}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {data.map((item, index) => (
              <Row
                sx={classes.rows}
                index={index}
                data={itemData}
                key={generateRowKey(item)}
              />
            ))}
          </TableBody>
        </Table>
      </InfiniteScroll>
    </StyledEngineProvider>
  );
};

export default PrintableTable;
