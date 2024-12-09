import React, { useEffect, useState } from 'react';
import { Container, TextField, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './PatientsDataGrid';
import useFetchPatient from "../../../services/useFetchPatient";
import PatientAdmissions from '../patientAdmissions/PatientAdmissions';
import NewPatientModal from '../NewPatientModal';
import { useSelector } from "react-redux";

const PatientsSearch = () => {


    const { userId } = useSelector(state => state.auth)
    const patientInfoInitialize = {
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
	}

    const [newPatientModalopen, setNewPatientModalopen] = useState(false)
	const newPatientModalHandleOpen = () => setNewPatientModalopen(true)
    const [patientInfo, setPatientInfo] = useState(patientInfoInitialize)

	const newPatientModalHandleClose = () => {
		setNewPatientModalopen(false)
        setPatientInfo(patientInfoInitialize)
	}
	

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
                    <Button sx={{ marginY: "10px" }} variant="contained" onClick={newPatientModalHandleOpen}>YENİ HASTA KAYDI</Button>
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
            			<NewPatientModal				
                        newPatientModalopen={newPatientModalopen}
                        newPatientModalHandleClose={newPatientModalHandleClose}                        
                        patientInfo={patientInfo}
                        setPatientInfo={setPatientInfo}
                        fetchPatient={fetchPatient}
                    />	
        </>
    )
}

export default PatientsSearch;