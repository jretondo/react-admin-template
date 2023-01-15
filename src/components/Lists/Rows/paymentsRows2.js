import UrlNodeServer from '../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import { numberFormat } from 'function/numberFormat';
import moment from 'moment-with-locales-es6';
import React, { useContext } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import swal from 'sweetalert';

const PaymentsRows2 = ({
    id,
    item,
    page,
    setPage,
    refreshToggle,
    first,
}) => {
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosDelete, loadingActions, axiosGetPDF } = useContext(ActionsBackend)

    const removeWork = async () => {
        swal({
            title: `Eliminar pago de $ ${numberFormat(item.total)}!`,
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
                    const response = await axiosDelete(UrlNodeServer.paymentsDir.payments, item.id_payment)
                    if (!response.error) {
                        if (first) {
                            if (page > 1) {
                                backPage = true
                            }
                        }
                        newActivity(`Se ha eliminado el pago de ${item.total} del proveedor (${item.id_provider})`)
                        newAlert("success", "Pago eliminado con éxito!", "")
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

    const rePrintPDF = async (id) => {
        const response = await axiosGetPDF(UrlNodeServer.paymentsDir.sub.reprint, id)
        if (!response.error) {
            newAlert("success", "Comprobante reimpreso con éxito!", "")
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
    }

    return (
        <tr key={id} className={loadingActions ? "shimmer" : ""}>
            <td style={{ textAlign: "center" }}>
                {moment(item.date).format("DD/MM/YYYY")}
            </td>
            <td style={{ textAlign: "center" }}>
                {`${item.name} (CUIT: ${item.cuit})`}
            </td>
            <td style={{ textAlign: "center" }}>
                $ {numberFormat(item.total)}
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
                                rePrintPDF(item.id_payment)
                            }}
                        >
                            <BsFileEarmarkPdfFill />
                            Reimprimir Recibo
                        </DropdownItem>
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

export default PaymentsRows2