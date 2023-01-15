import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import FormNewWork from './form';
import ListWorksProv from './list';

const ModalNewWork = ({
    modal,
    toggle,
    provItem
}) => {
    const [refreshList, setRefreshList] = useState(false)
    const [newWork, setNewWork] = useState(false)
    return (
        <Modal size="lg" isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>
                Nuevo Trabajo
            </ModalHeader>
            <ModalBody>
                <ListWorksProv
                    idProv={provItem.id_provider}
                    isHealthProf={provItem.is_health_prof}
                    refreshList={refreshList}
                    setRefreshList={setRefreshList}
                />
                {
                    newWork ?
                        <FormNewWork
                            setRefreshList={setRefreshList}
                            setNewWork={setNewWork}
                            provItem={provItem}
                            refreshList={refreshList}
                        /> :
                        <Button color="primary" onClick={e => {
                            e.preventDefault()
                            setNewWork(true)
                        }} >
                            Nuevo Trabajo
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

export default ModalNewWork