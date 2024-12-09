
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import { btnStyle } from "../../../../styles/globalStyles"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";

import { Button } from "@mui/material"
import useAxios from "../../../../services/useAxios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {AccordionTableSkeleton, NoDataMessage} from "../../../DataFetchMessages";


const PatinetAdmissionServices = ({patientAdmissionId}) => {

	const { axiosToken } = useAxios()

	const { userId } = useSelector((state) => state.auth);

	const patinetAdmissionServicesInfoInitialState = {
		userId: userId,
		quotationId: patientAdmissionId,
		productId: '',
		brand: '',
		color: '',
		cablePackage: '',
		delivery: '',
		unitPrice: '',
		quantity: '',
		discount: '',
	}

	const [patinetAdmissionServicesInfo, setPatinetAdmissionServicesInfo] = useState(patinetAdmissionServicesInfoInitialState);

    const [patinetAdmissionServicesData, setPatinetAdmissionServicesData] = useState();
	const fetchPatinetAdmissionServicesData = async () => {
		try {
			const { data } = await axiosToken(`/API/v1/patientAdmissionServices/?filter[patientAdmissionId]=${patientAdmissionId}`);
            console.log(data.data);
			setPatinetAdmissionServicesData(data.data)
		} catch (error) {
			console.error(error);
		}
	}

    useEffect(() => {
		fetchPatinetAdmissionServicesData();
		//fetchQuotationData();
	}, [patinetAdmissionServicesInfo]);

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

    const quotationDetailModalOpenHandle = () => {
		
		//getArmer("firms");
	}
    return(
		<Box sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap:"wrap" }}>
				<Box sx={{ mb:"10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap:"3px" }}>
					<Button sx={{ marginRight: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={quotationDetailModalOpenHandle}>
						HİZMET EKLE
					</Button>
				</Box>
				{!patinetAdmissionServicesData ? (
					<AccordionTableSkeleton />
				) : (
					patinetAdmissionServicesData?.length ? (                        
						<PatinetAdmissionServicesDetails patinetAdmissionServicesData={{}} />
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

const PatinetAdmissionServicesDetails = ({ patinetAdmissionServicesData }) => (
	<StyledTable>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>ARA TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{patinetAdmissionServicesData?.totalAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>KDV 20%</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{patinetAdmissionServicesData?.kdvAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>GENEL TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{patinetAdmissionServicesData?.totalAmountWithKDV}</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>

);
export default PatinetAdmissionServices