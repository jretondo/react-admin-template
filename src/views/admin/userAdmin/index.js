import React, { useContext, useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import Header from "components/Headers/Header.js";
import UserList from './list'
import UserForm from './form'
import UserPermissions from './permissions'
import secureContext from 'context/secureRoutes';
import apiRoutes from '../../../api/routes';

const UserAdmin = () => {
    const [newForm, setNewForm] = useState(false)
    const [detBool, setDetBool] = useState(false)
    const [idDetail, setIdDetail] = useState(0)
    const [permissionsBool, setPermissionsBool] = useState(false)
    const [idUser, setIdUser] = useState(0)
    const [userName, setUserName] = useState("")

    const { setUrlRoute } = useContext(secureContext)

    useEffect(() => {
        if (detBool || permissionsBool) {
            setNewForm(true)
        }
    }, [detBool, permissionsBool])

    useEffect(() => {
        if (!newForm) {
            setDetBool(false)
            setPermissionsBool(false)
        }
    }, [newForm])

    useEffect(() => {
        setUrlRoute(apiRoutes.routesDir.sub.userAdmin)
    }, [setUrlRoute])

    return (
        <>
            <Header />
            <Container className="mt--7" fluid>
                {
                    !newForm ?
                        <UserList
                            setNewForm={setNewForm}
                            setDetBool={setDetBool}
                            setIdDetail={setIdDetail}
                            setPermissionsBool={setPermissionsBool}
                            setIdUser={setIdUser}
                            setUserName={setUserName}
                        /> :
                        permissionsBool ?
                            <UserPermissions
                                setNewForm={setNewForm}
                                idUser={idUser}
                                userName={userName}
                            />
                            :
                            <UserForm
                                setNewForm={setNewForm}
                                idDetail={idDetail}
                                detBool={detBool}
                            />
                }
            </Container>
        </>
    )
}

export default UserAdmin