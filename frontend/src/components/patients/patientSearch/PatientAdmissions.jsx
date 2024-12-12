import { useEffect, useState } from "react"
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
import NewPatientAdmissionModal from "./patientAdmissions/NewPatientAdmissionModal";

import { useSelector } from "react-redux";
import PatinetAdmissionServices from "./patientAdmissions/PatinetAdmissionServices";


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

const PatientAdmissions = ({ 
    patientByPatientId,
    fetchPatientByPatientId,
    patientLoading,
    
    
    quotationsData, setQuotationModalOpen, setQuotationInfo, quotationModalData, setQuotationModalData }) => 
{

    const [selectedPatient] = patientByPatientId
    const { userId } = useSelector((state) => state.auth);

    const genderColor = selectedPatient?.gender === "Male" ? blue[50] : pink[50];
    const genderAvatar = selectedPatient?.gender === "Male" ? avatarMale : avatarFemale;
    const patientId = selectedPatient?._id;
    const patientAdmissions = selectedPatient.patientAdmissions;

    const [expanded, setExpanded] = useState();

    const handleChange = (panel) => (event, newExpanded) => {
        if (event.target.tagName !== 'BUTTON' && event.target.tagName !== 'path' && event.target.tagName !== 'svg') {
            setExpanded(newExpanded ? panel : false);
            console.log(panel)
        }
    };

    useEffect(() => {
        setExpanded(patientAdmissions[0]?._id || 1)
    },[patientAdmissions] )
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

    /*-----New Patient Admission Modal------*/
    const [newPatientAdmissionModalOpen, setNewPatientAdmissionModalOpen] = useState(false)
    const [patientAdmissionInfo, setPatientAdmissionInfo] = useState({
        userId:"",
        patientId:"",
        admissionDate: "",
        doctorId: ""
    })
    const newPatientAdmissionModalHandleOpen = () => {
        setPatientAdmissionInfo({
            userId,
            patientId,
            admissionDate: new Date().toISOString().split("T")[0],
            doctorId: ""
        })
        setNewPatientAdmissionModalOpen(true)
    }
    const newPatientAdmissionModalHandleClose = () => setNewPatientAdmissionModalOpen(false)
    /*-----New Patient Admission Modal------*/
    if (!selectedPatient?._id) return (<p>Hasta Seçiniz</p>)
    if (patientLoading) return (<p>Yükleniyor</p>)
    return (
        <>
            <Box sx={{
                width: "100%",
                //mt: 2,

               
                border: '1px solid #ccc',

            }}>
                <Box sx={{ padding: 1 }}>
                    <Card sx={{ minWidth: 500, boxShadow: 3, backgroundColor: genderColor, color: grey[800] }}>
                        <CardContent>
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <Avatar
                                    sx={{ width: 120, height: 120, border: `2px solid ${genderColor}`, marginRight: 2 }}
                                    src={genderAvatar}
                                    alt="Patient Avatar"
                                />
                                <Box sx={{ width: "100%", display: "flex", alignItems: "start", justifyContent: "space-between", marginRight: "100px" }}>
                                    <Box>
                                        <Typography >
                                            <strong>Adı:</strong> {selectedPatient?.name}
                                        </Typography>
                                        <Typography>
                                            <strong>Soyadı:</strong> {selectedPatient?.surname}
                                        </Typography>
                                        <Typography>
                                            <strong>Kimlik No:</strong> {selectedPatient?.idNumber}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography>
                                            <strong>Email:</strong> {selectedPatient?.email}
                                        </Typography>
                                        <Typography>
                                            <strong>Telefon:</strong> {selectedPatient?.phoneNumber}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                    <Button
                        sx={{ width: { xs: '100%', sm: 'auto' }, marginTop: "10px" }}
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={newPatientAdmissionModalHandleOpen}
                    >
                        Yeni Protokol                        
                    </Button>

                </Box>
                <Box sx={{
                width: "100%",
                //mt: 2,
                height: 'calc(90vh - 227px)',
                overflowY: 'auto', // Yalnızca dikey kaydırma                
                padding: '5px',
            }}>
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
                                            {patientAdmission.doctorId}
                                        </Typography>

                                        <Box sx={{ width: { xs: "100%", sm: "auto" }, display: "flex", justifyContent: "start", alignItems: "center", mt: { xs: 2, sm: 0 } }}>
                                            <Button
                                                sx={{ marginRight: '10px', width: { xs: '100%', sm: 'auto' } }}
                                                variant="contained"
                                                startIcon={<EditIcon />}
                                                //onClick={() => { setQuotationModalOpen(true); setQuotationInfo(patientAdmission) }}
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
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <PatientAdmissionInfoTable patientAdmission={patientAdmission} />                                            
                                            </Grid>
                                            {/* <Grid item xs={12} sm={12} md={6} lg={4}>
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
                                                    value={patientAdmission.description}
                                                    disabled
                                                />
                                            </Grid> */}
                                        </Grid>
                                    </Box>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                {expanded === patientAdmission._id && <PatinetAdmissionServices patientId={patientId} patientAdmissionId={patientAdmission._id}/>}
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
                </Box>
            </Box>

            <NewPatientAdmissionModal
                newPatientAdmissionModalHandleClose={newPatientAdmissionModalHandleClose}
                newPatientAdmissionModalOpen={newPatientAdmissionModalOpen}
                patientAdmissionInfo={patientAdmissionInfo}
                setPatientAdmissionInfo={setPatientAdmissionInfo}
                fetchPatientByPatientId={fetchPatientByPatientId}
            />
        </>
    );
};

// Separate component for displaying patientAdmission details

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

const PatientAdmissionInfoTable = ({ patientAdmission }) => (
    <StyledTable>
        <TableBody>
            <TableRow>            
                <TableCell>Kayıt Tarihi</TableCell>
                <TableCell>{new Date(patientAdmission.admissionDate).toLocaleDateString("tr-TR")}</TableCell>                
                <TableCell>Protokol Numarası</TableCell>
                <TableCell>{patientAdmission.protocolNumber}</TableCell>
            </TableRow>
        </TableBody>
    </StyledTable>
);

export default PatientAdmissions;
