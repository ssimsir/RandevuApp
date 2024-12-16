// Import jsPDF and autoTable libraries
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  getArmerLogoImage,
  getFacebookLogoBase64,
  getInstagramLogoBase64,
  getGoldagiLogoBase64,
  getOznurkabloLogoBase64,
  getHeskabloLogoBase64,
  getNexansLogoBase64,
  getPrysmianLogoBase64,
  getAlveskabloLogoBase64,
  getAkabloLogoBase64,
  getPektaskabloLogoBase64,
  getkockabloLogoBase64,
} from "./pdfImagesBase64";

import {
  getRobotoNormalBase64,
  getRobotoItalicsBase64,
  getRobotoBoldBase64,
  getRobotoBolditalicsBase64,
} from "./pdfFontsBase64";

// Function to create the PDF
const useReceiptPdfDesing = () => {
  const receiptPdfDesing = (quotation) => {
    const doc = new jsPDF({ filters: ["ASCIIHexEncode"] });

          doc.addFileToVFS("Roboto-Regular.ttf", getRobotoNormalBase64());
      doc.addFileToVFS("Roboto-Bold.ttf", getRobotoBoldBase64());
      doc.addFileToVFS("Roboto-Italic.ttf", getRobotoItalicsBase64());
      doc.addFileToVFS("Roboto-BoldItalic.ttf", getRobotoBolditalicsBase64());

      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
      doc.addFont("Roboto-Italic.ttf", "Roboto", "italic");
      doc.addFont("Roboto-BoldItalic.ttf", "Roboto", "bolditalic");

      const pageWidth = doc.internal.pageSize.getWidth();

      const firstLineX = 5;
      const secondLineX = 23;

      doc.setFont("Roboto");
      doc.setTextColor(41, 128, 186);
      doc.setFontSize(14);
      doc.text("Tahsilat Makbuzu yapım aşamasında", firstLineX, 10);



    // if (quotation.quotationDetails.length > 0) {

    //   doc.addFileToVFS("Roboto-Regular.ttf", getRobotoNormalBase64());
    //   doc.addFileToVFS("Roboto-Bold.ttf", getRobotoBoldBase64());
    //   doc.addFileToVFS("Roboto-Italic.ttf", getRobotoItalicsBase64());
    //   doc.addFileToVFS("Roboto-BoldItalic.ttf", getRobotoBolditalicsBase64());

    //   doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
    //   doc.addFont("Roboto-Bold.ttf", "Roboto", "bold");
    //   doc.addFont("Roboto-Italic.ttf", "Roboto", "italic");
    //   doc.addFont("Roboto-BoldItalic.ttf", "Roboto", "bolditalic");

    //   const pageWidth = doc.internal.pageSize.getWidth();

    //   const firstLineX = 5;
    //   const secondLineX = 23;

    //   doc.setFont("Roboto");
    //   doc.setTextColor(41, 128, 186);
    //   doc.setFontSize(14);
    //   doc.text("ARMER KABLO", firstLineX, 10);

    //   // Add company details
    //   doc.setFontSize(9);

    //   doc.setTextColor(255, 0, 0);
    //   doc.text("ADRES:", firstLineX, 16);
    //   doc.setTextColor(0, 0, 0);
    //   doc.text("Çerkezköy/TEKİRDAĞ", secondLineX, 16);

    //   doc.setTextColor(255, 0, 0);
    //   doc.text("TELEFON:", firstLineX, 22);
    //   doc.setTextColor(0, 0, 0);
    //   doc.text("(541) 158-6632", secondLineX, 22);

    //   doc.setTextColor(255, 0, 0);
    //   doc.text("E-MAIL:", firstLineX, 28);
    //   doc.setTextColor(0, 0, 0);
    //   doc.text("info@armerkablo.com", secondLineX, 28);

    //   doc.setTextColor(255, 0, 0);
    //   doc.text("WEB:", firstLineX, 34);
    //   doc.setTextColor(0, 0, 0);
    //   doc.text("www.armerkablo.com", secondLineX, 34);

    //   doc.addImage(getArmerLogoImage(), "PNG", 150, 5, 45, 40);

    //   doc.addImage(getFacebookLogoBase64(), "PNG", 10, 38, 7, 7);
    //   doc.text("ArmerKablo", 20, 44);

    //   doc.addImage(getInstagramLogoBase64(), "PNG", 45, 38, 12, 8);
    //   doc.text("armer.kablo", 58, 44);

    //   doc.setTextColor(41, 128, 186);
    //   doc.text("TEKLİF/SİPARİŞ FORMU", 90, 50);

    //   doc.line(firstLineX, 51, pageWidth - firstLineX, 51);

    //   doc.setTextColor(0, 0, 0);

    //   doc.text("FİRMA", firstLineX, 57);
    //   doc.text("YETKİLİSİ", firstLineX, 62);
    //   doc.text("TELEFON/FAX", firstLineX, 67);
    //   doc.text("E-MAİL", firstLineX, 72);
    //   doc.text("PROJE ADI", firstLineX, 77);

    //   doc.text(quotation.firmName, 30, 57);
    //   doc.text(quotation.firmAuthorizedPersonnel, 30, 62);
    //   doc.text(quotation.firmFhone, 30, 67);
    //   doc.text(quotation.firmEmail, 30, 72);
    //   doc.text(quotation.projectName, 30, 77);

    //   doc.text("TEKLİF NO", 135, 57);
    //   doc.text("TEKLİF TARİHİ", 135, 62);
    //   doc.text("TEMSİLCİ GSM", 135, 67);
    //   doc.text("TEKLİFİ HAZIRLAYAN", 135, 72);

    //   doc.text(quotation.quotationNumber.toString(), 170, 57);
    //   doc.text(
    //     new Date(quotation.quotationDate).toLocaleDateString("tr-TR"),
    //     170,
    //     62
    //   );
    //   doc.text(quotation.representativeGSM, 170, 67);
    //   doc.text(quotation.quotationSpecialist, 170, 72);

    //   // Define table data (example)
    //   const columns = [
    //     "ÜRÜN",
    //     "MARKA",
    //     "RENK",
    //     "AMBALAJ",
    //     "TESLİM",
    //     "LİSTE",
    //     "METRE",
    //     "İSKONTO",
    //     "NET FİYAT",
    //     "TUTAR",
    //   ];
    //   const rows = quotation.quotationDetails.map((quotationDetail) => {
    //     return [
    //       quotationDetail.product,
    //       quotationDetail.brand,
    //       quotationDetail.color,
    //       quotationDetail.cablePackage,
    //       quotationDetail.delivery,
    //       quotationDetail.unitPrice,
    //       quotationDetail.quantity,
    //       quotationDetail.discount,
    //       quotationDetail.discountedPrice,
    //       quotationDetail.amount,
    //     ];
    //   });

    //   // Add table using autoTable
    //   doc.autoTable({
    //     head: [columns],
    //     body: rows,
    //     margin: { top: 80, left: 5 },
    //     headStyles: {
    //       fillColor: [255, 255, 0], // Arka plan rengi (hex: #BFBFBF)
    //       textColor: [41, 128, 186], // Font rengi (siyah)
    //       fontStyle: "bold", // Kalın font
    //       font: "Roboto",
    //     },
    //     styles: {
    //       halign: "center", // 'left', 'right', 'center' ile hizalama yapabilirsin
    //       fontSize: 7,
    //       font: "Roboto",
    //     },
    //     columnStyles: {
    //       0: { cellWidth: 30, halign: "center" }, // Ürün
    //       1: { cellWidth: 20, halign: "center" }, // Marka
    //       2: { cellWidth: 17, halign: "center" }, // Renk
    //       3: { cellWidth: 17, halign: "center" }, // Ambalaj
    //       4: { cellWidth: 17, halign: "center" }, // Telim
    //       5: { cellWidth: 22, halign: "right" }, // Liste
    //       6: { cellWidth: 17, halign: "right" }, // Metre
    //       7: { cellWidth: 15, halign: "right" }, // İskonto
    //       8: { cellWidth: 22, halign: "right" }, // Net Fiyat
    //       9: { cellWidth: 22, halign: "right" }, // Tutar
    //     },
    //   });

    //   doc.line(114, 218, pageWidth - firstLineX, 218);
    //   doc.text("ARA TOPLAM", 114, 222);
    //   doc.text("KDV 20%", 114, 227);
    //   doc.text("GENEL TOPLAM", 114, 232);

    //   const totalAmountWidth = doc.getTextWidth(quotation.totalAmount);
    //   const kdvAmountWidth = doc.getTextWidth(quotation.kdvAmount);
    //   const totalAmountWithKDVWidth = doc.getTextWidth(
    //     quotation.totalAmountWithKDV
    //   );

    //   doc.text(
    //     quotation.totalAmount,
    //     pageWidth - totalAmountWidth - firstLineX,
    //     222
    //   );
    //   doc.text(
    //     quotation.kdvAmount,
    //     pageWidth - kdvAmountWidth - firstLineX,
    //     227
    //   );
    //   doc.text(
    //     quotation.totalAmountWithKDV,
    //     pageWidth - totalAmountWithKDVWidth - firstLineX,
    //     232
    //   );

    //   doc.rect(firstLineX, 212, 65, 24); // 'F' dolgu modu anlamına gelir
    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(7);
    //   doc.text("MÜŞTERİ KAŞE İMZA", 22, 215);

    //   doc.setFillColor(191, 191, 191);
    //   doc.rect(firstLineX, 238, 65, 20, "F"); // 'F' dolgu modu anlamına gelir

    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(9);
    //   doc.text("AÇIKLAMALAR", firstLineX + 1, 242);
    //   doc.line(firstLineX, 243, 45, 243);

    //   doc.text("OPSİYON", firstLineX + 1, 248);
    //   doc.text("ÖDEME GÜNÜ", firstLineX + 1, 252);
    //   doc.text("TESLİM ŞEKLİ", firstLineX + 1, 256);

    //   doc.text("YOK", firstLineX + 25, 248);
    //   doc.text("90 GÜN", firstLineX + 25, 252);
    //   doc.text("İSTANBUL AMBAR", firstLineX + 25, 256);

    //   if (quotation.description) {
    //     doc.rect(114, 238, 65, 20);
    //     doc.text("NOT : ", 115, 242);
    //     const lines = quotation.description.split("\n");
    //     doc.text(lines, 120, 247);
    //   }

    //   doc.setTextColor(0, 0, 0);
    //   doc.setFontSize(7);
    //   doc.text(
    //     "** KABLO BOYLARINDA ( + , - ) % 5 BOY TÖLERANSIMIZ GEÇERLİDİR .",
    //     firstLineX,
    //     262
    //   );
    //   doc.text(
    //     "** SİPARİŞTE ÖDEME VADESİNE UYGUN MÜŞTERİ ÇEK/ÇEKLERİNİZ TALEP EDİLECEKTİR.",
    //     firstLineX,
    //     265
    //   );
    //   doc.text(
    //     "** AKSİ BELİRTİLMEDİKÇE NAKLİYE MÜŞTERİYE AİTTİR.",
    //     firstLineX,
    //     268
    //   );
    //   doc.text(
    //     "** VERMİŞ OLDUĞUMUZ TEKLİF BİR BÜTÜNDÜR BÖLÜNEMEZ , KISMİ SİPARİŞLERDE MUTLAKA FİRMAMIZIN MUTABAKATI ALINMALIDIR .",
    //     firstLineX,
    //     271
    //   );
    //   doc.text(
    //     "** ÖDEMESİ ALINMAMIŞ SİPARİŞLERİ İPTAL ETME HAKKIMIZ SAKLIDIR , NAKLİYEDEN KAYNAKLI GECİKMELERDEN FİRMAMIZ SORUMLU DEĞİLDİR.",
    //     firstLineX,
    //     274
    //   );
    //   doc.text(
    //     "** İŞ BU SÖZLEŞME ŞİRKET YETKİLİSİ TARAFINDAN İMZALANIP KAŞELENMEK SURETİYLE BELİRTİLEN TÜM ŞARTLAR KABUL EDİLMİŞ OLDUĞUNU İFADE EDER.",
    //     firstLineX,
    //     277
    //   );

    //   const imageHeight = 280;
    //   doc.addImage(getGoldagiLogoBase64(), "PNG", 5, imageHeight, 40, 10);
    //   doc.addImage(getOznurkabloLogoBase64(), "PNG", 46, imageHeight, 20, 10);
    //   doc.addImage(getHeskabloLogoBase64(), "PNG", 67, imageHeight, 10, 10);
    //   doc.addImage(getNexansLogoBase64(), "PNG", 78, imageHeight, 35, 10);
    //   doc.addImage(getPrysmianLogoBase64(), "PNG", 114, imageHeight, 20, 10);
    //   doc.addImage(getAlveskabloLogoBase64(), "PNG", 135, imageHeight, 25, 10);
    //   doc.addImage(getAkabloLogoBase64(), "PNG", 161, imageHeight, 12, 10);
    //   doc.addImage(getPektaskabloLogoBase64(), "PNG", 174, imageHeight, 12, 10);
    //   doc.addImage(getkockabloLogoBase64(), "PNG", 187, imageHeight, 15, 10);
      
    // }
    return doc;
  };
  return { receiptPdfDesing };
};

export default useReceiptPdfDesing;

// Call the function
