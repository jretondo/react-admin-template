import React from 'react';
import { Button } from 'reactstrap';

const ProviderSearchRow = ({
    id,
    item,
    setProviderId,
    setProviderName,
    setIsProfHealth,
    setPriceHour,
    setTotal,
    setCantHours
}) => {

    const selectProvider = () => {
        console.log('item :>> ', item);
        setProviderId(item.id_provider)
        setProviderName(item.name)
        setIsProfHealth(parseInt(item.is_health_prof) === 1 ? true : false)

        if (parseInt(item.is_health_prof) === 0) {
            setTotal(item.amount)
        } else {
            setPriceHour(item.amount)
            setCantHours(item.hours)
            setTotal(item.amount * item.hours)
        }
    }

    return (
        <tr id={id} key={id}>
            <td>
                {item.name}
            </td>
            <td>
                {item.cuit}
            </td>
            <td style={{ textAlign: "center" }}>
                <Button color="success"
                    onClick={e => {
                        e.preventDefault()
                        selectProvider()
                    }}
                >
                    <i className='fa fa-check'></i>
                </Button>
            </td>
        </tr>
    )
}

export default ProviderSearchRow