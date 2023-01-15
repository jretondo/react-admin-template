import axios from 'axios';
import { useState } from 'react';
import ActionsBackend from './index';
import React from 'react';
import { processQueries } from 'function/processQueries';
import FileSaver from 'file-saver'

const ActionsBackendProvider = ({ children }) => {
    const [loadingActions, setLoadingActions] = useState(false)

    const axiosPost = async (url, data) => {
        setLoadingActions(true)
        return axios.post(url, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201 || res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosPut = async (url, data) => {
        setLoadingActions(true)
        return axios.put(url, data, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 201 || res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosDelete = async (url, id) => {
        setLoadingActions(true)
        return axios.delete(url + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGet = async (url, id) => {
        setLoadingActions(true)
        return axios.get(url + "/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGetQuery = async (url, querys) => {
        setLoadingActions(true)
        let query = ""
        if (querys.length > 0) {
            query = await processQueries(querys)
        }
        return axios.get(url + query, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token')
            }
        }).then(res => {
            if (res.data.status === 200) {
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosPostPDF = async (url, data) => {
        setLoadingActions(true)
        return axios.post(url, data, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            },
        }).then(res => {
            if (res.status === 201 || res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: "application/pdf" });
                FileSaver.saveAs(blob, filename);

                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            console.log('error :>> ', error);
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosGetPDF = async (url, id) => {
        setLoadingActions(true)
        return axios.get(url + "/" + id, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            },
        }).then(res => {
            if (res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: "application/pdf" });
                FileSaver.saveAs(blob, filename);
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    const axiosQueryPDF = async (url, queries) => {
        setLoadingActions(true)
        let query = ""
        if (queries.length > 0) {
            query = await processQueries(queries)
        }
        return axios.get(url + query, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('user-token'),
                Accept: 'application/pdf',
            },
        }).then(res => {
            if (res.status === 200) {
                let headerLine = res.headers['content-disposition'];
                const largo = parseInt(headerLine.length)
                let filename = headerLine.substring(21, largo);
                var blob = new Blob([res.data], { type: "application/pdf" });
                FileSaver.saveAs(blob, filename);
                return {
                    error: false,
                    data: res.data.body,
                    errorMsg: ""
                }
            } else {
                return {
                    error: true,
                    data: "",
                    errorMsg: "Error desconocido!"
                }
            }
        }).catch(error => {
            return {
                error: true,
                data: "",
                errorMsg: error.message
            }
        }).finally(() => {
            setLoadingActions(false)
        })
    }

    return (
        <ActionsBackend.Provider value={{
            loadingActions,
            axiosPost,
            axiosDelete,
            axiosGet,
            axiosPut,
            axiosGetQuery,
            axiosPostPDF,
            axiosGetPDF,
            axiosQueryPDF
        }}>
            {children}
        </ActionsBackend.Provider>
    )
}

export default ActionsBackendProvider