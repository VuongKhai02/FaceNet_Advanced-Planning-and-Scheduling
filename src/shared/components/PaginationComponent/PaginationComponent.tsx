import React, { useState, useEffect } from 'react';
import './PaginationComponent.css';
import { Button, Input } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

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
        <div id="pagination-container">
            <div className="page-size-selector-container">
                {pageSizeOptions && (
                    <select
                        className="custom-pagesize"
                        value={pageSize}
                        onChange={(e) => changePageSize(parseInt(e.target.value, 10))}
                    >
                        {pageSizeOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}/Trang
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <div className="dx-pages">
                <div className="dx-info">
                    {`Trang số`} {pageTextInfo.pageIndex} {`của`}{' '}
                    {pageTextInfo.numberOfPages} ({pageTextInfo.total} {`bản ghi`}) &ensp;
                </div>
                <Button
                    icon={<LeftOutlined />}
                    style={{ border: 'none' }}
                    className="dx-navigate-button dx-prev-button"
                    onClick={() => goToPage('prev')}
                    disabled={pageIndex === 1}
                /> &emsp;
                {pageNumbers.map((pageNum, index) => (
                    <Button
                        style={{ border: 'none' }}
                        key={index}
                        className={`dx-page dx-selection ${pageNum === pageIndex ? 'button-selected' : ''}`}
                        onClick={() => goToPage(pageNum)}
                    >
                        {pageNum.toString()}
                    </Button>
                ))}
                &emsp;
                <Button
                    icon={<RightOutlined />}
                    style={{ border: 'none' }}
                    className="dx-navigate-button dx-next-button"
                    onClick={() => goToPage('next')}
                    disabled={pageIndex === totalPages}
                />
            </div>
            <div className="dx-pages">
                <div className="dx-info">{`Đi đến trang`} &ensp;</div>
                <Input
                    style={{ width: 70 }}
                    type="number"
                    className="custom-goto"
                    value={goPage || ''}
                    onChange={onGoToPageValueChange}
                    onKeyPress={(e) => {
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
