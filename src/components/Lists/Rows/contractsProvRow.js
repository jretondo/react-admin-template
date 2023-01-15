import UrlNodeServer from '../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import { capitalizeFirstLetter } from 'function/capitalizeFisrtWord';
import moment from 'moment-with-locales-es6';
import React, { useContext } from 'react';
import swal from 'sweetalert';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

const ContractsProvRow = ({
    id,
    item,
    first,
    page,
    setPage,
    refreshToggle,
    idProv
}) => {
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions } = useContext(ActionsBackend)

    const removeContract = async () => {

        swal({
            title: `Eliminar el contrato desde ${capitalizeFirstLetter(moment(item.from_contract).locale("es").format("MMMM"))}/${moment(item.from_contract).format("YYYY")} hasta ${capitalizeFirstLetter(moment(item.to_contract).locale("es").format("MMMM"))}/${moment(item.to_contract).format("YYYY")}!`,
            text: "¿Está seguro de eliminar este contrato? Esta desición es permanente.",
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
                    const response = await axiosDelete(UrlNodeServer.contractsDir.contracts, item.id_contract)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el contrato desde ${capitalizeFirstLetter(moment(item.from_contract).locale("es").format("MMMM"))}/${moment(item.from_contract).format("YYYY")} hasta ${capitalizeFirstLetter(moment(item.to_contract).locale("es").format("MMMM"))}/${moment(item.to_contract).format("YYYY")} (idProv: ${idProv})`)
                        newAlert("success", "Contrato eliminado con éxito!", "")
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
            <td style={{ textAlign: "center" }}>

                {`${capitalizeFirstLetter(moment(item.from_contract).locale("es").format("MMMM"))}/${moment(item.from_contract).format("YYYY")}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {`${capitalizeFirstLetter(moment(item.to_contract).locale("es").format("MMMM"))}/${moment(item.to_contract).format("YYYY")}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {item.detail}
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
                                removeContract()
                            }}
                        >
                            <i className="fas fa-trash-alt"></i>
                            Eliminar
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </td>
        </tr>
    )
}

export default ContractsProvRow