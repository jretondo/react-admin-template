import UrlNodeServer from '../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import { capitalizeFirstLetter } from 'function/capitalizeFisrtWord';
import { numberFormat } from 'function/numberFormat';
import moment from 'moment-with-locales-es6';
import React, { useContext } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import swal from 'sweetalert';

const WorksRow2 = ({
    id,
    item,
    page,
    setPage,
    refreshToggle,
    first,
}) => {
    const period = moment(`${item.year}-${item.month}-01`, "YYYY-MM-DD").toDate()
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions } = useContext(ActionsBackend)

    const removeWork = async () => {
        swal({
            title: `Eliminar el trabajo de período ${capitalizeFirstLetter(moment(period).locale("es").format("MMMM"))}/${moment(period).format("YYYY")} con monto de $ ${numberFormat(item.amount)}!`,
            text: "¿Está seguro de eliminar este trabajo? Esta desición es permanente.",
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
                    const response = await axiosDelete(UrlNodeServer.worksDir.works, item.id_work)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el trabajo de periodo ${capitalizeFirstLetter(moment(item.from_contract).locale("es").format("MMMM"))}/${moment(item.from_contract).format("YYYY")} (idProv: ${item.id_provider})`)
                        newAlert("success", "Trabajo eliminado con éxito!", "")
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
                {moment(item.crated).format("DD/MM/YYYY")}
            </td>
            <td style={{ textAlign: "center" }}>
                {`${item.name} (CUIT: ${item.cuit})`}
            </td>
            <td style={{ textAlign: "center" }}>
                {`${capitalizeFirstLetter(moment(period).locale("es").format("MMMM"))}/${moment(period).format("YYYY")}`}
            </td>
            <td style={{ textAlign: "center" }}>
                {parseFloat(item.hours) > 0 ? item.hours : ""}
            </td>
            <td style={{ textAlign: "center" }}>
                $ {numberFormat(item.amount)}
            </td>
            <td style={{ textAlign: "center" }}>
                {parseInt(item.extra) === 1 ? "Si" : ""}
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
                                removeWork()
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

export default WorksRow2