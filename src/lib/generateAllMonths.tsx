
export const generateAllMonths = (data: { month: number, total: number }[]): { month: string, total: number }[] => {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const result = months?.map((item, i) => (data.find(el => (el.month) === (i)) ? ({ month: item, total: data.find(el => el.month === i)?.total ?? 0 }) : ({ month: item, total: 0 })))
    return result.slice(1);
}