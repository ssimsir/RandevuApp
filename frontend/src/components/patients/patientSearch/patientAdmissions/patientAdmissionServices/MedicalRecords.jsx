import * as React from 'react';
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

const MedicalRecords = () => {

    return (
        <Box sx={{ width: '100%' }}>
            <Button >Kayıt</Button>
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
                    //value={patientInfo?.infoMessage}
                    //onChange={handleChange}							
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
                    //value={patientInfo?.infoMessage}
                    //onChange={handleChange}							
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
                    //value={patientInfo?.infoMessage}
                    //onChange={handleChange}							
                    />
                </Item>
            </Stack>
        </Box>
    )
}

export default MedicalRecords