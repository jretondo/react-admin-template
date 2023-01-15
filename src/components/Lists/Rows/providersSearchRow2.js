import React from 'react';
import { Button } from 'reactstrap';

const ProviderSearchRow2 = ({
    id,
    item,
    setProviderId,
    setProviderName
}) => {

    const selectProvider = () => {
        console.log('item :>> ', item);
        setProviderId(item.id_provider)
        setProviderName(item.name)
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

export default ProviderSearchRow2