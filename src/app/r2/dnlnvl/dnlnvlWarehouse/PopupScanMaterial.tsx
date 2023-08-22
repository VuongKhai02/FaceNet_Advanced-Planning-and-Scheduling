import { Button } from "devextreme-react";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import _ from "lodash";
import { DnlnvlMaterialScanFail } from "../../../../jmix/entities/DnlnvlMaterialScanFail";
import { DnlnvlDetailDetail } from "../../../../jmix/entities/DnlnvlDetailDetail";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";
import { useDebounced, useWindowDimensions } from "../../../../hooks";

type PopupScanMaterialProps = {
    dnlnvlDetailDetails: DnlnvlDetailDetail[];
    updateStatusMaterial: (status: number, dnlnvlDetailDetailId: string | undefined, scanCheck: number) => void;
    updateScanFail: (materialScanFail: DnlnvlMaterialScanFail) => void;
    updateFocusRow: (material: string | undefined) => void;
};

const PopupScanMaterial = ({ dnlnvlDetailDetails, updateStatusMaterial, updateScanFail, updateFocusRow }: PopupScanMaterialProps) => {
    const [scanCode, setScanCode] = useState<string>("");
    const [focusInput, setFocusInput] = useState<boolean>(false);
    const debouncedScanCode = useDebounced<string>(scanCode, 500);
    const inputScanCodeRef = useRef<HTMLInputElement>(null);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (debouncedScanCode) {
            onScancodeFinish(debouncedScanCode);
        }
    }, [debouncedScanCode]);

    const onScanCodeChange = (e) => {
        setScanCode(e.target.value);
    };

    const onScancodeFinish = (scanString) => {
        if (scanString) {
            // console.log(scanString, "scanString")
            const material_part = scanString.split("#");
            const keyOfMaterialScanning = [
                "materialName",
                "partNumber",
                "vendor",
                "lot",
                "userData1",
                "userData2",
                "userData3",
                "userData4",
                "poCode",
                "quantity",
                "msl",
                "storageUnit",
                "expirationDate",
                "mfgDate",
                "sapCode",
            ];
            const materialScanning: DnlnvlMaterialScanFail = _.zipObject(keyOfMaterialScanning, material_part);
            // console.log(materialScanning, material_part)
            materialScanning.quantity = Number(materialScanning.quantity);
            materialScanning.sapCode = Number(materialScanning.sapCode);
            materialScanning.expirationDate = moment(materialScanning.expirationDate, "YYYYMMDD").toDate();
            materialScanning.mfgDate = moment(materialScanning.mfgDate, "YYYYMMDD").toDate();
            const materialValid = dnlnvlDetailDetails.find((dnlnvlDetailDetail) => {
                return dnlnvlDetailDetail.materialName === materialScanning.materialName;
            });
            if (materialValid) {
                // console.log(materialValid.id as string);
                updateStatusMaterial(1, materialValid.id, 1);
                updateFocusRow(materialValid.material);
                toastSuccess("Scan nguyên vật liệu thành công");
            } else {
                updateScanFail(materialScanning);
                toastError("Nguyên vật liệu không tồn tại trong đề nghị lĩnh");
            }
            setScanCode("");
        }
    };
    return (
        <>
            <Button
                text={"Scan nguyên vật liệu"}
                style={{
                    color: "#fff",
                    background: "rgba(31, 110, 229, 1)",
                    borderRadius: 8,
                    padding: "8px 4px",
                    fontSize: 16,
                }}
                onClick={() => {
                    inputScanCodeRef.current?.focus();
                }}
            />
            <div
                style={{
                    display: focusInput ? "flex" : "none",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(250, 250, 20, 0.8)",
                    fontSize: 30,
                    width: width > 600 ? "30vw" : "60vw",
                    maxHeight: width > 600 ? "80vh" : "70vh",
                    color: "rgba(250, 50, 25, 1)",
                    position: "fixed",
                    top: "43%",
                    left: "75%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 99999,
                    borderRadius: 8,
                    padding: "8px 4px",
                    overflowY: "auto",
                }}>
                <span>Đang thực hiện Scan Nguyên Vật Liệu</span>
            </div>
            <input
                className={"input-none"}
                ref={inputScanCodeRef}
                value={scanCode}
                onChange={onScanCodeChange}
                onFocus={() => {
                    if (!focusInput) setFocusInput(true);
                }}
                onBlur={() => {
                    if (focusInput) setFocusInput(false);
                }}
            />
        </>
    );
};

export default PopupScanMaterial;
