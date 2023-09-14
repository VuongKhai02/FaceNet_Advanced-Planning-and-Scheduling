import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './PaginationComponent.module.css';
import { Button, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import Select from 'antd/lib/select';
import { useTranslation } from "react-i18next";
const { Option } = Select;
const cx = classNames.bind(styles);
interface PageTextInfo {
    pageIndex: number;
    numberOfPages: number;
    total: number;
}

interface PaginationProps {
    pageSizeOptions: number[];
    pageTextInfo: PageTextInfo;
    totalPages: number;
    pageIndex: number;
    pageSize: number;
    onPageChanged: (newPageIndex: number) => void;
    onPageSizeChanged: (newPageSize: number) => void;
}

const PaginationComponent: React.FC<PaginationProps> = ({
    pageSizeOptions,
    pageTextInfo,
    totalPages,
    pageIndex,
    pageSize,
    onPageChanged,
    onPageSizeChanged,
}) => {
    const [pageNumbers, setPageNumbers] = useState<(number | string)[]>([]);
    const [goPage, setGoPage] = useState<number | null>(null);
    const { t } = useTranslation(["common"]);
    useEffect(() => {
        calculatePages();
    }, [pageIndex, totalPages]);

    const goToPage = (page: number | string) => {
        if (page === 'prev' && pageIndex > 1) {
            onPageChanged(pageIndex - 1);
        } else if (page === 'next' && pageIndex < totalPages) {
            onPageChanged(pageIndex + 1);
        } else if (typeof page === 'number' && page !== pageIndex) {
            onPageChanged(page);
        }
    };

    const changePageSize = (option: number) => {
        onPageSizeChanged(option);
    };

    const onGoToPageValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value)) {
            setGoPage(value);
        }
    };

    const calculatePages = () => {
        const maxVisiblePages = 5;
        const pageNumbers: (number | string)[] = [];

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            const startPage = Math.max(1, pageIndex - 2);
            const endPage = Math.min(totalPages, pageIndex + 2);

            if (startPage > 1) {
                pageNumbers.push(1);
                if (startPage > 2) {
                    pageNumbers.push('...');
                }
            }
            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }
            if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                    pageNumbers.push('...');
                }
                pageNumbers.push(totalPages);
            }
        }
        setPageNumbers(pageNumbers);
    };

    return (
        <div className={cx("pagination-container")}>
            <div className={cx("page-size-selector-container")}>
                {pageSizeOptions && (
                    <Select
                        className={cx("custom-pagesize")}
                        value={pageSize}
                        onChange={changePageSize}
                    >
                        {pageSizeOptions.map((option) => (
                            <Option key={option} value={option}>
                                {option}/{t("common.page")}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div className={cx("dx-pages")}>
                <div className={cx("dx-info")}>
                    {t("common.page-number")} {pageTextInfo.pageIndex} {t("common.of")}{' '}
                    {!Number.isNaN(pageTextInfo.numberOfPages) ? pageTextInfo.numberOfPages : 0} ({pageTextInfo.total || 0} {t("common.records")}) &ensp;
                </div>
                <Button
                    icon={<LeftOutlined />}
                    style={{ border: 'none' }}
                    className={cx("dx-navigate-button", "dx-prev-button")}
                    onClick={() => goToPage('prev')}
                    disabled={pageIndex === 1}
                /> &emsp;
                {pageNumbers.map((pageNum, index) => (
                    <Button
                        style={{ border: 'none' }}
                        key={index}
                        className={cx("dx-page", "dx-selection", pageNum === pageIndex ? 'button-selected' : '')}
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum.toString()}
                    </Button>
                ))}
                &emsp;
                <Button
                    icon={<RightOutlined />}
                    style={{ border: 'none' }}
                    className={cx("dx-navigate-button", "dx-next-button")}
                    onClick={() => goToPage('next')}
                    disabled={pageIndex === totalPages}
                />
            </div>
            <div className={cx("dx-pages")}>
                <div className={cx("dx-info")}>{t("common.goTo-page")} &ensp;</div>
                <Input
                    placeholder={'1'}
                    style={{ width: 70 }}
                    type="number"
                    className={cx("custom-goto")}
                    value={goPage || ''}
                    onChange={onGoToPageValueChange}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            goToPage(goPage || 1);
                        }
                    }}
                />
            </div>
        </div>
    );
};

export default PaginationComponent;
