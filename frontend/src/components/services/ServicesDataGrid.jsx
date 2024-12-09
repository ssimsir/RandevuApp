import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

import useBiltekRequest from "../../services/useBiltekRequest";


export default function ServicesDataGrid() {

	const { services, loading } = useSelector((state) => state.biltek);

	const { deleteBiltek } = useBiltekRequest();

	const columns = [

		{
			field: "name",
			headerName: "Hizmet Adı",
			flex: 1.5,
		},
		{
			field: "code",
			headerName: "Hizmet Kodu",
			flex: 1,
		},
		{
			field: "price",
			headerName: "Fiyat",
			flex: 1,
		},
		{
			field: "color",
			headerName: "Renk",
			flex: 1,
			renderCell: ({ row }) => (<div style={{ backgroundColor: row?.color, margin: "5px" }}>Renk</div>),
		},
		{
			field: 'actions',
			headerName: "İşlem",
			type: 'actions',
			flex: 0.7,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={() => {
						if (window.confirm("Ürün silinecektir eminmisiniz")) {
							deleteBiltek("services", params.id)
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
					rows={services}
					columns={columns}
					localeText={{
						toolbarDensity: "Size",
						toolbarDensityLabel: "Size",
						toolbarDensityCompact: "Small",
						toolbarDensityStandard: "Medium",
						toolbarDensityComfortable: "Large",
					}}
					getRowId={(row) => row._id}
					slots={{
						toolbar: GridToolbar,
					}}
				/>
			)}
		</div>
	);
}
