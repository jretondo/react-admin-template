const PROJECT = ""
const LOCAL_PORT = ""
const API_PRODUCTION_ADDRESS = "https://api-prod.nekoadmin.com.ar"
let host = ""
let publicFiles = ""

if (process.env.NODE_ENV === "development") {
    host = `http://localhost:${LOCAL_PORT}/api`
    publicFiles = `http://localhost:${LOCAL_PORT}/static`
} else {
    host = `${API_PRODUCTION_ADDRESS}/${PROJECT}/api`
    publicFiles = `${API_PRODUCTION_ADDRESS}/${PROJECT}/static`
}

const auth = host + "/auth"
const routes = host + "/routes"
const permissions = host + "/permissions"


const authDir = {
    auth
}

const permissionsDir = {
    permissions,
    sub: {
        list: "/list"
    }
}

const routesDir = {
    routes,
    sub: {
        dashboard: routes + "/dashboard"
    }
}

const API_ROUTES = {
    publicFiles,
    authDir,
    routesDir,
    permissionsDir
}

export default API_ROUTES