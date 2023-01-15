import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap"

const PaginationComp = ({
    page,
    setPage,
    data
}) => {
    const [layoutPages, setLayoutPages] = useState(<></>)
    useEffect(() => {
        listPages()
        // eslint-disable-next-line
    }, [page, data.cantTotal, data.totalPag])

    const pagePrev = (e) => {
        e.preventDefault()
        if (page > 1) {
            setPage(1)
        }
    }

    const nextPage = (e) => {
        e.preventDefault()
        if (data.totalPag > page) {
            setPage(data.totalPag)
        }
    }

    const changePage = (e, newPage) => {
        e.preventDefault()
        if (page !== newPage) {
            setPage(newPage)
        }
    }

    const listPages = () => {
        if (data.totalPag) {
            setLayoutPages(
                data.cantTotal.map((pageNumber, key) => {
                    return (
                        <PaginationItem className={page === pageNumber ? "active" : ""} key={key}>
                            <PaginationLink
                                href="#"
                                onClick={e => changePage(e, pageNumber)}
                            >
                                {pageNumber}
                            </PaginationLink>
                        </PaginationItem>
                    )
                })
            )
        }
    }
    if (data.totalPag) {
        return (
            <>
                <nav aria-label="...">
                    <Pagination
                        className="pagination justify-content-end mb-0"
                        listClassName="justify-content-end mb-0"
                    >
                        <PaginationItem className={page === 1 ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => pagePrev(e)}
                                tabIndex="-1"
                            >
                                <i className="fas fa-angle-double-left" />
                                <span className="sr-only">Primero</span>
                            </PaginationLink>
                        </PaginationItem>

                        {layoutPages}

                        <PaginationItem className={page === data.totalPag ? "disabled" : ""}>
                            <PaginationLink
                                href="#"
                                onClick={e => nextPage(e)}
                            >
                                <i className="fas fa-angle-double-right" />
                                <span className="sr-only">Último</span>
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>
                </nav>
            </>
        )
    } else {
        return null
    }

}

export default PaginationComp