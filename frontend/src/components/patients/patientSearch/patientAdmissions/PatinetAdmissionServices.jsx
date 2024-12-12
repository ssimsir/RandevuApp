
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import PrintIcon from '@mui/icons-material/Print';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import { btnStyle } from "../../../../styles/globalStyles"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

import { Button } from "@mui/material"
import useAxios from "../../../../services/useAxios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {AccordionTableSkeleton, NoDataMessage} from "../../../DataFetchMessages";
import NewPatinetAdmissionServiceModal from "./patientAdmissionServices/NewPatinetAdmissionServiceModal";
import NewPatinetAdmissionPaymentModal from "./patientAdmissionServices/NewPatinetAdmissionPaymentModal";


const PatinetAdmissionServices = ({patientId, patientAdmissionId}) => {

	const { axiosToken } = useAxios()

	const { userId } = useSelector((state) => state.auth);


	useEffect(() => {
		fetchPatinetAdmissionData()
		fetchPatinetAdmissionServicesData();
	}, []);

    const getRowId = (row) => row._id
    const columns = [
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
			align: 'center',
			headerAlign: 'center',
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
			field: 'price',
			headerName: 'FİYAT',
			width: 100,
			align: 'right',
			headerAlign: 'center',
		},
		{
			field: 'discount',
			headerName: 'İSKONTO',
			type: 'number',
			width: 100,
			align: 'right',
			headerAlign: 'center',
		},
		{
			field: 'discountedPrice',
			headerName: 'NET FİYAT',
			width: 130,
			align: 'right',
			headerAlign: 'center',
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
				row: { id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount },
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
				]
			},
		},
	]


	
	const [patinetAdmissionData, setPatinetAdmissionData] = useState();

	const fetchPatinetAdmissionData = async () => {
		try {
			const { data } = await axiosToken(`/API/v1/patientAdmissions/${patientAdmissionId}`);    			
			setPatinetAdmissionData(data.data)			
		} catch (error) {
			console.error(error);
		}
	};


	/* --------------NewPatinetAdmissionServiceModal----*/
	const [patinetAdmissionServicesData, setPatinetAdmissionServicesData] = useState();
	const fetchPatinetAdmissionServicesData = async () => {
		try {
			const { data } = await axiosToken(`/API/v1/patientAdmissionServices/?filter[patientAdmissionId]=${patientAdmissionId}`);    			
			setPatinetAdmissionServicesData(data.data)			
		} catch (error) {
			console.error(error);
		}
	};

	const newPatinetAdmissionServiceModalInfoInitialState = {
		userId: userId,
		patientId:patientId,
		patientAdmissionId:patientAdmissionId,
		serviceId:'',
		discount:'',
		infoMessage: '',
		price:''
	}    
    const [newPatinetAdmissionServiceModalInfo, setNewPatinetAdmissionServiceModalInfo] = useState(newPatinetAdmissionServiceModalInfoInitialState);
    const [newPatinetAdmissionServiceModalopen, setNewPatinetAdmissionServiceModalopen] = useState(false)
    const newPatinetAdmissionServiceModalHandleOpen = () => setNewPatinetAdmissionServiceModalopen(true)
    const newPatinetAdmissionServiceModalHandleClose = () => {
		setNewPatinetAdmissionServiceModalInfo(newPatinetAdmissionServiceModalInfoInitialState)
		setNewPatinetAdmissionServiceModalopen(false)
	}
	/* --------------NewPatinetAdmissionServiceModal----*/


	// NewPatinetAdmissionPaymentModal

	const [patinetAdmissionPaymentsData, setPatinetAdmissionPaymentsData] = useState();

	const fetchPatinetAdmissionPaymentsData = async () => {
		try {
			const { data } = await axiosToken(`/API/v1/patientAdmissionServices/?filter[patientAdmissionId]=${patientAdmissionId}`);    			
			setPatinetAdmissionPaymentsData(data.data)			
		} catch (error) {
			console.error(error);
		}
	};

	const newPatinetAdmissionPaymentModalInfoInitialState = {
		userId: userId,
		patientId:patientId,
		patientAdmissionId:patientAdmissionId,
		paymentAmount:'',
		infoMessage: '',
	}    
	const [newPatinetAdmissionPaymentModalInfo, setNewPatinetAdmissionPaymentModalInfo] = useState(newPatinetAdmissionPaymentModalInfoInitialState);
	const [newPatinetAdmissionPaymentModalopen, setNewPatinetAdmissionPaymentModalopen] = useState(false)
	const newPatinetAdmissionPaymentModalHandleOpen = () => setNewPatinetAdmissionPaymentModalopen(true)
	const newPatinetAdmissionPaymentModalHandleClose = () => {
		setNewPatinetAdmissionPaymentModalInfo(newPatinetAdmissionPaymentModalInfoInitialState)
		setNewPatinetAdmissionPaymentModalopen(false)
	}
	// NewPatinetAdmissionPaymentModal

    return(
		<Box sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap:"wrap" }}>
				<Box sx={{ mb:"10px", display: "flex", flexDirection:"column", gap:"3px" }}>
					<Button sx={{ marginRight: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={newPatinetAdmissionServiceModalHandleOpen}>
						HİZMET EKLE
					</Button>
					<Button sx={{ marginRight: '10px' }} variant="contained" startIcon={<AttachMoneyIcon />} onClick={newPatinetAdmissionPaymentModalHandleOpen}>
						Tahsilat
					</Button>
				</Box>
				{!patinetAdmissionServicesData ? (
					<AccordionTableSkeleton />
				) : (
					patinetAdmissionServicesData?.length ? (                        
						<PatinetAdmissionCostDetails patinetAdmissionData={patinetAdmissionData} />
					) : (
						<NoDataMessage />
					)
				)}
			</Box>

			{!patinetAdmissionServicesData ? (
				<AccordionTableSkeleton />
			) : (
				patinetAdmissionServicesData?.length ? (
					<DataGrid
						rows={patinetAdmissionServicesData}
                        columns={columns}
                        getRowId={getRowId}
						disableRowSelectionOnClick
					/>
				) : (
					<NoDataMessage />
				)
			)}
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

			{/* <QuotationDetailModal
				quotationDetailModalOpen={quotationDetailModalOpen}
				quotationDetailModalCloseHandle={quotationDetailModalCloseHandle}
				setQuotationDetailModalOpen={setQuotationDetailModalOpen}
				quotationDetailInfo={quotationDetailInfo}
				setQuotationDetailInfo={setQuotationDetailInfo}
			/>

			<QuotationPdfModal
				quotationPdfModalOpen={quotationPdfModalOpen}
				setQuotationPdfModalOpen={setQuotationPdfModalOpen}
				pdfUrl={pdfUrl}
				setPdfUrl={setPdfUrl}
			/> */}
		</Box>
    )
}


const StyledTable = styled(Table)(({ theme }) => ({
	width: '25%',
	minWidth: '250px',
	marginBottom: '15px',

	borderCollapse: 'collapse',
	'& th, & td': {
		border: '1px solid #ddd',
		padding: theme.spacing(1),
	},
	'& th': {
		backgroundColor: theme.palette.grey[200],
	},
}));

const PatinetAdmissionCostDetails = ({ patinetAdmissionData }) => (
	<StyledTable>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>ARA TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>₺ {patinetAdmissionData?.totalAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>KDV 20%</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>₺ {patinetAdmissionData?.kdvAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>GENEL TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>₺ {patinetAdmissionData?.totalAmountWithKDV}</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>

);
export default PatinetAdmissionServices