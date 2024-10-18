import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

import useBiltekRequest from "../../services/useBiltekRequest";


export default function PatientDataGrid() {

	const { reservationPatientlists, loading } = useSelector((state) => state.reservation);
	
	const rows = reservationPatientlists;
	const { deleteBiltek } = useBiltekRequest();
	const deleteUser = React.useCallback(
		(id) => () => {
			setTimeout(() => {

				if (window.confirm("Müşteri silinecektir eminmisiniz")) {
					deleteBiltek("clients", id)
				}
				console.log("delete", id)
				//setRows((prevRows) => prevRows.filter((row) => row.id !== id));
			});
		},
		[deleteBiltek],
	);
	console.log(reservationPatientlists);
	const getRowId = (row) => row.reservationId
	const columns = [
		{
			field: "startTime",
			headerName: "#",
			flex: 1,
			valueGetter: (value) => new Date(value).toLocaleTimeString("tr-TR") ,
		},
		{
			field: "patientName",
			headerName: "Adı",
			flex: 1.2,
		},
		{
			field: "patientSurname",
			headerName: "Soyadı",
			flex: 1.2,
		},
		{
			field: "serviceName",
			headerName: "Hizmet",
			flex: 1,
		},
		{
			field: "patientPhoneNumber",
			headerName: "Telefon",
			flex: 1,
		},

		{
			field: "servicePrice",
			headerName: "Birim Fiyat",
			flex: 1,
		},
		{
			field: 'actions',
			type: 'actions',
			flex: 0.7,
			getActions: (params) => [
				<GridActionsCellItem
					icon={<DeleteIcon />}
					label="Delete"
					onClick={deleteUser(params.id)}
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
				/>
			)}
		</div>
	);
}
