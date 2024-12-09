import React, { useEffect, useState } from 'react';
import { Container, TextField, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './PatientsDataGrid';
import useFetchPatient from "../../../services/useFetchPatient";
import PatientAdmissions from '../patientAdmissions/PatientAdmissions';
import PatientModal from '../PatientsModal';
import { useSelector } from "react-redux";

const PatientsSearch = () => {

    const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => {
		setOpen(false)
	}
	const { userId } = useSelector(state => state.auth)
	const [info, setInfo] = useState({
		patientId: 0,
		userId: userId,
		name: "",
		surname: "",
		gender:"",
		idNumber: "",
		email: "",
		phoneNumber: "",
		companyName: "",
		iban: "",
		address: "",
		taxNumber: "",
		taxOffice: ""
	})



    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchPatient({ name: "", idNumber: "" });
            } catch (error) {
                console.error("Veri çekilirken hata oluştu:", error);
            }
        };

        fetchData();
    }, []);

    const { patients, fetchPatient, patientByPatientId, fetchPatientByPatientId, loading: patientLoading } = useFetchPatient();
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    // Filtreleme işlemi
    const handleSearch = () => {
        fetchPatient({ name: nameFilter.toLowerCase(), idNumber: idFilter });
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={5}>
                <Button sx={{ marginY: "10px" }} variant="contained" onClick={handleOpen}>YENİ MÜŞTERİ</Button>
                    <Box mb={1}  sx ={{ border: "1px solid #ddd", padding: "5px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Hasta Adı"
                                    variant="outlined"
                                    value={nameFilter}
                                    onChange={(e) => setNameFilter(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="TC Kimlik No"
                                    variant="outlined"
                                    type="number"
                                    value={idFilter}
                                    onChange={(e) => setIdFilter(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={1} mb={1}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSearch}
                                fullWidth
                            >
                                Ara
                            </Button>
                        </Box>
                    </Box>
                    <PatientsDataGrid 
                        patients={patients} 
                        patientLoadin={patientLoading} 
                        fetchPatientByPatientId= {fetchPatientByPatientId} 
                    />
                </Grid>
                <Grid item xs={7} >
                {patientByPatientId.length >0 ?
                    <PatientAdmissions
                        patientByPatientId = {patientByPatientId}
                        fetchPatientByPatientId = {fetchPatientByPatientId} 
                        patientLoading = {patientLoading} 
                    /> : <p>Hasta Seçiniz</p>}
                </Grid>
            </Grid>
            			<PatientModal				
                        handleClose={handleClose}
                        open={open}
                        info={info}
                        setInfo={setInfo}
                    />	
        </>
    )
}

export default PatientsSearch;