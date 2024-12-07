import { useState } from "react"
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Box, Table, TableBody, TableCell, TableRow, TextField, Button, Grid, Card, CardContent, Avatar } from "@mui/material";
import useAxios from "../../../services/useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../../../helper/ToastNotify";

import AddIcon from "@mui/icons-material/Add";

import { blue, pink, grey } from "@mui/material/colors";
import avatarMale from "../../../assets/avatarMale.png";
import avatarFemale from "../../../assets/avatarFemale.png";


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
        borderBottom: 0,
    },
    "&::before": {
        display: "none",
    },
})
);

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
        transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles("dark", {
        backgroundColor: "rgba(255, 255, 255, .05)",
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const PatientAdmissions = ({ selectedPatient, quotationsData, setQuotationModalOpen, setQuotationInfo, quotationModalData, setQuotationModalData }) => {

    //const quotations = quotationsData.data
    //const { quotations} = useSelector((state) => state.armer);
    console.log(selectedPatient);
    const patient = selectedPatient
    const genderColor = patient.gender === "Male" ? blue[50] : pink[50];
    const genderAvatar = patient.gender === "Male" ? avatarMale : avatarFemale;

    const quotations = [
        {
            "_id": "6706ecde36134a6ff5729be4",
            "userId": "66f1646afacc487b86a2d84e",
            "quotationId": {
                "_id": "6706ecb636134a6ff5729b52",
                "quotationDate": "2024-10-01T00:00:00.000Z"
            },
            "productId": "66f17e5c283729f1c009da60",
            "brand": "HES KABLO",
            "color": "SARI",
            "cablePackage": "PAKET",
            "delivery": "KARGO",
            "unitPrice": 118,
            "quantity": 100,
            "discount": 10,
            "discountedPrice": 106.2,
            "amount": 10620,
            "createdAt": "2024-10-09T20:51:42.888Z",
            "updatedAt": "2024-10-09T20:52:06.234Z",
            "__v": 0
        },
        {
            "_id": "67071c8beb2699ad591b7b59",
            "userId": "66f1646afacc487b86a2d84e",
            "quotationId": {
                "_id": "6706ecb636134a6ff5729b52",
                "quotationDate": "2024-10-01T00:00:00.000Z"
            },
            "productId": "66f17e5c283729f1c009d981",
            "brand": "HES KABLO",
            "color": "SARI",
            "cablePackage": "PAKET",
            "delivery": "KARGO",
            "unitPrice": 130,
            "quantity": 100,
            "discount": 100,
            "discountedPrice": 0,
            "amount": 0,
            "createdAt": "2024-10-10T00:15:07.612Z",
            "updatedAt": "2024-10-10T00:15:14.921Z",
            "__v": 0
        },
        {
            "_id": "67071e6feb2699ad591b7c40",
            "userId": "66f1646afacc487b86a2d84e",
            "quotationId": {
                "_id": "67071e38eb2699ad591b7bc3",
                "quotationDate": "2024-10-02T00:00:00.000Z"
            },
            "productId": "66f17e5c283729f1c009d987",
            "brand": "HES KABLO",
            "color": "SARI",
            "cablePackage": "PAKET",
            "delivery": "KARGO",
            "unitPrice": 175,
            "quantity": 50,
            "discount": 0,
            "discountedPrice": 175,
            "amount": 8750,
            "createdAt": "2024-10-10T00:23:11.324Z",
            "updatedAt": "2024-10-10T00:23:11.324Z",
            "__v": 0
        }
    ]



    const [expanded, setExpanded] = useState(quotations[0]._id);

    const handleChange = (panel) => (event, newExpanded) => {
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'path' && event.target.tagName !== 'svg') {
            setExpanded(newExpanded ? panel : false);
        }
    };

    const { axiosToken } = useAxios()

    const deleteQuotation = async (quotationId) => {
        try {
            const { data: productType } = await axiosToken.delete(`/API/v1/quotations/${quotationId}`);
            toastSuccessNotify(`İşlem Başarılı.`);
            setQuotationModalData(quotationModalData + 1)
        } catch (error) {
            console.error(error);
            toastErrorNotify(`Hata Oluştu`);
        }
    }

    return (
        <>

            <Box sx={{
                width: "100%",
                //mt: 2,
                maxHeight: "60vh",
                overflowY: 'auto', // Yalnızca dikey kaydırma
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '8px'
            }}>






                <Box sx={{ padding: 1 }}>

                <Button
                                sx={{ width: { xs: '100%', sm: 'auto' }, marginBottom:"10px" }}
                                variant="contained"
                                startIcon={<AddIcon />}
                            // onClick={() => { window.confirm(`${quotation.firmName} Teklifi Silinecektir Eminmisiniz ?`) && deleteQuotation(quotation._id) }}
                            >
                                Yeni Kayıt Oluştur
                            </Button>

                    <Card sx={{ minWidth: 500, boxShadow: 3, backgroundColor: genderColor, color: grey[800] }}>
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    sx={{ width: 120, height: 120, border: `2px solid ${genderColor}`, marginRight: 2 }}
                                    src={genderAvatar}
                                    alt="Patient Avatar"
                                />
                                <Box sx={{ width: "100%", display: "flex", alignItems: "start", justifyContent: "space-between", marginRight:"100px" }}>
                                    <Box>
                                        <Typography >
                                            <strong>Adı:</strong> {patient.name}
                                        </Typography>
                                        <Typography>
                                            <strong>Soyadı:</strong> {patient.surname}
                                        </Typography>
                                        <Typography>
                                            <strong>Kimlik No:</strong> {patient.idNumber}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography>
                                            <strong>Email:</strong> {patient.email}
                                        </Typography>
                                        <Typography>
                                            <strong>Telefon:</strong> {patient.phoneNumber}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                </Box>

                {
                    quotations.map((quotation) => (
                        <Accordion
                            key={quotation._id + "-key"}
                            expanded={expanded === quotation._id}
                            onChange={handleChange(quotation._id)}
                            sx={{
                                width: "100%", // Tam genişlik
                                // [theme.breakpoints.down('sm')]: {
                                //     padding: '8px', // Küçük ekranlar için ekstra padding
                                // }
                            }}
                        >
                            <AccordionSummary
                                aria-controls={quotation._id + "-content"}
                                id={quotation._id + "-header"}
                            >
                                <Box sx={{ width: "100%", mt: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "end" }}>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}>
                                        <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', sm: '2rem', md: '2.5rem' } }}>
                                            {quotation.firmName}
                                        </Typography>

                                        <Box sx={{ width: { xs: "100%", sm: "auto" }, display: "flex", justifyContent: "start", alignItems: "center", mt: { xs: 2, sm: 0 } }}>
                                            <Button
                                                sx={{ marginRight: '10px', width: { xs: '100%', sm: 'auto' } }}
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => { setQuotationModalOpen(true); setQuotationInfo(quotation) }}
                                            >
                                                GÜNCELLE
                                            </Button>
                                            <Button
                                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                                                variant="contained"
                                                startIcon={<DeleteIcon />}
                                                onClick={() => { window.confirm(`${quotation.firmName} Teklifi Silinecektir Eminmisiniz ?`) && deleteQuotation(quotation._id) }}
                                            >
                                                SİL
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: "100%", mt: 1, display: "flex", justifyContent: "space-between" }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <QuotationFirmInfoTable quotation={quotation} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <QuotationInfoTable quotation={quotation} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <TextField
                                                    sx={{
                                                        maxHeight: { xs: '40px', sm: '100%' },
                                                        width: '100%',
                                                        minWidth: '100px',
                                                        maxWidth: '300px',
                                                        marginLeft: '10px',
                                                        overflow: "hidden"
                                                        //marginRight: '15px',
                                                    }}
                                                    label=""
                                                    multiline
                                                    rows={5}
                                                    variant="outlined"
                                                    name="description"
                                                    value={quotation.description}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {/* {expanded === quotation._id && <QuotationDetailTable quotationId={quotation._id} />} */}
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Box>
        </>
    );
};

// Separate component for displaying quotation details

const StyledTable = styled(Table)(({ theme }) => ({
    width: '100%',
    minWidth: '225px',
    marginLeft: '10px',
    marginRight: '10px',

    borderCollapse: 'collapse',
    '& th, & td': {
        border: '1px solid #ddd',
        padding: theme.spacing(1),
    },
    '& th': {
        backgroundColor: theme.palette.grey[200],
    },
}));

const QuotationFirmInfoTable = ({ quotation }) => (
    <StyledTable>
        <TableBody>
            <TableRow>
                <TableCell>FİRMA YETKİLİSİ</TableCell>
                <TableCell>{quotation.firmAuthorizedPersonnel}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TELEFON/FAKS</TableCell>
                <TableCell>{quotation.firmFhone}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>E-MAIL</TableCell>
                <TableCell>{quotation.firmEmail}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>PROJE ADI</TableCell>
                <TableCell>{quotation.projectName}</TableCell>
            </TableRow>
        </TableBody>
    </StyledTable>
);


const QuotationInfoTable = ({ quotation }) => (
    <StyledTable>
        <TableBody>
            <TableRow>
                <TableCell>TEKLİF NO</TableCell>
                <TableCell>{quotation.quotationNumber}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEKLİF TARİHİ</TableCell>
                <TableCell>{new Date(quotation.quotationDate).toLocaleDateString("tr-TR")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEMSİLCİ GSM</TableCell>
                <TableCell>{quotation.representativeGSM}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEKLİFİ HAZIRLAYAN</TableCell>
                <TableCell>{quotation.quotationSpecialist}</TableCell>
            </TableRow>
        </TableBody>
    </StyledTable>
);


export default PatientAdmissions;
