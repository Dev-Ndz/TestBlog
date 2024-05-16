export const formatDate = (timestamp: string): string => {
    let formatedDate: string = "";
    let date: Date = new Date(timestamp);
    const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const dayOfWeek: string = days[date.getDay()];
    const dateNumber: number = date.getDate();
    const month: string = months[date.getMonth()];
    const year: number = date.getFullYear();

    // Format hours and minutes with leading zeros
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');

    formatedDate = `${dayOfWeek} ${dateNumber} ${month} ${year} ${hours}:${minutes}`;
    
    return formatedDate;
}
