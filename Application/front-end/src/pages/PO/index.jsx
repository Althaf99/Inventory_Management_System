import React from "react";

import LazyLoadingTable from "../../components/LazyLoadingTable";

import OptionPanel from "./option-panel";
import useStyles from "./styles";

import usePo from "../../hooks/services/usePo";

const PurchaseOrder = () => {
  const { data: poData } = usePo();
  const classes = useStyles();

  const columns = [
    {
      Header: "ID",
      accessor: "id",
      headerStyles: { textAlign: "center", color: "red" },
      cellStyles: { textAlign: "center", color: "blue" },
    },
    {
      Header: "Item Name",
      accessor: "itemName",
      width: "75",
    },
    {
      Header: "Item Color",
      accessor: "itemColor",
      headerStyles: { color: "blue" },
      cellStyles: { color: "green" },
    },
    {
      Header: "Unit Price",
      accessor: "unitPrice",
    },
    {
      Header: "Quantity",
      accessor: "quantity",
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({
        cell: {
          row: { values },
        },
      }) => {
        return <OptionPanel />;
      },
    },
  ];

  return (
    <>
      {poData && (
        <LazyLoadingTable
          columns={columns}
          data={poData}
          hiddenColumns={["id"]}
          maxHeightInRows={10}
          onClickTableRow={(index, row) => {
            console.log(index, row);
          }}
        />
      )}
    </>
  );
};
export default PurchaseOrder;
