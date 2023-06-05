import React from "react";

import { TableRow, TableCell } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import styles from "../styles";
import useHover from "../../../hooks/useHover";

const Row = ({
  index,
  style,
  data: { prepareRow, items, selectedId, handleRowClick, textWrap },
}) => {
  const theme = useTheme();
  const classes = styles(theme);

  const [hoverRef, isHovered] = useHover();

  const row = items[index];
  prepareRow(row);

  return (
    <TableRow
      id={index}
      style={style}
      ref={hoverRef}
      sx={classes.row}
      hover
      selected={selectedId === index}
      {...row.getRowProps()}
      onClick={() => handleRowClick(index, row.values)}
    >
      {row.cells.map((cell) => {
        return (
          <TableCell
            style={{
              width: cell.column.width,
              ...cell.column?.cellStyles,
            }}
            component="td"
            scope="row"
            {...cell.getCellProps()}
            sx={[
              textWrap ? classes.textTruncateTextWrap : classes.textTruncate,
              row.values.isDeleted ? classes.cellDeleted : classes.cell,
            ]}
          >
            {cell.render("Cell", { isHovered })}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default Row;
