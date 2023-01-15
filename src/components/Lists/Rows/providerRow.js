import React, { useContext, useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';
import '../shimmer.css';
import UrlNodeServer from '../../../api/routes';
import ModalNewContract from 'components/Modals/ModalNewContract';
import ModalNewWork from 'components/Modals/ModalNewWork';

export const ProviderRow = ({
    id,
    item,
    setIdProv,
    first,
    page,
    setPage,
    refreshToggle,
    setModuleActive
}) => {
    const [modalContracts, setModalContracts] = useState(false)
    const [modalWorks, setModalWorks] = useState(false)
    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosDelete, loadingActions } = useContext(actionsBackend)

    const details = (idProv) => {
        setIdProv(idProv)
        setModuleActive(1)
    }

    const deleteProvider = (idProv, name, cuit) => {
        swal({
            title: "Eliminar el monotributista " + name + "!",
            text: "¿Está seguro de eliminar a este monotributista? Esta desición es permanente.",
            icon: "warning",
            buttons: {
                cancel: "No",
                Si: true
            },
            dangerMode: true,
        })
            .then(async (willDelete) => {
                let backPage = false
                if (willDelete) {
                    const response = await axiosDelete(UrlNodeServer.providersDir.providers, idProv)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el monotributista ${name} (CUIT: ${cuit}) (id: ${idProv})`)
                        newAlert("success", "Monotributista eliminado con éxito!", "")
                        if (backPage) {
                            setPage(parseInt(page - 1))
                        } else {
                            refreshToggle()
                        }
                    } else {
                        newAlert("danger", "Hubo un error!", "Intentelo nuevamente. Error: " + response.errorMsg)
                    }
                }
            });
    }

    return (
        <>
            <tr key={id} className={loadingActions ? "shimmer" : ""}>
                <td style={{ textAlign: "center" }}>
                    {item.name}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.cuit}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.sector}
                </td>
                <td style={{ textAlign: "center" }}>
                    {item.direction}
                </td>
                <td className="text-right">
                    <UncontrolledDropdown>
                        <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={e => e.preventDefault()}
                        >
                            <i className="fas fa-ellipsis-v" />
                        </DropdownToggle    >
                        <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    setModalContracts(true)
                                }}
                            >
                                <i className="fas fa-file-contract"></i>
                                Contratos
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    setModalWorks(true)
                                }}
                            >
                                <i className="fas fa-book"></i>
                                Trabajos
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()

                                }}
                            >
                                <i className="fas fa-coins"></i>
                                Pagos
                            </DropdownItem>
                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    details(item.id_provider)
                                }}>
                                <i className="fas fa-edit"></i>
                                Editar
                            </DropdownItem>

                            <DropdownItem
                                href="#pablo"
                                onClick={e => {
                                    e.preventDefault()
                                    deleteProvider(item.id_provider, item.name)
                                }}
                            >
                                <i className="fas fa-trash-alt"></i>
                                Eliminar
                            </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </td>
            </tr>
            <ModalNewContract
                idProv={item.id_provider}
                modal={modalContracts}
                toggle={() => setModalContracts(!modalContracts)}
            />
            <ModalNewWork
                provItem={item}
                modal={modalWorks}
                toggle={() => setModalWorks(!modalWorks)}
            />
        </>
    )
}