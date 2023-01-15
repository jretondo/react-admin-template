import UrlNodeServer from '../../../api/routes';
import { TableList } from 'components/Lists/TableList';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import PaginationComp from 'components/Pagination/Pages';
import WorksRow from 'components/Lists/Rows/worksRow';

const ListWorksProv = ({
    idProv,
    refreshList,
    setRefreshList,
    isHealthProf
}) => {
    const [page, setPage] = useState(1)
    const [listContracts, setListContracts] = useState(<></>)
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList
    } = useAxiosGetList(
        UrlNodeServer.worksDir.sub.provider,
        page, refreshList,
        [{ idProv: idProv }])

    useEffect(() => {
        if (!errorList && dataPage.length > 0) {
            let first = true
            setListContracts(
                dataPage.map((item, key) => {
                    if (key > 0) {
                        first = false
                    }
                    return (<WorksRow
                        key={key}
                        id={key}
                        item={item}
                        first={first}
                        page={page}
                        setPage={setPage}
                        refreshToggle={() => setRefreshList(!refreshList)}
                        isHealthProf={isHealthProf}
                        idProv={idProv}
                    />)
                })
            )
        }
    }, [dataPage, loadingList, errorList, page, setPage, refreshList, setRefreshList, isHealthProf, idProv])

    return (
        <>
            <Row>
                <Col md="12">
                    <TableList
                        titlesArray={isHealthProf ? ["Periodo", "Cant. Hs", "Monto", "Detalles", ""] : ["Periodo", "Monto", "Detalles", ""]}
                    >
                        {listContracts}
                    </TableList>
                </Col>
            </Row>
            <Row>
                <Col>
                    {!pageObj ? null :
                        <PaginationComp
                            page={page}
                            setPage={setPage}
                            data={pageObj}
                        />}
                </Col>
            </Row>
        </>
    )
}

export default ListWorksProv