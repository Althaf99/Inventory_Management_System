import React, { useState, useMemo } from "react";
import { useTable } from "react-table";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";

let scrollBarSize;

const marginLeft = 3;

const useStyles = makeStyles((theme) => ({
  thead: {
    display: "table",
    tableLayout: "fixed",
    width: `calc(100%  - ${marginLeft}px)`,
  },
  head: {
    borderBottom: "0px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "1rem",
    lineHeight: "22px",
    color: "#808CA3",

    "&:first-child": {
      paddingLeft: "60px",
      "@media (max-width: 1330px)": {
        paddingLeft: "1.5em",
      },
    },
  },
  tbody: (props) => ({
    overflowY: "auto",
    display: "block",
  }),
  rowHeight: {
    "& .MuiTableCell-root": {
      padding: "0px 1em 0px 0px",

      "@media (max-width: 1330px)": {
        padding: "0px 1.2em 0px 0px",
      },
    },
  },
  row: {
    display: "table",
    width: `calc(100% - ${scrollBarSize}px)`,
    tableLayout: "fixed",
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: `${marginLeft}px`,
    boxShadow: "0px 1px 8px rgba(20, 46, 110, 0.1)",
    borderRadius: "10px",
    height: "60px",
  },
  rowDeleted: {
    display: "table",
    width: `calc(100% - ${scrollBarSize}px)`,
    tableLayout: "fixed",
    marginTop: "8px",
    marginBottom: "8px",
    marginLeft: `${marginLeft}px`,
    boxShadow: "0px 1px 8px rgba(20, 46, 110, 0.1)",
    borderRadius: "10px",
    height: "60px",
    fontColor: "#878787",
  },
  cell: {
    borderBottom: "0px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.875rem",
    lineHeight: "18px",
    color: "#001847",
    cursor: "default",

    "&:first-child": {
      paddingLeft: "60px",
      "@media (max-width: 1330px)": {
        paddingLeft: "1.5em",
      },
    },

    "&:last-child": {
      paddingRight: "35px",
      "@media (max-width: 1600px)": {
        paddingRight: "1.5em",
      },
    },
  },
  cellDeleted: {
    borderBottom: "0px",
    fontFamily: "Nunito",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.875rem",
    lineHeight: "18px",
    color: "#878787",
    cursor: "default",

    "&:first-child": {
      paddingLeft: "60px",
      "@media (max-width: 1330px)": {
        paddingLeft: "1.5em",
      },
    },
  },
  textTruncate: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  textTruncateTextWrap: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const scrollbarWidth = () => {
  // thanks to https://davidwalsh.name/detect-scrollbar-width
  const scrollDiv = document.createElement("div");
  scrollDiv.setAttribute(
    "style",
    "width: 100px; height: 100px; overflow: scroll; position:absolute; top:-9999px;"
  );

  document.body.appendChild(scrollDiv);

  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  return scrollbarWidth;
};

const DataTable = ({
  setState,
  hiddenColumns,
  columns,
  data,
  path,
  onClickTableRow,
  children,
  setRowData,
  textWrap,
  ...props
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
      onClickTableRow,
      initialState: {
        hiddenColumns:
          hiddenColumns?.length !== 0 ? hiddenColumns : [hiddenColumns],
      },
    });

  scrollBarSize = useMemo(() => scrollbarWidth(), []);

  const classes = useStyles(props);
  const [selectedId, setSelectedId] = useState(false);

  const handleRowClick = (idx, rowData) => {
    if (setState && setRowData) {
      setState(true);
      setRowData(rowData);
    }
    setSelectedId(idx);
    onClickTableRow && onClickTableRow(idx, rowData);
  };

  return (
    <Table>
      <TableHead className={classes.thead}>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps()}
                className={classes.head}
                style={{ width: column.render("width") }}
              >
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody {...getTableBodyProps()}>
        <div
          className={
            rows[0]?.original?.applicationName
              ? classes.rowHeight
              : classes.tbody
          }
        >
          {rows.map(
            (row, index) =>
              prepareRow(row) || (
                <Row
                  index={index}
                  row={row}
                  {...row.getRowProps()}
                  selectedId={selectedId}
                  handleRowClick={handleRowClick}
                  textWrap={textWrap}
                />
              )
          )}
        </div>
      </TableBody>
    </Table>
  );
};

const Row = ({ row, index, selectedId, handleRowClick, textWrap }) => {
  const classes = useStyles();
  //   const [hoverRef, isHovered] = useHover();

  const setRowClass = (status) => {
    // if (status === StatusType.DELETED.displayValue) {
    //   return classes.rowDeleted;
    // } else {
    //   return classes.row;
    // }
    return classes.row;
  };

  const setCellClass = (status) => {
    // if (status === StatusType.DELETED.displayValue) {
    //   return classes.cellDeleted;
    // } else {
    //   return classes.cell;
    // }

    return classes.cell;
  };

  return (
    <TableRow
      //   ref={hoverRef}
      classes={{
        root: setRowClass(
          row.values.clusterAgentId || row.values.clusterId
            ? row.values.recordState
            : row.values.status
        ),
        hover: classes.hover,
      }}
      key={index}
      hover
      selected={selectedId === index}
      {...row.getRowProps()}
      onClick={() =>
        handleRowClick(index, {
          state: row.state,
          original: row.original,
          index: row.index,
          values: row.values,
        })
      }
    >
      {row.cells.map((cell) => {
        return (
          <TableCell
            style={{ width: cell.column.width }}
            component="td"
            scope="row"
            {...cell.getCellProps()}
            classes={{
              root: setCellClass(
                row.values.clusterAgentId || row.values.clusterId
                  ? row.values.recordState
                  : row.values.status
              ),
            }}
            className={
              textWrap ? classes.textTruncateTextWrap : classes.textTruncate
            }
          >
            {cell.render("Cell")}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default DataTable;
