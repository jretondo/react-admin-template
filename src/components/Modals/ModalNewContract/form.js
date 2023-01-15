import UrlNodeServer from '../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import moment from 'moment-timezone';
import React, { useContext, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';

const FormNewContract = ({
    setRefreshList,
    setNewContract,
    idProv,
    refreshList
}) => {
    const [fromMonth, setFromMonth] = useState(1)
    const [toMonth, setToMonth] = useState(6)
    const [fromYear, setFromYear] = useState(new Date().getFullYear())
    const [toYear, setToYear] = useState(new Date().getFullYear())
    const [detail, setDetail] = useState("")
    const [loading, setLoading] = useState(false)
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosPost } = useContext(ActionsBackend)

    const newContractForm = async () => {
        setLoading(true)

        const fromDateStr = `${fromYear}-${fromMonth}-01`
        const toDateStr = `${toYear}-${toMonth}-01`
        const fromDate = moment(fromDateStr, "YYYY-MM-DD").toDate()
        const toDate = moment(toDateStr, "YYYY-MM-DD").toDate()
        toDate.setMonth(toDate.getMonth() + 1)
        toDate.setDate(toDate.getDate() - 1)

        const data = {
            id_prov: idProv,
            from_contract: moment(fromDate).format("YYYY-MM-DD"),
            to_contract: moment(toDate).format("YYYY-MM-DD"),
            detail: detail
        }

        const response = await axiosPost(UrlNodeServer.contractsDir.contracts, data)

        if (!response.error) {
            setDetail("")
            setNewContract(false)
            newActivity(`El usuario ha creado un nuevo contrato del proveedor de ID: ${idProv})`)
            newAlert("success", "Contrato agregado con éxito!", "")
            setRefreshList(!refreshList)
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <Row>
                <Col md="12">
                    <Spinner color="primary" />
                </Col>
            </Row>
        )
    } else {
        return (
            <Form
                style={{ border: "2px solid red", padding: "15px", marginTop: "15px" }}
                onSubmit={e => {
                    e.preventDefault()
                    newContractForm()
                }}>
                <h3>Nuevo Contrato</h3>
                <Row>
                    <Col md="7">
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label>
                                        Mes desde
                                    </Label>
                                    <Input value={fromMonth} onChange={e => setFromMonth(e.target.value)} type="select">
                                        <option value={1} >Enero</option>
                                        <option value={2}>Febrero</option>
                                        <option value={3}>Marzo</option>
                                        <option value={4}>Abril</option>
                                        <option value={5}>Mayo</option>
                                        <option value={6}>Junio</option>
                                        <option value={7}>Julio</option>
                                        <option value={8}>Agosto</option>
                                        <option value={9}>Septiembre</option>
                                        <option value={10}>Octubre</option>
                                        <option value={11}>Noviembre</option>
                                        <option value={12}>Diciembre</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup >
                                    <Label>
                                        Año desde
                                    </Label>
                                    <Input value={fromYear} onChange={e => setFromYear(e.target.value)} type="number" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label>
                                        Mes hasta
                                    </Label>
                                    <Input value={toMonth} onChange={e => setToMonth(e.target.value)} type="select">
                                        <option value={1} >Enero</option>
                                        <option value={2}>Febrero</option>
                                        <option value={3}>Marzo</option>
                                        <option value={4}>Abril</option>
                                        <option value={5}>Mayo</option>
                                        <option value={6}>Junio</option>
                                        <option value={7}>Julio</option>
                                        <option value={8}>Agosto</option>
                                        <option value={9}>Septiembre</option>
                                        <option value={10}>Octubre</option>
                                        <option value={11}>Noviembre</option>
                                        <option value={12}>Diciembre</option>
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup >
                                    <Label>
                                        Año hasta
                                    </Label>
                                    <Input value={toYear} onChange={e => setToYear(e.target.value)} type="number" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="5">
                        <FormGroup style={{ height: "100%" }}>
                            <Label>
                                Detalles
                            </Label>
                            <Input style={{ height: "72%" }} type="textarea" value={detail} onChange={e => {
                                setDetail(e.target.value)
                            }} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md="12" style={{ textAlign: "center", marginInline: "20px" }}>
                        <Button color="primary" type="submit">
                            Agregar Contrato
                        </Button>
                        <Button color="danger" onClick={e => {
                            e.preventDefault()
                            setNewContract(false)
                        }}>
                            Cancelar
                        </Button>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default FormNewContract