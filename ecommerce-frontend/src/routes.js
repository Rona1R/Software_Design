import Dashboard from "views/Dashboard.js";
import Perdoruesit from "views/Perdoruesit";
import Produktet from "views/Produktet";
import Porosite from "views/Porosite";
import UserReviews from "views/UserReviews";
import Zbritjet from "views/Zbritjet";
import Kategorite from "views/Kategorite";
import Kompanite from "views/Kompanite";

const dashboardRoutes = [
  {
    path: "dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "perdoruesit",
    name: "Perdoruesit",
    icon: "nc-icon nc-single-02",
    component: Perdoruesit,
    layout: "/admin"
  },
  {
    path: "produktet",
    name: "Produktet",
    icon: "nc-icon nc-paper-2",
    component: Produktet,
    layout: "/admin"
  },
  {
    path: "kategorite",
    name: "Kategorite",
    icon: "nc-icon nc-bullet-list-67", 
    component: Kategorite,
    layout: "/admin"
  },
  {
    path: "kompanite",
    name: "Kompanite",
    icon: "fas fa-handshake",
    component: Kompanite,
    layout: "/admin"
  },
  {
    path: "zbritjet",
    name: "Zbritjet",
    icon: "fa-regular fa-percent",
    component: Zbritjet,
    layout: "/admin"
  },
  {
    path: "porosite",
    name: "Porosite",
    icon: "nc-icon nc-credit-card",
    component: Porosite,
    layout: "/admin"
  },
  {
    path: "reviews",
    name: "Reviews",
    icon: "nc-icon nc-chat-round",
    component: UserReviews,
    layout: "/admin"
  }
];

export default dashboardRoutes;
