import * as React from "react";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';

import useBiltekRequest from "../../services/useBiltekRequest";
import NewPatientAdmissionModal from "./NewPatientAdmissionModal";


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


	const getRowId = (row) => row.reservationId
	const columns = [
		{
			field: "startTime",
			headerName: "#",
			flex: 1,
			valueGetter: (value) => new Date(value).toLocaleTimeString("tr-TR"),
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
					icon={<AddIcon />}
					label="Add"
					onClick={() => {
						newPatientAdmissionModalOpenHandle()
						//setQuotationDetailInfo({ id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount })
					}}
				/>,

			],
		},
	];

	const [selectionModel, setSelectionModel] = React.useState([]);
	function CustomSelectionToolbar() {
		return null; // Boş bir bileşen döndür
	}


	const [newPatientAdmissionModalOpen, setNewPatientAdmissionModalOpen] = React.useState(false);

	const newPatientAdmissionModalOpenHandle = () => {
		setNewPatientAdmissionModalOpen(true);
		//getArmer("firms");
	}



	const newPatientAdmissionModalCloseHandle = () => {
		setNewPatientAdmissionModalOpen(false);
		//setQuotationDetailInfo(quotationDetailInfoInitialState);
	}

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
					disableSelectionOnClick
					hideFooterSelectedRowCount
					onRowClick={(params) => {
						setSelectionModel([params.id]);
						console.log('Seçilen Satır ID:', params.id);
					}}
					selectionModel={selectionModel}
					getRowId={getRowId}
				/>
			)}

			<NewPatientAdmissionModal
				newPatientAdmissionModalOpen={newPatientAdmissionModalOpen}
				newPatientAdmissionModalCloseHandle={newPatientAdmissionModalCloseHandle}
				setNewPatientAdmissionModalOpen={setNewPatientAdmissionModalOpen}
			//quotationDetailInfo={quotationDetailInfo}
			//setQuotationDetailInfo={setQuotationDetailInfo}
			/>
		</div>
	);
}
