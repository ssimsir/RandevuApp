import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './PatientsDataGrid';
import useFetchPatient from "../../../services/useFetchPatient";
import PatientAdmissions from '../patientAdmissions/PatientAdmissions';
import AddIcon from "@mui/icons-material/Add";

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

    const { patients, fetchPatient, loading: patientLoading } = useFetchPatient();
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
                    <PatientsDataGrid patients={patients} patientLoadin={patientLoading} />
                </Grid>
                <Grid item xs={7}>
                    <Button
                        sx={{ marginRight: '10px', width: { xs: '100%', sm: 'auto' } }}
                        variant="contained"
                        startIcon={<AddIcon />}
                        // onClick={() => { setQuotationModalOpen(true); setQuotationInfo(quotation) }}
                    >
                        Yeni Kayıt Oluştur
                    </Button>
                    <PatientAdmissions />
                </Grid>
            </Grid>
        </Container>
    )
}

export default PatientsSearch;