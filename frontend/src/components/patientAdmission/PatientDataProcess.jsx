import { useEffect, useState } from "react"
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
import useFetchPatientAdmission from "../../services/useFetchPatientAdmission";

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

const PatientDataProcess = ({ patientAdmissions, patientId, setPatientId, setQuotationModalOpen, setQuotationInfo, patientAdmissionModalData, setQuotationModalData }) => {
    
    useEffect(() => {
        // Bileşen yüklendiğinde ürün gruplarını çek
        //fetchPatientAdmission();
    }, []);

    console.log(patientAdmissions);

    if (patientAdmissions.length === 0 ) {
        patientAdmissions[0] = {
            "_id": "",
            "userId": "66e2c3a6f19283216a784693",
            "patientId": "671428c67690e0de6f4c3b3b",
            "admissionDate": "2024-10-09T05:15:00.000Z",
            "admissionNumber": 1,
            "examinationType": "general",
            "createdAt": "2024-11-29T20:58:10.714Z",
            "updatedAt": "2024-11-29T20:58:10.714Z",
            "__v": 0
        }
    }

    const [expanded, setExpanded] = useState(patientAdmissions[0]._id);

    const handleChange = (panel) => (event, newExpanded) => {
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'path' && event.target.tagName !== 'svg') {
            setExpanded(newExpanded ? panel : false);
        }
    };

    const { axiosToken } = useAxios()

    return (
        <>
            <Box sx={{ width: "100%", mt: 2 }}>
                {
                    patientAdmissions.map((patientAdmission) => (
                        <Accordion
                            key={patientAdmission._id + "-key"}
                            expanded={expanded === patientAdmission._id}
                            onChange={handleChange(patientAdmission._id)}
                            sx={{
                                width: "100%", // Tam genişlik
                                // [theme.breakpoints.down('sm')]: {
                                //     padding: '8px', // Küçük ekranlar için ekstra padding
                                // }
                            }}
                        >
                            <AccordionSummary
                                aria-controls={patientAdmission._id + "-content"}
                                id={patientAdmission._id + "-header"}
                            >
                                <Box sx={{ width: "100%", mt: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "end" }}>
                                    <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap' }}>
                                        <Typography variant="h4" sx={{ fontSize: { xs: '1.2rem', sm: '2rem', md: '2.5rem' } }}>
                                            {patientAdmission.firmName}
                                        </Typography>

                                        <Box sx={{ width: { xs: "100%", sm: "auto" }, display: "flex", justifyContent: "start", alignItems: "center", mt: { xs: 2, sm: 0 } }}>
                                            <Button
                                                sx={{ marginRight: '10px', width: { xs: '100%', sm: 'auto' } }}
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                onClick={() => { setQuotationModalOpen(true); setQuotationInfo(patientAdmission) }}
                                            >
                                                GÜNCELLE
                                            </Button>
                                            <Button
                                                sx={{ width: { xs: '100%', sm: 'auto' } }}
                                                variant="contained"
                                                startIcon={<DeleteIcon />}
                                                //onClick={() => { window.confirm(`${patientAdmission.firmName} Teklifi Silinecektir Eminmisiniz ?`) && deleteQuotation(patientAdmission._id) }}
                                            >
                                                SİL
                                            </Button>
                                        </Box>
                                    </Box>
                                    <Box sx={{ width: "100%", mt: 1, display: "flex", justifyContent: "space-between" }}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <QuotationFirmInfoTable patientAdmission={patientAdmission} />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                                <QuotationInfoTable patientAdmission={patientAdmission} />
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
                                                    value={patientAdmission.description}
                                                    disabled
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {expanded === patientAdmission._id && <PatientDataProcessDetailTable patientAdmissionId={patientAdmission._id} />}
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </Box>
        </>
    );
};

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

const QuotationFirmInfoTable = ({ patientAdmission }) => (
    <StyledTable>
        <TableBody>
            <TableRow>
                <TableCell>FİRMA YETKİLİSİ</TableCell>
                <TableCell>{patientAdmission.firmAuthorizedPersonnel}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TELEFON/FAKS</TableCell>
                <TableCell>{patientAdmission.firmFhone}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>E-MAIL</TableCell>
                <TableCell>{patientAdmission.firmEmail}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>PROJE ADI</TableCell>
                <TableCell>{patientAdmission.projectName}</TableCell>
            </TableRow>
        </TableBody>
    </StyledTable>
);


const QuotationInfoTable = ({ patientAdmission }) => (
    <StyledTable>
        <TableBody>
            <TableRow>
                <TableCell>TEKLİF NO</TableCell>
                <TableCell>{patientAdmission.patientAdmissionNumber}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEKLİF TARİHİ</TableCell>
                <TableCell>{new Date(patientAdmission.patientAdmissionDate).toLocaleDateString("tr-TR")}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEMSİLCİ GSM</TableCell>
                <TableCell>{patientAdmission.representativeGSM}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>TEKLİFİ HAZIRLAYAN</TableCell>
                <TableCell>{patientAdmission.patientAdmissionSpecialist}</TableCell>
            </TableRow>
        </TableBody>
    </StyledTable>
);


export default PatientDataProcess;
