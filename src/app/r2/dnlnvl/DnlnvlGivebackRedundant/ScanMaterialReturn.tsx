import { Button } from "devextreme-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { useDebounced, useWindowDimensions } from "../../../../hooks";
import { ReturnMaterialDetail } from "../../../../jmix/entities/ReturnMaterialDetail";
import { toastError, toastSuccess } from "../../../../utils/ToastifyManager";

type ScanMaterialReturnProps = {
    returnMaterialDetails: ReturnMaterialDetail[];
    updateMaterialDetails: (returnMaterialDetail: ReturnMaterialDetail) => void;
};

export default function ScanMaterialReturn({ returnMaterialDetails, updateMaterialDetails }: ScanMaterialReturnProps) {
    const [scanCode, setScanCode] = useState<string>("");
    const [focusInput, setFocusInput] = useState<boolean>(false);
    const inputScanCodeRef = useRef<HTMLInputElement>(null);
    const debouncedScanCode = useDebounced<string>(scanCode, 500);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (debouncedScanCode) {
            onScancodeFinish(debouncedScanCode);
        }
    }, [debouncedScanCode]);

    function onScanCodeChange(event) {
        setScanCode(event.target.value);
    }

    function onScancodeFinish(scanString: string) {
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
            const materialScanning: ReturnMaterialDetail = _.zipObject(keyOfMaterialScanning, material_part);
            // console.log(materialScanning, material_part)
            materialScanning.quantity = Number(materialScanning.quantity);
            materialScanning.sapCode = Number(materialScanning.sapCode);
            materialScanning.expirationDate = moment(materialScanning.expirationDate, "YYYYMMDD").toDate();
            materialScanning.mfgDate = moment(materialScanning.mfgDate, "YYYYMMDD").toDate();
            if (
                returnMaterialDetails.some((returnMaterialDetail) => {
                    return returnMaterialDetail.materialName === materialScanning.materialName;
                })
            ) {
                toastError("Nguyên vật liệu này đã được scan");
            } else {
                updateMaterialDetails(materialScanning);
                toastSuccess("Scan nguyên vật liệu thành công");
            }
            setScanCode("");
        }
    }

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
                    top: "38%",
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
}
