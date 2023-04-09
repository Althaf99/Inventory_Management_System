import React from 'react';

import { TableRow, TableCell } from '@mui/material';

import { useStyles } from '../styles';
import useHover from '../../../hooks/useHover';

const Row = ({
  index,
  style,
  data: { prepareRow, items, selectedId, handleRowClick, textWrap },
}) => {
  const classes = useStyles();

  const [hoverRef, isHovered] = useHover();

  const row = items[index];
  prepareRow(row);

  return (
    <TableRow
      id={index}
      style={style}
      ref={hoverRef}
      className={classes.row}
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
            classes={{
              root: row.values.isDeleted ? classes.cellDeleted : classes.cell,
            }}
            className={
              textWrap ? classes.textTruncateTextWrap : classes.textTruncate
            }
          >
            {cell.render('Cell', { isHovered })}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default Row;
