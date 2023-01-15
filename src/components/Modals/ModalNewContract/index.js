import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormNewContract from './form';
import ListContractsProv from './list';

const ModalNewContract = ({
    modal,
    toggle,
    idProv
}) => {
    const [refreshList, setRefreshList] = useState(false)
    const [newContract, setNewContract] = useState(false)
    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Nuevo Contrato
            </ModalHeader>
            <ModalBody>
                <ListContractsProv
                    idProv={idProv}
                    refreshList={refreshList}
                    setRefreshList={setRefreshList}
                />
                {
                    newContract ?
                        <FormNewContract
                            setRefreshList={setRefreshList}
                            setNewContract={setNewContract}
                            idProv={idProv}
                            refreshList={refreshList}
                        /> :
                        <Button color="primary" onClick={e => {
                            e.preventDefault()
                            setNewContract(true)
                        }} >
                            Nuevo Contrato
                        </Button>
                }

            </ModalBody>
            <ModalFooter>
                <Button color="danger" onClick={e => {
                    e.preventDefault()
                    toggle()
                }}>
                    Cerrar
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalNewContract