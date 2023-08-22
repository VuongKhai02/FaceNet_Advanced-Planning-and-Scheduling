export const populationByRegions = [
    {
        region: "Asia",
        val: 4119626293,
    },
    {
        region: "Africa",
        val: 1012956064,
    },
    {
        region: "Northern America",
        val: 344124520,
    },
    {
        region: "Latin America and the Caribbean",
        val: 590946440,
    },
    {
        region: "Europe",
        val: 727082222,
    },
    {
        region: "Oceania",
        val: 35104756,
    },
];

export const dataSource = [
    {
        status: "Vượt tiến độ",
        complete: 5,
    },
    {
        status: "Hoàn thành",
        complete: 90,
    },
    {
        status: "Chậm tiến độ",
        complete: 10,
    },
    {
        status: "Đang sản xuất",
        complete: 5,
    },
];

const POData = [
    {
        state: "PO1",
        arise: 12,
        edit: 30,
        rightCustomer: 16,
    },
    {
        state: "PO2",
        arise: 15,
        edit: 10,
        rightCustomer: 88,
    },
    {
        state: "PO3",
        arise: 16,
        edit: 26,
        rightCustomer: 30,
    },
    {
        state: "PO4",
        arise: 32,
        edit: 37,
        rightCustomer: 36,
    },
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getPOData() {
        return POData;
    },
};
