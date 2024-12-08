import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './PatientsDataGrid';
import useFetchPatient from "../../../services/useFetchPatient";
import PatientAdmissions from '../patientAdmissions/PatientAdmissions';
import useFetchPatientAdmission from '../../../services/useFetchPatientAdmission';

const PatientsSearch = () => {

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
        <Container maxWidth="xxl" style={{ marginTop: '5px', border: "1px solid black" }}>
            <Grid container spacing={2} sx={{ display: 'flex', alignItems:"center", justifyContent:"center" }} >
                <Grid item xs={5}>

                    <Box  style={{ border: "1px solid black", padding: "10px" }}>
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
                        <Box mt={2} mb={3}>
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
                <Grid item xs={7}>
                {patientByPatientId.length >0 ?
                    <PatientAdmissions
                        patientByPatientId = {patientByPatientId}
                        fetchPatientByPatientId = {fetchPatientByPatientId} 
                        patientLoading = {patientLoading} 
                    /> : <p>Hasta Seçiniz</p>}
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientsSearch;