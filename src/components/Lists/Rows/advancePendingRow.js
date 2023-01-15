import React, { useContext } from 'react';
import { numberFormat } from 'function/numberFormat';
import ActionsBackend from 'context/actionsBackend';
import '../shimmer.css';

export const AdvancePendingRow = ({
    id,
    item,
}) => {
    const { loadingActions } = useContext(ActionsBackend)
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
                <td style={{ textAlign: "center", color: `${item.difference < 0 ? "red" : "green"}`, fontWeight: "bold" }}>
                    $ {numberFormat(item.totalPayment)}
                </td>
            </tr>
        </>
    )
}