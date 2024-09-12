export const dateTimeToString = (date) => {
   const dateDay =
         date.getDate() < 10 ? "0" + date.getDate() : date.getDate(),
      dateMounth =
         date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1,
      dateYear =
         date.getFullYear() < 10
            ? "0" + date.getFullYear()
            : date.getFullYear(),
      dateHours =
         date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
      dateMinutes =
         date.getMinutes() < 10
            ? "0" + date.getMinutes()
            : date.getMinutes();
   return `${dateDay}.${dateMounth}.${dateYear} ${dateHours}:${dateMinutes}`
};


export const parseDateString = (dateString) => {

   
   const [datePart, timePart] = dateString.split(' ');
   const [day, month, year] = datePart.split('.').map(Number);
   const [hours, minutes] = timePart.split(':').map(Number);
 
   // JavaScript'te aylar 0 tabanlıdır, bu yüzden ayı 1 eksiltin
   return new Date(year, month - 1, day, hours, minutes);
 }