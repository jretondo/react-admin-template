import index from "views/admin/dashboard"

var routes = [
  {
    path: "/index",
    name: "Inicio",
    icon: "ni ni-tv-2 text-blue",
    component: index,
    layout: process.env.PUBLIC_URL + "/admin",
    id: 0
  }
];
export default routes;
