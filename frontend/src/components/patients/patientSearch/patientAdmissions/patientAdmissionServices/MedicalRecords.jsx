import { useState } from "react"
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const MedicalRecords = ({patinetAdmissionMedicalRecordsData, setPatinetAdmissionMedicalRecordsData}) => {

    const medicalRecordsHandleChange = (e) => {
        setPatinetAdmissionMedicalRecordsData({ ...patinetAdmissionMedicalRecordsData, [e.target.name]: e.target.value });
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Stack spacing={2}>
                <Item>
                    <TextField
                        sx={{ width: "70%" }}
                        label="Klinik Bulgular"
                        name="findings"
                        id="findings"
                        type="text"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={patinetAdmissionMedicalRecordsData?.findings}
                        onChange={medicalRecordsHandleChange}
                        InputLabelProps={{
                            shrink: true, // Etiketin her zaman görünmesini sağlar
                        }}
                    />
                </Item>
                <Item>
                    <TextField
                        sx={{ width: "70%" }}
                        label="Tanılar"
                        name="diagnoses"
                        id="diagnoses"
                        type="text"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={patinetAdmissionMedicalRecordsData?.diagnoses}
                        onChange={medicalRecordsHandleChange}
                        InputLabelProps={{
                            shrink: true, // Etiketin her zaman görünmesini sağlar
                        }}
                    />
                </Item>
                <Item>
                    <TextField
                        sx={{ width: "70%" }}
                        label="Tedaviler"
                        name="treatments"
                        id="treatments"
                        type="text"
                        multiline
                        rows={3}
                        variant="outlined"
                        value={patinetAdmissionMedicalRecordsData?.treatments}
                        onChange={medicalRecordsHandleChange}
                        InputLabelProps={{
                            shrink: true, // Etiketin her zaman görünmesini sağlar
                        }}
                    />
                </Item>
            </Stack>
        </Box>
    )
}

export default MedicalRecords