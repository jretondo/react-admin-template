import UrlNodeServer from '../../../api/routes';
import ActionsBackend from 'context/actionsBackend';
import AlertsContext from 'context/alerts';
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap';

const FormNewWork = ({
    setRefreshList,
    setNewWork,
    provItem,
    refreshList
}) => {
    const currentYear = new Date().getFullYear()
    const currentMonth = (new Date().getMonth() + 1)
    const [month, setMonth] = useState(currentMonth)
    const [year, setYear] = useState(currentYear)
    const [cantHours, setCantHours] = useState(0)
    const [total, setTotal] = useState(provItem.is_health_prof ? 0 : provItem.amount)
    const [detail, setDetail] = useState("")
    const [loading, setLoading] = useState(false)
    const { newAlert, newActivity } = useContext(AlertsContext)
    const { axiosPost } = useContext(ActionsBackend)

    const registerWork = async () => {
        setLoading(true)
        const data = {
            id_provider: provItem.id_provider,
            month: month,
            year: year,
            hours: parseFloat(cantHours),
            amount: parseFloat(total),
            details: detail,
            isHealthProf: provItem.is_health_prof
        }

        const response = await axiosPost(UrlNodeServer.worksDir.works, data)

        if (!response.error) {
            setDetail("")
            setNewWork(false)
            newActivity(`El usuario ha creado un nuevo trabajo del proveedor de ID: ${provItem.id_provider})`)
            newAlert("success", "Trabajo agregado con éxito!", "")
            setRefreshList(!refreshList)
        } else {
            newAlert("danger", "Hubo un error", `Error: ${response.erroMsg}`)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (provItem.is_health_prof) {
            setTotal(cantHours * provItem.amount)
        }
    }, [cantHours, provItem.is_health_prof, provItem.amount])

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
            <Form onSubmit={e => {
                e.preventDefault()
                registerWork()
            }}>
                <Row>
                    <Col md="8">
                        <FormGroup>
                            <Label>
                                Mes
                            </Label>
                            <Input type="select" value={month} onChange={e => setMonth(e.target.value)}>
                                <option value={1}>Enero</option>
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
                    <Col md="4">
                        <FormGroup>
                            <Label>
                                Año
                            </Label>
                            <Input type="number" min={2010} value={year} onChange={e => setYear(e.target.value)} />
                        </FormGroup>
                    </Col>
                </Row>
                {provItem.is_health_prof ?
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label>
                                    Cant. de Hs.
                                </Label>
                                <Input type="number" min={1} step={1} value={cantHours} onChange={e => setCantHours(e.target.value)} />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label>
                                    $ / Hs
                                </Label>
                                <Input value={provItem.amount} disabled />
                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>
                                <Label>
                                    Total
                                </Label>
                                <Input value={total} disabled />
                            </FormGroup>
                        </Col>
                    </Row> :
                    <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label>
                                    Total
                                </Label>
                                <Input type="number" value={total} onChange={e => setTotal(e.target.value)} />
                            </FormGroup>
                        </Col>
                    </Row>
                }
                <Row>
                    <Col md="12">
                        <Label>
                            Detalles u Observaciones
                        </Label>
                        <Input type="textarea" value={detail} onChange={e => setDetail(e.target.value)} />
                    </Col>
                </Row>
                <Row style={{ marginTop: "25px" }}>
                    <Col md="12" style={{ textAlign: "center" }}>
                        <Button
                            color="primary"
                            style={{ width: "150px", marginInline: "15px" }}
                            type="submit"
                        >Registrar</Button>
                        <Button
                            color="danger"
                            style={{ width: "150px", marginInline: "15px" }}
                        >Cancelar</Button>

                    </Col>
                </Row>
            </Form>
        )
    }
}

export default FormNewWork