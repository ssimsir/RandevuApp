import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';

import useBiltekRequest from "../../../services/useBiltekRequest";


export default function PatientsDataGrid({ patients, patientLoading, fetchPatientByPatientId }) {


	// const { patients, loading } = useSelector((state) => state.biltek);
	
	const rows = patients;
	const { deleteBiltek } = useBiltekRequest();
	const deleteUser = React.useCallback(
		(id) => () => {
			setTimeout(() => {

				if (window.confirm("Hasta silinecektir eminmisiniz")) {
					deleteBiltek("patients", id)
				}
				console.log("delete", id)
				//setRows((prevRows) => prevRows.filter((row) => row.id !== id));
			});
		},
		[deleteBiltek],
	);

	const getRowId = (row) => row._id
	const columns = [
		// {
		// 	field: "patientId",
		// 	hide: true,
		// },
		{
			field: "name",
			headerName: "Adı",
			flex: 1.5,
		},
		{
			field: "surname",
			headerName: "Soyadı",
			flex: 1.5,
		},
		{
			field: "idNumber",
			headerName: "Kimlik No",
			flex: 1,
		},
		{
			field: "age",
			headerName: "Yaş",
			flex: 1,
		},
		{
			field: "gsmNumber",
			headerName: "Telefon",
			flex: 1,
		},
		{
			field: "email",
			headerName: "Email",
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

	// Satıra tıklama işlevi
	const handleRowClick = (param) => {
		fetchPatientByPatientId(param.row._id)
	};

	return (
		<div style={{ height: 'calc(90vh - 260px)', width: '100%' }}>
			{patientLoading ? (
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
					onRowClick={handleRowClick} // Tıklama olayını buraya ekliyoruz				
				/>
			)}
		</div>
	);
}
