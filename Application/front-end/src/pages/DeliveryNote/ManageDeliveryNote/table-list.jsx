import LazyLoadingTable from "../../../components/LazyLoadingTable";
import { Grid } from "@material-ui/core";

const columns = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Item Name",
    accessor: "itemName",
  },
  {
    Header: "Unit Price",
    accessor: "unitPrice",
  },
  {
    Header: "Item Color",
    accessor: "itemColor",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
    width: "15%",
  },
];

const TableList = ({ classes, tableArray }) => {
  return (
    <>
      {tableArray && tableArray.length > 0 && (
        <Grid item className={classes.listTable} xs={12}>
          <LazyLoadingTable
            columns={columns}
            data={tableArray}
            hiddenColumns={["id"]}
            maxHeightInRows={10}
            onClickTableRow={(index, row) => {
              console.log(index, row);
            }}
          />
        </Grid>
      )}
    </>
  );
};
export default TableList;
