const PROJECT = ""
const LOCAL_PORT = "3010"
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
const users = host + "/user"
const activity = host + "/activity"

const authDir = {
    auth
}

const activityDir = {
    activity
}

const permissionsDir = {
    permissions,
    sub: {
        list: "/list"
    }
}

const usersDir = {
    users,
    sub: {
        details: users + "/details",
        mydata: users + "/mydata"
    }
}

const routesDir = {
    routes,
    sub: {
        dashboard: routes + "/dashboard",
        userAdmin: routes + "/userAdmin"
    }
}

const API_ROUTES = {
    publicFiles,
    authDir,
    routesDir,
    permissionsDir,
    usersDir,
    activityDir
}

export default API_ROUTES