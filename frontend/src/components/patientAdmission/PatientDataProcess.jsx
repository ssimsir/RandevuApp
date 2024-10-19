import { useState } from "react"
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import { Box, Table, TableBody, TableCell, TableRow, TextField, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";

import useAxios from "../../services/useAxios";
import { toastErrorNotify, toastSuccessNotify } from "../../helper/ToastNotify";
import PatientDataProcessDetailTable from "./PatientDataProcessDetailTable";

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

const PatientDataProcess = ({ quotationsData, setQuotationModalOpen, setQuotationInfo, quotationModalData, setQuotationModalData }) => {

    //const quotations = quotationsData.data

    const quotations = [
        {
            _id : "deneme data1",
            firmName : "deneme data1",
            description : "deneme data1",
            firmAuthorizedPersonnel : "deneme data1",
            firmFhone : "deneme data1",
            firmEmail : "deneme data1",
            projectName : "deneme data1",
            quotationNumber : "deneme data1",
            quotationDate : "deneme data1",
            representativeGSM : "deneme data1",
            quotationSpecialist : "deneme data1",
        },
        {
            _id : "deneme data2",
            firmName : "deneme data2",
            description : "deneme data2",
            firmAuthorizedPersonnel : "deneme data2",
            firmFhone : "deneme data2",
            firmEmail : "deneme data2",
            projectName : "deneme data2",
            quotationNumber : "deneme data2",
            quotationDate : "deneme data2",
            representativeGSM : "deneme data2",
            quotationSpecialist : "deneme data2",
        }
    ]
    //const { quotations} = useSelector((state) => state.armer);

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
            <Box sx={{ width: "100%", mt: 2 }}>
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
                                                        overflow:"hidden"
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
                                {expanded === quotation._id && <PatientDataProcessDetailTable quotationId={quotation._id} />}
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


export default PatientDataProcess;
