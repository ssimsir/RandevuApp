import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PrintIcon from "@mui/icons-material/Print";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddIcon from "@mui/icons-material/Add";
import { btnStyle } from "../../../../styles/globalStyles";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import {
	Box,
	Paper,
	Tab,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tabs,
	Typography,
} from "@mui/material";

import { Button, TextField } from "@mui/material";
import useAxios from "../../../../services/useAxios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
	AccordionTableSkeleton,
	NoDataMessage,
} from "../../../DataFetchMessages";
import NewPatinetAdmissionServiceModal from "./patientAdmissionServices/NewPatinetAdmissionServiceModal";
import NewPatinetAdmissionPaymentModal from "./patientAdmissionServices/NewPatinetAdmissionPaymentModal";
import MedicalRecords from "./patientAdmissionServices/MedicalRecords";
import { toastSuccessNotify } from "../../../../helper/ToastNotify";
import PatinetAdmissionPaymentReceiptPdfModal from "./patientAdmissionServices/PatinetAdmissionPaymentReceiptPdfModal";
import useReceiptPdfDesing from "./patientAdmissionServices/useReceiptPdfDesing/useReceiptPdfDesing";

const PatinetAdmissionServices = ({ patientId, patientAdmissionId }) => {
	const { axiosToken } = useAxios();

	const { userId } = useSelector((state) => state.auth);

	useEffect(() => {
		fetchPatinetAdmissionData();
		fetchPatinetAdmissionServicesData();
		fetchPatinetAdmissionPaymentsData();
		fetchPatinetAdmissionMedicalRecordsData();
	}, []);


	const getRowIdPatinetAdmissionServices = (row) => row._id;
	const patinetAdmissionServicesColumns = [
		// {
		//   field: "createdAt",
		//   headerName: "Date",
		//   minWidth: 150,
		//   headerAlign: "center",
		//   align: "center",
		//   renderCell: ({ row }) => {
		//     return new Date(row.createdAt).toLocaleString("tr-TR")
		//   },
		// },

		{
			field: "serviceId",
			headerName: "ÜRÜN",
			align: "center",
			headerAlign: "center",
			//flex: 1,
			//minWidth: 100,
			width: 175,
			// valueGetter: (value, row) => {
			//   console.log("ROW:", row, "VALUE:", value)
			//   return value?.name
			// },
			valueGetter: (value) => value?.name,
		},
		{
			field: "price",
			headerName: "FİYAT",
			width: 100,
			align: "right",
			headerAlign: "center",
		},
		{
			field: "discount",
			headerName: "İSKONTO",
			type: "number",
			width: 100,
			align: "right",
			headerAlign: "center",
		},
		{
			field: "discountedPrice",
			headerName: "NET FİYAT",
			width: 130,
			align: "right",
			headerAlign: "center",
		},
		// {
		// 	field: "userId",
		// 	headerName: "KULLANICI",
		// 	width: 140,
		// 	align: 'center',
		// 	headerAlign: 'center',
		// 	valueGetter: (value, row) => {
		// 	  //console.log("ROW:", row, "VALUE:", value)
		// 	  return value?.firstName + ' ' + value?.lastName
		// 	}
		// },

		{
			field: "actions",
			headerName: "Actions",
			minWidth: 40,
			headerAlign: "center",
			align: "center",
			renderCell: ({
				row: {
					id,
					productId,
					productGroup,
					product,
					brand,
					color,
					cablePackage,
					delivery,
					quantity,
					discount,
				},
			}) => {
				return [
					<GridActionsCellItem
						key={"edit"}
						icon={<EditIcon />}
						label="Edit"
						onClick={() => {
							//quotationDetailModalOpenHandle()
							//setQuotationDetailInfo({ id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount })
						}}
						sx={btnStyle}
					/>,
					<GridActionsCellItem
						key={"delete"}
						icon={<DeleteIcon />}
						label="Delete"
						//onClick={() => window.confirm(`${product} Silinecektir devam edilsin mi ? `) && deleteQuotationDetailData(id)}
						sx={btnStyle}
					/>,
				];
			},
		},
	];

	const getRowIdPatinetAdmissionPayments = (row) => row._id;
	const patinetAdmissionPaymentsColumns = [
		{
			field: "paymentAmount",
			headerName: "Miktar",
			width: 100,
			align: "right",
			headerAlign: "center",
		},
		{
			field: "createdAt",
			headerName: "Tarih",
			type: "number",
			width: 200,
			align: "right",
			headerAlign: "center",
			valueGetter: (value) => new Date(value).toLocaleString("tr-TR"),

		},
		{
			field: "userId",
			headerName: "Kayıt Yapan",
			type: "number",
			width: 200,
			align: "right",
			headerAlign: "center",
			valueGetter: (value) => `${value.firstName} ${value.lastName}`,
		},
		{
			field: "actions",
			headerName: "Actions",
			minWidth: 120,
			headerAlign: "center",
			align: "center",
			renderCell: ({ row: { id } }) => {
				return [
					<GridActionsCellItem
					key={"print"}
					icon={<PrintIcon />}
					label="Print"
					onClick={() => {
						patinetAdmissionPaymentReceiptPdfModalOpenHandle()
						//setQuotationDetailInfo({ id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount })
					}}
					sx={btnStyle}
				/>,
					<GridActionsCellItem
						key={"edit"}
						icon={<EditIcon />}
						label="Edit"
						onClick={() => {
							//quotationDetailModalOpenHandle()
							//setQuotationDetailInfo({ id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount })
						}}
						sx={btnStyle}
					/>,
					<GridActionsCellItem
						key={"delete"}
						icon={<DeleteIcon />}
						label="Delete"
						//onClick={() => window.confirm(`${product} Silinecektir devam edilsin mi ? `) && deleteQuotationDetailData(id)}
						sx={btnStyle}
					/>,
				];
			},
		}
	];

	const [patinetAdmissionData, setPatinetAdmissionData] = useState();

	const fetchPatinetAdmissionData = async () => {
		try {
			const { data } = await axiosToken(
				`/API/v1/patientAdmissions/${patientAdmissionId}`
			);
			setPatinetAdmissionData(data.data);
		} catch (error) {
			console.error(error);
		}
	};

	/* --------------NewPatinetAdmissionServiceModal----*/
	const [patinetAdmissionServicesData, setPatinetAdmissionServicesData] = useState();
	const fetchPatinetAdmissionServicesData = async () => {
		try {
			const { data } = await axiosToken(
				`/API/v1/patientAdmissionServices/?filter[patientAdmissionId]=${patientAdmissionId}`
			);
			setPatinetAdmissionServicesData(data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const newPatinetAdmissionServiceModalInfoInitialState = {
		userId: userId,
		patientId: patientId,
		patientAdmissionId: patientAdmissionId,
		serviceId: "",
		discount: "",
		infoMessage: "",
		price: "",
	};
	const [
		newPatinetAdmissionServiceModalInfo,
		setNewPatinetAdmissionServiceModalInfo,
	] = useState(newPatinetAdmissionServiceModalInfoInitialState);
	const [
		newPatinetAdmissionServiceModalopen,
		setNewPatinetAdmissionServiceModalopen,
	] = useState(false);
	const newPatinetAdmissionServiceModalHandleOpen = () =>
		setNewPatinetAdmissionServiceModalopen(true);
	const newPatinetAdmissionServiceModalHandleClose = () => {
		setNewPatinetAdmissionServiceModalInfo(
			newPatinetAdmissionServiceModalInfoInitialState
		);
		setNewPatinetAdmissionServiceModalopen(false);
	};
	/* --------------NewPatinetAdmissionServiceModal----*/

	/* --------------NewPatinetAdmissionPaymentModal----*/
	const [patinetAdmissionPaymentsData, setPatinetAdmissionPaymentsData] =
		useState();

	const fetchPatinetAdmissionPaymentsData = async () => {
		try {
			const { data } = await axiosToken(
				`/API/v1/patientAdmissionPayments/?filter[patientAdmissionId]=${patientAdmissionId}`
			);
			setPatinetAdmissionPaymentsData(data.data);
		} catch (error) {
			console.error(error);
		}
	};

	const newPatinetAdmissionPaymentModalInfoInitialState = {
		userId: userId,
		patientId: patientId,
		patientAdmissionId: patientAdmissionId,
		paymentAmount: "",
		infoMessage: "",
	};
	const [
		newPatinetAdmissionPaymentModalInfo,
		setNewPatinetAdmissionPaymentModalInfo,
	] = useState(newPatinetAdmissionPaymentModalInfoInitialState);
	const [
		newPatinetAdmissionPaymentModalopen,
		setNewPatinetAdmissionPaymentModalopen,
	] = useState(false);
	const newPatinetAdmissionPaymentModalHandleOpen = () =>
		setNewPatinetAdmissionPaymentModalopen(true);
	const newPatinetAdmissionPaymentModalHandleClose = () => {
		setNewPatinetAdmissionPaymentModalInfo(
			newPatinetAdmissionPaymentModalInfoInitialState
		);
		setNewPatinetAdmissionPaymentModalopen(false);
	};
	/* --------------NewPatinetAdmissionPaymentModal----*/

	/* --------------PatinetAdmissionMedicalRecords----*/
	const patinetAdmissionMedicalRecordsInitialState = {
		findings: "",
		diagnoses: "",
		treatments: ""
	}
	const [patinetAdmissionMedicalRecordsData, setPatinetAdmissionMedicalRecordsData] = useState(patinetAdmissionMedicalRecordsInitialState);
	const [patinetAdmissionMedicalRecordsLoading, setPatinetAdmissionMedicalRecordsLoading] = useState(false);

	const fetchPatinetAdmissionMedicalRecordsData = async () => {
		try {
			setPatinetAdmissionMedicalRecordsLoading(true)
			const { data } = await axiosToken(`/API/v1/patientAdmissions/${patientAdmissionId}`);
			setPatinetAdmissionMedicalRecordsData(data.data);
		} catch (error) {
			console.error(error);
		} finally {
            setPatinetAdmissionMedicalRecordsLoading(false); // Yükleme durumu bitiyor
        }
	};
	const savePatinetAdmissionMedicalRecordsData = async () => {
		try {
			setPatinetAdmissionMedicalRecordsLoading(true)
			const { data } = await axiosToken.patch(`/API/v1/patientAdmissions/${patientAdmissionId}`, patinetAdmissionMedicalRecordsData);
			toastSuccessNotify(`Kayıt Tamamlanmıştır`)
		} catch (error) {
			console.error(error);
		} finally {
            setPatinetAdmissionMedicalRecordsLoading(false); // Yükleme durumu bitiyor
        }
	};
	/* --------------PatinetAdmissionMedicalRecords----*/

	/* --------------PatinetAdmissionPaymentReceiptPdfModal----*/
	const [patinetAdmissionPaymentReceiptPdfModalOpen, setPatinetAdmissionPaymentReceiptPdfModalOpen] = useState(false);
	const [patinetAdmissionPaymentReceiptPdfUrl, setPatinetAdmissionPaymentReceiptPdfUrl] = useState('');

	const { receiptPdfDesing } = useReceiptPdfDesing()
	const patinetAdmissionPaymentReceiptPdfModalOpenHandle = () => {
		const doc = receiptPdfDesing({/* ...quotationData, quotationDetails: quotationDetailData */});
		const pdfBlob = doc.output('blob');
		const url = URL.createObjectURL(pdfBlob);
		setPatinetAdmissionPaymentReceiptPdfUrl(url);
		setPatinetAdmissionPaymentReceiptPdfModalOpen(true);
	};
	/* --------------PatinetAdmissionPaymentReceiptPdfModal----*/


	const [activeTab, setActiveTab] = useState(0);
	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<>
			<Box sx={{ width: "100%", border: "1px solid black" }}>
				<Tabs value={activeTab} onChange={handleTabChange}>
					<Tab label="HİZMETLER" />
					<Tab label="TAHSİLAT" />
					<Tab label="TIBBİ KAYITLAR" />
					{/* <Tab label="Tab 4" /> */}
				</Tabs>
				<Box sx={{ p: 1 }}>

					{/* Hizmetler tabı */}
					{activeTab === 0 && (
						<Box sx={{ width: "100%" }}>
							<Box
								mb={1}
								sx={{
									display: "flex",
									justifyContent: "end",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>

								<Button
									sx={{ marginRight: "10px" }}
									variant="contained"
									startIcon={<AddIcon />}
									onClick={newPatinetAdmissionServiceModalHandleOpen}
								>
									HİZMET EKLE
								</Button>

							</Box>
							{!patinetAdmissionServicesData ? (
								<AccordionTableSkeleton />
							) : patinetAdmissionServicesData?.length ? (
								<DataGrid
									rows={patinetAdmissionServicesData}
									columns={patinetAdmissionServicesColumns}
									getRowId={getRowIdPatinetAdmissionServices}
									disableRowSelectionOnClick
								/>
							) : (
								<NoDataMessage />
							)}
						</Box>
					)}

					{/* Tahsilat Tabı */}
					{activeTab === 1 && (
						<Box sx={{ width: "100%" }}>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									alignItems: "start",
									flexWrap: "wrap",
								}}
							>
								{!patinetAdmissionServicesData ? (
									<AccordionTableSkeleton />
								) : patinetAdmissionServicesData?.length ? (
									<Box sx={{ display: "flex", gap: "10px", alignItems: "end", justifyContent: "space-between", flexWrap: "wrap" }}>
										<PatinetAdmissionCostDetails patinetAdmissionData={patinetAdmissionData} />
										<PatinetAdmissionPaymentDetails patinetAdmissionData={patinetAdmissionData} />
										<PatinetAdmissionRemainingAmountDetails patinetAdmissionData={patinetAdmissionData} />
									</Box>
								) : (
									<NoDataMessage />
								)}
								<Button
									sx={{ marginRight: "10px" }}
									variant="contained"
									startIcon={<AttachMoneyIcon />}
									onClick={newPatinetAdmissionPaymentModalHandleOpen}
								>
									TAHSİLAT
								</Button>
							</Box>
							{!patinetAdmissionServicesData ? (
								<AccordionTableSkeleton />
							) : patinetAdmissionServicesData?.length ? (
								<DataGrid
									rows={patinetAdmissionPaymentsData}
									columns={patinetAdmissionPaymentsColumns}
									getRowId={getRowIdPatinetAdmissionPayments}
									disableRowSelectionOnClick
								/>
								// <PatinetAdmissionPaymentDetails
								// 	patinetAdmissionPaymentsData={patinetAdmissionPaymentsData}
								// />
							) : (
								<NoDataMessage />
							)}
						</Box>
					)}
					{activeTab === 2 && (
						<Box sx={{ width: "100%" }}>
							<Box
								mb={1}
								sx={{
									display: "flex",
									justifyContent: "end",
									alignItems: "center",
									flexWrap: "wrap",
								}}
							>
								<Button
									sx={{ marginRight: "10px" }}
									variant="contained"
									startIcon={<AddIcon />}
									onClick={savePatinetAdmissionMedicalRecordsData}
								>
									KAYIT
								</Button>
							</Box>
							<MedicalRecords 
								patinetAdmissionMedicalRecordsData={patinetAdmissionMedicalRecordsData} 
								setPatinetAdmissionMedicalRecordsData={setPatinetAdmissionMedicalRecordsData} 
								patinetAdmissionMedicalRecordsLoading = {patinetAdmissionMedicalRecordsLoading}								
								/>
						</Box>
					)}
					{/* {activeTab === 3 && <Typography>Tab 4 Content</Typography>} */}
				</Box>
			</Box>

			<NewPatinetAdmissionServiceModal
				newPatinetAdmissionServiceModalopen={newPatinetAdmissionServiceModalopen}
				newPatinetAdmissionServiceModalHandleClose={newPatinetAdmissionServiceModalHandleClose}
				newPatinetAdmissionServiceModalInfo={newPatinetAdmissionServiceModalInfo}
				setNewPatinetAdmissionServiceModalInfo={setNewPatinetAdmissionServiceModalInfo}
				fetchPatinetAdmissionServicesData={fetchPatinetAdmissionServicesData}
				fetchPatinetAdmissionData={fetchPatinetAdmissionData}
			/>
			<NewPatinetAdmissionPaymentModal
				newPatinetAdmissionPaymentModalopen={newPatinetAdmissionPaymentModalopen}
				newPatinetAdmissionPaymentModalHandleClose={newPatinetAdmissionPaymentModalHandleClose}
				newPatinetAdmissionPaymentModalInfo={newPatinetAdmissionPaymentModalInfo}
				setNewPatinetAdmissionPaymentModalInfo={setNewPatinetAdmissionPaymentModalInfo}
				fetchPatinetAdmissionPaymentsData={fetchPatinetAdmissionPaymentsData}
				fetchPatinetAdmissionData={fetchPatinetAdmissionData}
			/>

			<PatinetAdmissionPaymentReceiptPdfModal
				patinetAdmissionPaymentReceiptPdfModalOpen={patinetAdmissionPaymentReceiptPdfModalOpen}
				setPatinetAdmissionPaymentReceiptPdfModalOpen={setPatinetAdmissionPaymentReceiptPdfModalOpen}
				patinetAdmissionPaymentReceiptPdfUrl={patinetAdmissionPaymentReceiptPdfUrl}
				setPatinetAdmissionPaymentReceiptPdfUrl={setPatinetAdmissionPaymentReceiptPdfUrl}
			/>
		</>
	);
};

const StyledTable = styled(Table)(({ theme }) => ({
	//width: "20%",
	//minWidth: "210px",
	marginBottom: "15px",
	borderCollapse: "collapse",
	"& th, & td": {
		border: "1px solid #ddd",
		padding: theme.spacing(1),
	},
	"& th": {
		backgroundColor: theme.palette.grey[200],
	},
}));

const PatinetAdmissionCostDetails = ({ patinetAdmissionData }) => (
	<StyledTable sx={{ width: "210px" }}>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>ARA TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>
					₺ {patinetAdmissionData?.totalAmount}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>KDV 20%</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>
					₺ {patinetAdmissionData?.kdvAmount}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>GENEL TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>
					₺ {patinetAdmissionData?.totalAmountWithKDV}
				</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>
);

const PatinetAdmissionPaymentDetails = ({ patinetAdmissionData }) => (
	<StyledTable sx={{ width: "240px" }}>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>TOPLAM TAHSİLAT</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>
					₺ {patinetAdmissionData?.totalPayment}
				</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>
);

const PatinetAdmissionRemainingAmountDetails = ({ patinetAdmissionData }) => (
	<StyledTable sx={{ width: "150px" }}>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>KALAN</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>
					₺  {patinetAdmissionData?.totalAmountWithKDV - patinetAdmissionData?.totalPayment}
				</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>
);

export default PatinetAdmissionServices;
