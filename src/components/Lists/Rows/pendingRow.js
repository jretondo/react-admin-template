import React, { useContext } from 'react';
import { numberFormat } from 'function/numberFormat';
import ActionsBackend from 'context/actionsBackend';
import '../shimmer.css';

export const PendingRow = ({
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
                <td style={{ textAlign: "center" }}>
                    {numberFormat(item.totalWork)}
                </td>
                <td style={{ textAlign: "center" }}>
                    {numberFormat(item.totalPayment)}
                </td>
                <td style={{ textAlign: "center", color: `${item.difference < 0 ? "red" : "green"}`, fontWeight: "bold" }}>
                    {numberFormat(item.difference)}
                </td>
            </tr>
        </>
    )
}