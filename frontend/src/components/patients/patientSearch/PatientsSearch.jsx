import React, { useEffect, useState } from 'react';
import { Container, TextField, Typography, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './PatientsDataGrid';
import useFetchPatient from "../../../services/useFetchPatient";

const PatientsSearch = () => {
    const { patients, fetchPatient, loading: patientLoading } = useFetchPatient();
    const [nameFilter, setNameFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    // Filtreleme işlemi
    const handleSearch = () => {
        fetchPatient({ name: nameFilter.toLowerCase(), idNumber: idFilter });

    };

    return (
        <Container maxWidth="sm" style={{ marginTop: '5px', border: "1px solid black" }}>
            <Box mt={2} mb={3} style={{ border: "1px solid black", padding: "10px" }}>
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
        </Container>
    )
}

export default PatientsSearch;