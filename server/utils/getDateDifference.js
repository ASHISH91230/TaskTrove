exports.getDateDifference=(date1,date2)=>{
    const oneDay = 1000 * 60 * 60 * 24;
    const date1DatePart = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const date2DatePart = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    const diffInTime = date1DatePart - date2DatePart;
    return Math.floor(diffInTime / oneDay);
}