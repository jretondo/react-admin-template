import apiRoutes from '../../../../api/routes'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Input, Row, Spinner } from 'reactstrap'
import alertsContext from 'context/alerts';
import actionsBackend from 'context/actionsBackend';

const UserPermissions = ({
    setNewForm,
    idUser,
    userName
}) => {
    const [permissionsAvailable, setPermissionsAvailable] = useState([])
    const [newPermissions, setNewPermissions] = useState([])
    const [layoutPermissions, setLayoutPermissions] = useState(<></>)
    const [layoutUserPermissions, setLayoutUserPermissions] = useState(<></>)

    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosGet, axiosPost, loadingActions } = useContext(actionsBackend)

    const ListPermissionsUsu = async () => {

        const response = await axiosGet(apiRoutes.permissionsDir.permissions, idUser)

        if (!response.error) {
            setPermissionsAvailable(response.data.permissions)
            setNewPermissions(response.data.userPermissions)
        } else {
            newAlert("danger", "Hubo un error al consultar al servidor. Error: " + response.errorMsg)
            setPermissionsAvailable([])
            setNewPermissions([])
        }
    }

    const newPermission = async () => {
        const permissions = await new Promise((resolve, reject) => {
            let list = []
            if (newPermissions.length > 0) {
                // eslint-disable-next-line
                newPermissions.map((item, key) => {
                    list.push({
                        idPermission: item.id_permission
                    })
                    if (key === newPermissions.length - 1) {
                        resolve(list)
                    }
                })
            } else {
                resolve([])
            }
        })

        const data = {
            permissions: permissions,
            idUser: idUser
        }

        const response = await axiosPost(apiRoutes.permissionsDir.permissions, data)

        if (!response.error) {
            newAlert("success", "Permisos modificados con éxito!", "")
            newActivity(`Se le han modificado los permisos de acceso al usuario ${userName} (id: ${idUser})`)
            setNewForm(false)
        } else {
            newAlert("danger", "Hubo un error!", "Intente nuevamente! Error: " + response.errorMsg)
        }
    }

    const DeletePermission = (key, item) => {
        let list = newPermissions
        list.splice(key, 1)
        setNewPermissions(list)
        let list2 = permissionsAvailable
        list2.push({
            id: item.id,
            module_name: item.module_name
        })
        setPermissionsAvailable(list2)
        PlantPermissions()
    }

    const AddPermissions = (key, item) => {
        let list = permissionsAvailable
        list.splice(key, 1)
        setPermissionsAvailable(list)
        let list2 = newPermissions
        list2.push({
            id: item.id,
            id_user: idUser,
            id_permission: item.id,
            module_name: item.module_name
        })
        setNewPermissions(list2)
        PlantPermissions()
    }

    const PlantPermissions = () => {
        if (newPermissions.length > 0) {
            setLayoutUserPermissions(
                // eslint-disable-next-line
                newPermissions.map((item, key) => {
                    return (
                        <Row key={key} style={{ marginTop: "15px" }}>
                            <Col md="10">
                                <Input value={item.module_name} disabled />
                            </Col>
                            <Col md="2">
                                <button
                                    className="btn btn-danger"
                                    onClick={e => {
                                        e.preventDefault();
                                        DeletePermission(key, item);
                                    }}
                                >
                                    <i className="fa fa-times" aria-hidden="true"></i>
                                </button>
                            </Col>
                        </Row>
                    )
                })
            )
        } else {
            setLayoutUserPermissions(<></>)
        }

        if (permissionsAvailable.length > 0) {
            setLayoutPermissions(
                // eslint-disable-next-line
                permissionsAvailable.map((item, key) => {
                    return (
                        <Row key={key} style={{ marginTop: "15px" }}>
                            <Col md="10">
                                <Input value={item.module_name} disabled />
                            </Col>
                            <Col md="2">
                                <button
                                    className="btn btn-success"
                                    onClick={e => {
                                        e.preventDefault();
                                        AddPermissions(key, item);
                                    }}
                                >
                                    <i className="fas fa-check" aria-hidden="true"></i>
                                </button>
                            </Col>
                        </Row>
                    )
                })
            )
        } else {
            setLayoutPermissions(<></>)
        }
    }

    useEffect(() => {
        ListPermissionsUsu()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        PlantPermissions()
        // eslint-disable-next-line
    }, [newPermissions.length, permissionsAvailable.length])

    if (loadingActions) {
        return (
            <div style={{ textAlign: "center", marginTop: "0" }}>
                <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
            </div>
        )
    } else {
        return (
            <Card>
                <CardHeader>
                    <Row>
                        <Col md="10">
                            <h2>{`Permisos para el usuario ${userName}`}</h2>
                        </Col>
                        <Col md="2" style={{ textAlign: "right" }}>
                            <button
                                className="btn btn-danger"
                                onClick={e => {
                                    e.preventDefault();
                                    setNewForm(false);
                                }}
                            >X</button>
                        </Col>
                    </Row>
                </CardHeader>
                <CardBody>
                    <Container>
                        <Row>
                            <Col>
                                <h2>Permisos otorgados al usuario:</h2>
                            </Col>
                        </Row>
                        {layoutUserPermissions}
                    </Container>

                    <Container style={{ marginTop: "50px" }} >
                        <Row>
                            <Col>
                                <h2>Permisos disponibles para el usuario:</h2>
                            </Col>
                        </Row>
                        {layoutPermissions}
                    </Container>

                    <Container>
                        <Row>
                            <Col md="12" style={{ textAlign: "center" }}>
                                <button
                                    className="btn btn-primary"
                                    style={{ width: "200px", margin: "25px" }}
                                    onClick={e => {
                                        e.preventDefault();
                                        newPermission();
                                    }}
                                >
                                    Confirmar Permisos
                                </button>

                                <button
                                    className="btn btn-danger"
                                    style={{ width: "200px", margin: "25px" }}
                                    onClick={e => {
                                        e.preventDefault();
                                        setNewForm(false);
                                    }}
                                >
                                    Cancelar
                                </button>
                            </Col>
                        </Row>
                    </Container>

                </CardBody>
            </Card>
        )
    }
}

export default UserPermissions