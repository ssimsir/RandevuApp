import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

import useBiltekRequest from "../../services/useBiltekRequest";


export default function ProductServicesDataGrid() {

	const { products, loading } = useSelector((state) => state.biltek);

	const rows = products.data;
   const { deleteBiltek } = useBiltekRequest();
   // const deleteProductService = React.useCallback(
   //    (id) => () => {
   //      setTimeout(() => {

   //       if (window.confirm("Ürün silinecektir eminmisiniz")){
   //          deleteBiltek("productServices", id)
   //       }
   //       console.log("delete", id)
   //        //setRows((prevRows) => prevRows.filter((row) => row.id !== id));
   //      });
   //    },
   //    [],
   //  );

   const getRowId = (row) => row._id
	const columns = [
		// {
		// 	field: "clientId",
		// 	hide: true,
		// },
		{
			field: "name",
			headerName: "Ürün Adı",
			flex:1.5,
		},
		{
			field: "quantity",
			headerName: "Stok Miktarı",
			flex:1,
		},
      {
			field: "price",
			headerName: "Fiyat",
			flex:1,
		},
		{
			field: "color",
			headerName: "Renk",
			flex:1,
			renderCell: ({ row }) => (<div style={{backgroundColor:row?.color, margin:"5px"}}>Renk</div>),
		},
      {
         field: 'actions',
			headerName: "İşlem",
         type: 'actions',
			flex:0.7,			
         getActions: (params) => [
           <GridActionsCellItem
             icon={<DeleteIcon />}
             label="Delete"
             onClick={ () => {
					if (window.confirm("Ürün silinecektir eminmisiniz")){
						deleteBiltek("products", params.id)
					}
					}}
           />,
          
         ],
       },
	];

	return (
		<div style={{ height: 400, width: "100%" }}>
			{loading ? (
				<div>Yükleniyor</div>
			) : (
				<DataGrid
					rows={rows}
					columns={columns}
					localeText={{
						toolbarDensity: "Size",
						toolbarDensityLabel: "Size",
						toolbarDensityCompact: "Small",
						toolbarDensityStandard: "Medium",
						toolbarDensityComfortable: "Large",
					}}
					getRowId={getRowId}
					slots={{
						toolbar: GridToolbar,
					}}
				/>
			)}
		</div>
	);
}
