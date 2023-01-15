import apiRoutes from '../../../../api/routes'
import React, { useContext, useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import alertsContext from '../../../../context/alerts';
import actionsBackend from '../../../../context/actionsBackend';

const UserForm = ({
    setNewForm,
    idDetail,
    detBool
}) => {
    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [tel, setTel] = useState("")

    const { newAlert, newActivity } = useContext(alertsContext)
    const { axiosGet, axiosPost, loadingActions } = useContext(actionsBackend)

    const newUser = async () => {
        const data = {
            name,
            lastname,
            email,
            userName: user,
            tel
        }
        if (detBool) {
            data.id = idDetail
        }
        const response = await axiosPost(apiRoutes.usersDir.users, data)

        if (!response.error) {
            ResetForm()
            if (detBool) {
                newActivity(`Se ha modificado al usuario ${name} ${lastname} usuario: ${user}`)
                newAlert("success", "Usuario modificado con éxito!", "")
                setNewForm(false)
            } else {
                newActivity(`Se ha creado al usuario ${name} ${lastname} usuario: ${user}`)
                newAlert("success", "Usuario agregado con éxito!", "En breve le llegará un email con el aviso")
            }
        } else {
            newAlert("danger", "Hubo un error!", "Revise que el nombre de usuario no esté repetido. Error: " + response.errorMsg)
        }
    }

    const getUser = async () => {
        const response = await axiosGet(apiRoutes.usersDir.sub.details, idDetail)
        if (!response.error) {
            setName(response.data[0].name)
            setLastname(response.data[0].lastname)
            setUser(response.data[0].user)
            setEmail(response.data[0].email)
            setTel(response.data[0].tel)
        } else {
            newAlert("danger", "Hubo un error al querer ver el detalle", "error: " + response.errorMsg)
        }
    }

    const userName = () => {
        const firstNameLet = name.substring(0, 1)
        const userName = (firstNameLet + lastname).toLowerCase()
        setUser(userName)
    }

    const ResetForm = () => {
        setName("")
        setLastname("")
        setUser("")
        setEmail("")
        setTel("")
    }

    useEffect(() => {
        if (detBool) {
            getUser()
        }
        // eslint-disable-next-line
    }, [detBool])

    return (<>
        <Card>
            <CardHeader>
                <Row>
                    <Col md="10">
                        <h2>{detBool ? `Modificar usuario ${name} ${lastname}` : "Usuario Nuevo"}</h2>
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
                {
                    loadingActions ?
                        <div style={{ textAlign: "center", marginTop: "0" }}>
                            <Spinner type="grow" color="primary" style={{ width: "100px", height: "100px" }} />
                        </div> :
                        <Form onSubmit={e => {
                            e.preventDefault();
                            newUser();
                        }} >
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="nameTxt">Nombre</Label>
                                        <Input
                                            type="text"
                                            name="name"
                                            id="nameTxt"
                                            placeholder="Nombre del usuario..."
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="apellidoTxt">Apellido</Label>
                                        <Input
                                            type="text"
                                            name="lastName"
                                            id="apellidoTxt"
                                            placeholder="Apellido del usuario..."
                                            value={lastname}
                                            onChange={e => setLastname(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="userTxt">Usuario</Label>
                                        <Input
                                            type="text"
                                            name="user"
                                            id="userTxt"
                                            placeholder="Usuario..."
                                            value={user}
                                            onChange={e => setUser(e.target.value)}
                                            onFocus={userName}
                                            required />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="8">
                                    <FormGroup>
                                        <Label for="emailTxt">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            id="emailTxt"
                                            placeholder="Email del usuario..."
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required />
                                    </FormGroup>
                                </Col>
                                <Col md="4">
                                    <FormGroup>
                                        <Label for="telTxt">Telefóno</Label>
                                        <Input
                                            type="text"
                                            id="telTxt"
                                            placeholder="Telefóno..."
                                            value={tel}
                                            onChange={e => setTel(e.target.value)}
                                        />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12" style={{ textAlign: "center" }}>
                                    <button
                                        className="btn btn-primary"
                                        style={{ width: "150px", margin: "20px" }}
                                        type="submit"
                                    >
                                        {detBool ? "Modificar" : "Agregar"}
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        style={{ width: "150px", margin: "20px" }}
                                        onClick={e => {
                                            e.preventDefault();
                                            setNewForm(false);
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </Col>
                            </Row>
                        </Form>
                }
            </CardBody>
        </Card>
    </>)
}

export default UserForm