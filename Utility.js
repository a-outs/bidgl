const datesAreOnSameDay = (first, second) => first.getFullYear() === second.getFullYear()
    && first.getMonth() === second.getMonth()
    && first.getDate() === second.getDate();

export default datesAreOnSameDay;
