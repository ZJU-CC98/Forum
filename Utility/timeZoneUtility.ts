export function isoTime2LocalTime(isoTime: string,mode:number): string {
    let localTime = new Date(isoTime);

    switch (mode) {
        case 0: // 日期 精确到天
            return localTime.toLocaleDateString([], {  year: 'numeric', month: '2-digit', day: '2-digit' });
        case 1: // 日期 精确到分钟
            return localTime.toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit' ,hour: '2-digit', minute: '2-digit' });
        default:
            return localTime.toLocaleString([], {  year: 'numeric', month: '2-digit', day: '2-digit' });
    }


}