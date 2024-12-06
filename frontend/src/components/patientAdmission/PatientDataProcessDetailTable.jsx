import { useSelector } from "react-redux"
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import { btnStyle } from "../../styles/globalStyles"
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid"
import { Box, Table, TableBody, TableCell, TableRow } from "@mui/material";
import useAxios from "../../services/useAxios"
import { useState, useEffect } from "react"
import { Button } from "@mui/material"

import {AccordionTableSkeleton, NoDataMessage} from "../../components/DataFetchMessages";

const PatientDataProcessDetailTable = ({ quotationId }) => {

	const { axiosToken } = useAxios()

	const { userId } = useSelector((state) => state.auth);

	const quotationDetailInfoInitialState = {
		userId: userId,
		quotationId: quotationId,
		productId: '',
		brand: '',
		color: '',
		cablePackage: '',
		delivery: '',
		unitPrice: '',
		quantity: '',
		discount: '',
	}

	const [quotationDetailInfo, setQuotationDetailInfo] = useState(quotationDetailInfoInitialState);

	const [quotationDetailData, setQuotationDetailData] = useState();
	const fetchQuotationDetailData = async () => {
		try {
			const { data: quotationDetails } = await axiosToken(`/API/v1/quotationDetails/detail/${quotationId}`);
			setQuotationDetailData(quotationDetails.data)
		} catch (error) {
			console.error(error);
		}
	}

	const [quotationData, setQuotationData] = useState();
	const fetchQuotationData = async () => {
		try {
			const { data: quotation } = await axiosToken(`/API/v1/quotations/${quotationId}`);
			setQuotationData(quotation.data)
		} catch (error) {
			console.error(error);
		}
	}

	const deleteQuotationDetailData = async (quotationDetailId) => {
		try {
			await axiosToken.delete(`/API/v1/quotationDetails/${quotationDetailId}`);
			setQuotationDetailInfo('')
		} catch (error) {
			console.error(error);
		}
	}
	useEffect(() => {
		fetchQuotationDetailData();
		fetchQuotationData();
	}, [quotationDetailInfo]);

	// //const getRowId = (row) => row._id

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


		// {
		// 	field: "productId",
		// 	headerName: "ÜRÜN",
		// 	align: 'center',
		// 	headerAlign: 'center',
		// 	//flex: 1,
		// 	//minWidth: 100,
		// 	width: 175,
		// 	// valueGetter: (value, row) => {
		// 	//   console.log("ROW:", row, "VALUE:", value)
		// 	//   return value?.name
		// 	// },
		// 	valueGetter: (value) => value?.group + ' ' + value?.type ,
		// },

		{ field: 'product', headerName: 'ÜRÜN', width: 175 },
		{ field: 'brand', headerName: 'MARKA', align: 'center', headerAlign: 'center', width: 140 },
		{ field: 'color', headerName: 'RENK', align: 'center', headerAlign: 'center', width: 110 },
		{ field: 'cablePackage', headerName: 'AMBALAJ', align: 'center', headerAlign: 'center', width: 110 },
		{ field: 'delivery', headerName: 'TESLİM', align: 'center', headerAlign: 'center', width: 110 },
		{
			field: 'unitPrice',
			headerName: 'LİSTE',
			width: 100,
			align: 'right',
			headerAlign: 'center',
		},
		{
			field: 'quantity',
			headerName: 'METRE',
			type: 'number',
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
		{
			field: 'amount',
			headerName: 'TUTARI',
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
							quotationDetailModalOpenHandle()
							setQuotationDetailInfo({ id, productId, productGroup, product, brand, color, cablePackage, delivery, quantity, discount })
						}}
						sx={btnStyle}
					/>,
					<GridActionsCellItem
						key={"delete"}
						icon={<DeleteIcon />}
						label="Delete"
						onClick={() => window.confirm(`${product} Silinecektir devam edilsin mi ? `) && deleteQuotationDetailData(id)}
						sx={btnStyle}
					/>,
				]
			},
		},
	]

	const [quotationPdfModalOpen, setQuotationPdfModalOpen] = useState(false);


	const [quotationDetailModalOpen, setQuotationDetailModalOpen] = useState(false);

	const quotationDetailModalOpenHandle = () => {
		setQuotationDetailModalOpen(true);
		//getArmer("firms");
	}

	const quotationDetailModalCloseHandle = () => {
		setQuotationDetailModalOpen(false);
		setQuotationDetailInfo(quotationDetailInfoInitialState);
	}

	return (

		<Box sx={{ width: "100%" }}>
			<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap:"wrap" }}>
				<Box sx={{ mb:"10px", display: "flex", justifyContent: "space-between", alignItems: "center", gap:"3px" }}>
					<Button sx={{ marginRight: '10px' }} variant="contained" startIcon={<AddIcon />} onClick={quotationDetailModalOpenHandle}>
						ÜRÜN EKLE
					</Button>

				</Box>
				{!quotationDetailData ? (
					<AccordionTableSkeleton />
				) : (
					quotationDetailData?.length ? (
						<QuotationTotalInfoTable quotationData={quotationData} />
					) : (
						<NoDataMessage />
					)
				)}
			</Box>

			{!quotationDetailData ? (
				<AccordionTableSkeleton />
			) : (
				quotationDetailData?.length ? (
					<DataGrid
						autoHeight
						rows={quotationDetailData}
						columns={columns}
						pageSizeOptions={[20, 50, 75, 100]} //? sayfa basina satir sayisi
						disableRowSelectionOnClick
					/>
				) : (
					<NoDataMessage />
				)
			)}

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

const QuotationTotalInfoTable = ({ quotationData }) => (
	<StyledTable>
		<TableBody>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>ARA TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{quotationData?.totalAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>KDV 20%</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{quotationData?.kdvAmount}</TableCell>
			</TableRow>
			<TableRow>
				<TableCell sx={{ fontWeight: "bold" }}>GENEL TOPLAM</TableCell>
				<TableCell sx={{ fontWeight: "bold" }}>{quotationData?.totalAmountWithKDV}</TableCell>
			</TableRow>
		</TableBody>
	</StyledTable>

);

export default PatientDataProcessDetailTable
