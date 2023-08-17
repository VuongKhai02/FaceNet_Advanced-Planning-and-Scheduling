enum StatusApproveEnum {
    "Bản nháp" = "0",
    "Chờ duyệt ĐNL" = "1",
    "Chờ gửi đối chiếu NVL" = "2",
    "Đã gửi SAP" = "3",
    "Bị từ chối" = "4",
    "Đã gửi SAP, MES" = "5",
    "Đã gửi MES" = "6",
}

enum StatusEq {
    "Active" = "1",
    "InActive" = "0",
}

enum TransactionType {
    "Xuất kho sản xuất" = "ISSUE",
    "Chuyển kho nội bộ" = "TRANSFER",
    "Nhập kho sản xuất" = "REPORT",
    "Nhập khác" = "GoodReceipt",
    "Xuất khác" = "GoodIssue",
}

enum Roles {
    "admin" = "admin",
    "them_sua_xoa" = "them_sua_xoa",
    "qly_doi_chieu" = "qly_doi_chieu",
    "phe_duyet" = "phe_duyet",
    "qly_DNL" = "qly_DNL",
}

enum ReturnMaterialStatuses {
    "Bản thảo" = 0,
    "Đã gửi yêu cầu trả NVL" = 1,
    "Bị từ chối" = 2,
    "Chờ duyệt trả kho" = 3,
    "Đã gửi SAP" = 4,
    "Đã gửi MES" = 5,
    "Đã gửi SAP, MES" = 6,
}

export { StatusApproveEnum, TransactionType, Roles, ReturnMaterialStatuses, StatusEq };
