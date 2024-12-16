import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const PatinetAdmissionPaymentReceiptPdfModal = ({ 
    patinetAdmissionPaymentReceiptPdfModalOpen,
    setPatinetAdmissionPaymentReceiptPdfModalOpen,
    patinetAdmissionPaymentReceiptPdfUrl,
    setPatinetAdmissionPaymentReceiptPdfUrl,
}) => {

    const pdfModalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        height: '80%',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 2,
        display: 'flex',
        flexDirection: 'column'
    };

    const patinetAdmissionPaymentReceiptPdfModalCloseHandle = () => {
        setPatinetAdmissionPaymentReceiptPdfModalOpen(false);
        // URL'yi temizleyin
        if (patinetAdmissionPaymentReceiptPdfUrl) {
            URL.revokeObjectURL(patinetAdmissionPaymentReceiptPdfUrl);
            setPatinetAdmissionPaymentReceiptPdfUrl('');
        }
    };

    return (
        <Modal 
            open={patinetAdmissionPaymentReceiptPdfModalOpen} 
            onClose={patinetAdmissionPaymentReceiptPdfModalCloseHandle}
        >
            <Box sx={pdfModalStyle}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <IconButton onClick={patinetAdmissionPaymentReceiptPdfModalCloseHandle}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <iframe
                    src={patinetAdmissionPaymentReceiptPdfUrl}
                    width="100%"
                    height="100%"
                    title="PDF Document"
                />
            </Box>
        </Modal>
    );
}

export default PatinetAdmissionPaymentReceiptPdfModal;
