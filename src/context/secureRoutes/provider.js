import React, { useCallback, useEffect, useState } from 'react';
import SecureRoutesContext from './index';
import { Redirect } from "react-router-dom";

const SecureRoutesProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [urlRoute, setUrlRoute] = useState("")

    const fetchSecureRoute = useCallback(async () => {
        try {
            let res = await fetch(urlRoute, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('user-token')
                },
            })
            let data = await res.json()
            const status = parseInt(data.status)
            if (status === 200) {
                setIsLogin(true)
            } else {
                setIsLogin(false)
            }
        } catch (error) {

            setIsLogin(false)
        }
        setIsLogin(true)
        setUrlRoute("")
    }, [urlRoute])

    useEffect(() => {
        if (urlRoute !== "") {
            fetchSecureRoute()
        }
    }, [urlRoute, fetchSecureRoute])

    if (isLogin) {
        return (
            <SecureRoutesContext.Provider value={{
                setUrlRoute
            }}>
                {children}
            </SecureRoutesContext.Provider>
        )
    } else {
        return (
            <Redirect
                className="text-light"
                to={process.env.PUBLIC_URL + "/auth/login"}
            />
        )
    }
}

export default SecureRoutesProvider