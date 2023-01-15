import UrlNodeServer from '../../../api/routes';
import { TableList } from 'components/Lists/TableList';
import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useAxiosGetList } from 'hooks/useAxiosGetList';
import PaginationComp from 'components/Pagination/Pages';
import ContractsProvRow from 'components/Lists/Rows/contractsProvRow';

const ListContractsProv = ({
    idProv,
    refreshList,
    setRefreshList
}) => {
    const [page, setPage] = useState(1)
    const [listContracts, setListContracts] = useState(<></>)
    const {
        loadingList,
        dataPage,
        pageObj,
        errorList
    } = useAxiosGetList(
        UrlNodeServer.contractsDir.contracts,
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
                    return (<ContractsProvRow
                        key={key}
                        id={key}
                        item={item}
                        first={first}
                        page={page}
                        setPage={setPage}
                        refreshToggle={() => setRefreshList(!refreshList)}
                        idProv
                    />)
                })
            )
        }
    }, [dataPage, loadingList, errorList, page, setPage, refreshList, setRefreshList])

    return (
        <>
            <Row>
                <Col md="12">
                    <TableList
                        titlesArray={["Desde", "Hasta", "Observación", ""]}
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

export default ListContractsProv