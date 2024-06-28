export function formatDate(date: Date): string {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(); //formato data
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1; //formato mese
    const year = date.getFullYear(); //formato anno

    return `${day}.${month}.${year}`; //ritorna il formato dd.mm.yyyy
}
