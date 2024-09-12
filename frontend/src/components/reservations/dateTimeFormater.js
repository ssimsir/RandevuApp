// Tarih ve saat bilgisini "gg.aa.yyyy ss:dd" formatında döndüren fonksiyon
export const dateTimeToString = (date) => {
   const dateDay = date.getDate().toString().padStart(2, '0');
   const dateMonth = (date.getMonth() + 1).toString().padStart(2, '0');
   const dateYear = date.getFullYear();
   const dateHours = date.getHours().toString().padStart(2, '0');
   const dateMinutes = date.getMinutes().toString().padStart(2, '0');
   
   return `${dateDay}.${dateMonth}.${dateYear} ${dateHours}:${dateMinutes}`;
};

// "gg.aa.yyyy ss:dd" formatındaki tarihi JavaScript Date nesnesine dönüştüren fonksiyon
export const parseDateString = (dateString) => {
   const [datePart, timePart] = dateString.split(' ');
   const [day, month, year] = datePart.split('.').map(Number);
   const [hours, minutes] = timePart.split(':').map(Number);

   return new Date(year, month - 1, day, hours, minutes);
   // JavaScript'te aylar 0 tabanlıdır, bu yüzden ayı 1 eksiltin
   // const localDate = new Date(year, month - 1, day, hours, minutes);

   // // Yerel zaman diliminde formatla
   // return localDate.toLocaleString('tr-TR', { 
   //    timeZone: 'Europe/Istanbul', // Türkiye zaman dilimi
   //    year: 'numeric',
   //    month: '2-digit',
   //    day: '2-digit',
   //    hour: '2-digit',
   //    minute: '2-digit',
   //    second: '2-digit',
   // });
};