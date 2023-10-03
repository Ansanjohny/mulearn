import React, { useEffect, useState } from 'react'
import styles from './LearningCircles.module.scss'
import { getLCDashboard, getLCReport } from './services/LearningCircles';
import { ResponseType, UserDetail } from './services/types';
import TableTop from '@/MuLearnComponents/TableTop/TableTop';
import Table from "@/MuLearnComponents/Table/Table";
import THead from '@/MuLearnComponents/Table/THead';
import Pagination from '@/MuLearnComponents/Pagination/Pagination';

const LearningCircles = () => {
    const [LcCounts, setLcCounts] = useState<ResponseType>({ lc_count: 0, total_enrollment: 0, circle_count_by_ig: [] })
    const [LcReport, setLcReport] = useState<UserDetail[]>([])
    const [sort, setSort] = useState("-created_at");

    useEffect(() => {
        getLCDashboard(setLcCounts);
        getLCReport(setLcReport, currentPage, perPage, setTotalPages, "", sort, setLoading);
    }, [])

    useEffect(() => {
        console.log(LcCounts);
        console.log(LcReport);
    }, [])

    const columnOrder: ColOrder[] = [
        { column: "first_name", Label: "First Name", isSortable: false },
        { column: "last_name", Label: "Last Name", isSortable: false },
        { column: "muid", Label: "muid", isSortable: false },
        { column: "circle_name", Label: "Circle Name", isSortable: false },
        { column: "circle_ig", Label: "Circle IG", isSortable: false },
        { column: "organisation", Label: "Organization", isSortable: false },
        { column: "dwms_id", Label: "DWMS ID", isSortable: false },
        { column: "karma_earned", Label: "Karma Earned", isSortable: false },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(20);

    const handleNextClick = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        getLCReport(setLcReport, nextPage, perPage, setTotalPages);
    };

    const handlePreviousClick = () => {
        const prevPage = currentPage - 1;
        setCurrentPage(prevPage);
        getLCReport(setLcReport, 1, perPage, setTotalPages);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        getLCReport(setLcReport, 1, perPage, setTotalPages, search, "");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setCurrentPage(1);
        setPerPage(selectedValue);
        getLCReport(
            setLcReport,
            1,
            selectedValue,
            setTotalPages,
            "",
            ""
        );
    };

    // const handleCopy = (id: any) => {
    //     navigator.clipboard.writeText(
    //         shortUrlData.filter(item => item?.id === id)[0].short_url
    //     );
    //     console.log(shortUrlData.filter(item => item?.id === id)[0].short_url);
    //     toast({
    //         title: "Copied",
    //         status: "success",
    //         duration: 2000,
    //         isClosable: true
    //     });
    // };

    const handleIconClick = (column: string) => {
        if (sort === column) {
            setSort(`-${column}`);
            getLCReport(
                setLcReport,
                currentPage,
                perPage,
                setTotalPages,
                "",
                `-${column}`,
                setLoading

            );
        } else {
            setSort(column);
            getLCReport(
                setLcReport,
                currentPage,
                perPage,
                setTotalPages,
                "",
                column,
                setLoading
            );
        }
    };

    return (
        <>
            <>
                <TableTop
                    onSearchText={handleSearch}
                    onPerPageNumber={handlePerPageNumber}
                />
                <Table
                    rows={LcReport}
                    page={currentPage}
                    perPage={perPage}
                    columnOrder={columnOrder}
                    isloading={loading}
                >
                    <THead
                        columnOrder={columnOrder}
                        // editableColumnNames={editableColumnNames}
                        onIconClick={handleIconClick}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        margin="10px 0"
                        handleNextClick={handleNextClick}
                        handlePreviousClick={handlePreviousClick}
                        onPerPageNumber={handlePerPageNumber}
                        perPage={perPage}
                        setPerPage={setPerPage}
                    />
                    {/*use <Blank/> when u don't need <THead /> or <Pagination inside <Table/> cause <Table /> needs atleast 2 children*/}
                </Table>
            </>

        </>
    )
}

export default LearningCircles