// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import { Button } from "@mui/material";
// import { Grid } from "@material-ui/core";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// import PageLayout from "../../../components/PageLayout";
// import LabelledEditableSelect from "../../../components/LabelledEditableSelect";

// import { styles } from "./styles";

// import useItemNames from "../../../hooks/services/useItemNames";
// import useRequestNumbers from "../../../hooks/services/useRequestNumbers";
// import useColors from "../../../hooks/services/useColors";

// const ListInvoice = () => {
//   const classes = styles();

//   const [itemName, setItemName] = useState();
//   const [itemColor, setItemColor] = useState();
//   const [requestNumber, setRequestNumber] = useState();
//   const [open, setOpen] = useState(false);
//   const [list, setList] = useState(0);

//   const { data: itemColors } = useColors();
//   const { data: itemNames } = useItemNames();
//   const { data: requestNumbers } = useRequestNumbers();

//   const itemNamesArray =
//     itemNames &&
//     itemNames.length > 0 &&
//     itemNames.map(({ id, itemName }) => ({
//       name: itemName,
//       value: itemName,
//     }));

//   const itemColorsArray =
//     itemColors &&
//     itemColors.length > 0 &&
//     itemColors.map(({ id, itemColor }) => ({
//       name: itemColor,
//       value: itemColor,
//     }));

//   const requestNumbersArray =
//     requestNumbers &&
//     requestNumbers.length > 0 &&
//     requestNumbers.map(({ id, requestNumber }) => ({
//       name: requestNumber,
//       value: requestNumber,
//     }));

//   const handleSaveInvoie = () => {};

//   const handleOpenDialogBox = () => {
//     setOpen(true);
//   };

//   // useEffect(() => {
//   //   let sum = 0;
//   //   const test = requestData && requestData.map((item) => item.quantity);
//   //   test && test.forEach((element) => setList((sum += element)));
//   // }, [requestNumbersArray, itemColorsArray, itemNamesArray]);

//   return (
//     <>
//       <Grid container classes={{ container: classes.gridContainer }}>
//         <PageLayout
//           pageHeading={"Invoice"}
//           pageActions={
//             <Grid>
//               <Button
//                 id="btn-create-invoice"
//                 variant="contained"
//                 onClick={handleCreateInvoice}
//               >
//                 <AddCircleOutlineIcon className={classes.plusIcon} />
//                 {"Create Invoice"}
//               </Button>
//             </Grid>
//           }
//         >
//           <Grid container spacing={2} className={classes.topCards}>
//             <Grid item xs={2} className={classes.section}>
//               <LabelledEditableSelect
//                 label="PO Number"
//                 id="requestNum"
//                 name="requestNum"
//                 placeholder="Select PO Number"
//                 onChange={(value) => setRequestNumber(value)}
//                 value={requestNumber}
//                 items={requestNumbersArray}
//               />
//             </Grid>
//             <Grid item xs={2} className={classes.section}>
//               <LabelledEditableSelect
//                 label="Item Name"
//                 id="itemName"
//                 name="itemName"
//                 placeholder="Select Item Name"
//                 onChange={(value) => setItemName(value)}
//                 value={itemName}
//                 items={itemNamesArray}
//               />
//             </Grid>
//             <Grid item xs={2} className={classes.section}>
//               <LabelledEditableSelect
//                 label="Item Color"
//                 id="itemColor"
//                 name="itemColor"
//                 placeholder="Select Item Color"
//                 onChange={(value) => setItemColor(value)}
//                 value={itemColor}
//                 items={itemColorsArray}
//               />
//             </Grid>
//             <Grid item xs={0} className={classes.totalAmount}>
//               {list}
//             </Grid>
//           </Grid>

//           <>
//             <Grid item className={classes.section} xs={12}>
//               {requestData && (
//                 <LazyLoadingTable
//                   columns={columns}
//                   data={requestData}
//                   hiddenColumns={["id"]}
//                   maxHeightInRows={10}
//                   onClickTableRow={(index, row) => {
//                     console.log(index, row);
//                   }}
//                 />
//               )}
//             </Grid>
//           </>
//         </PageLayout>
//       </Grid>
//       <ManageRequest
//         openPurchaseOrder={openPurchaseOrder}
//         setOpenPurchaseOrder={setOpenPurchaseOrder}
//       />
//     </>
//   );
// };
// export default ListInvoice;
