export const addMonthsFromNow = (months: number): number => {
    const now = new Date();
    now.setMonth(now.getMonth() + months);
    return Math.floor(now.getTime() / 1000);
};

export const addYearsFromNow = (years: number): number => {
    const now = new Date();
    now.setFullYear(now.getFullYear() + years);
    return Math.floor(now.getTime() / 1000);
};
