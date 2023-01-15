import React, { useContext } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';
import '../shimmer.css';
import UrlNodeServer from '../../../api/routes';
import { numberFormat } from 'function/numberFormat';

export const AmountRow = ({
    id,
    item,
    refreshToggle,
    setIdAmount,
    first,
    page,
    setPage
}) => {
    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosDelete, loadingActions } = useContext(actionsBackend)

    const details = (idAmount) => {
        setIdAmount(idAmount)
    }

    const remove = (name, idAmount) => {
        swal({
            title: "Eliminar el monto " + name + "!",
            text: "¿Está seguro de eliminar a este monto? Esta desición es permanente.",
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
                    const response = await axiosDelete(UrlNodeServer.amountsDir.amounts, idAmount)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el monto ${name} (id: ${idAmount})`)
                        newAlert("success", "Monto eliminado con éxito!", "")
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
        <tr key={id} className={loadingActions ? "shimmer" : ""}>
            <td style={{ textAlign: "center", fontSize: "14px", fontWeight: "bold" }}>
                {item.amount_name}
            </td>
            <td style={{ textAlign: "center" }}>
                $ {numberFormat(item.amount)}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.description}
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
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => {
                                e.preventDefault()
                                details(item.id)
                            }}>
                            <i className="fas fa-edit"></i>
                            Editar
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={e => {
                                e.preventDefault()
                                remove(item.name, item.id)
                            }}>
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}