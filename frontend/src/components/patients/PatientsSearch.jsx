import React, { useEffect, useState } from 'react';
import { Container, TextField, Box, Button, Grid } from '@mui/material';
import PatientsDataGrid from './patientSearch/PatientsDataGrid';
import useFetchPatient from "../../services/useFetchPatient";
import PatientAdmissions from './patientSearch/PatientAdmissions';
import NewPatientModal from './patientSearch/NewPatientModal';
import { useSelector } from "react-redux";
import useFetchPatientAdmission from '../../services/useFetchPatientAdmission';

const PatientsSearch = () => {


    const { userId } = useSelector(state => state.auth)
    const patientInfoInitialState = {
        patientId: 0,
        userId: userId,

        idNumber: "",
        name: "",
        surname: "",
        birthDate: "",
        gender: "",
        email: "",
        gsmNumber: "",
        motherName: "",
        fatherName: "",
        address: "",
        infoMessage: "",
    }

    const [newPatientModalopen, setNewPatientModalopen] = useState(false)
    const [patientInfo, setPatientInfo] = useState(patientInfoInitialState)

    const newPatientModalHandleOpen = () => setNewPatientModalopen(true)
    const newPatientModalHandleClose = () => {
        setNewPatientModalopen(false)
        setPatientInfo(patientInfoInitialState)
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
    const {patientAdmissionsByPatientId, fetchPatientAdmissionByPatientId, loading: patientAdmissionLoading} = useFetchPatientAdmission();

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
                    <Box mb={1} sx={{ border: "1px solid #ddd", padding: "5px" }}>
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
                                
                            >
                                Ara
                            </Button>
                        </Box>
                    </Box>
                    <PatientsDataGrid
                        patients={patients}
                        patientLoadin={patientLoading}
                        fetchPatientByPatientId={fetchPatientByPatientId}
                        fetchPatientAdmissionByPatientId = {fetchPatientAdmissionByPatientId}
                    />
                </Grid>
                <Grid item xs={7} >
                    {patientByPatientId ?
                        <PatientAdmissions
                            patientByPatientId={patientByPatientId}                            
                            fetchPatientAdmissionByPatientId={fetchPatientAdmissionByPatientId}
                            patientLoading={patientLoading}
                            patientAdmissionsByPatientId = {patientAdmissionsByPatientId}                         
                            patientAdmissionLoading = {patientAdmissionLoading}
                        /> : <h1 style={{textAlign:"center"}}>Hasta Seçiniz</h1>}
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