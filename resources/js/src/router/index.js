import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";
import { isAdmin } from "../middleware/isAdmin";
import { isCustomer } from "../middleware/isCustomer";


const routes = [
    {
        path: "/login",
        name: "login",
        component: () => import("../pages/auth/LoginPage.vue"),
    },
    {
        path: "/signup",
        name: "signup",
        component: () => import("../pages/auth/SignUpPage.vue")
    },
    {
        path: "/dashbaord",
        name: "dashbaord",
        component: () => import("../pages/admin/AdminPage.vue"),
        children:[
          {
            path: "/users",
            component: () => import("../pages/admin/user/UserPage.vue"),
            beforeEnter: isAdmin
           
          },
          {
            path: "/vehicles",
            component: () => import("../pages/admin/vehicle/VehiclePage.vue"),
          },

          {
            path: "/welcome",
            component: () => import("../pages/admin/welcome/WelcomePage.vue"),
          },
          
          {
            path: "/profile",
            component: () => import("../pages/admin/user/ProfilePage.vue"),
          },

          {
            path: "/customer_map",
            component: () => import("../pages/admin/map/CustomerMapPage.vue"),
          },

          
          {
            path: "/driver_map",
            component: () => import("../pages/admin/map/DriverMapPage.vue"),
          },

           
          {
            path: "/customer_notifications",
            component: () => import("../pages/admin/notification/CustomerNotification.vue"),
          },

          {
            path: "/driver_notifications",
            component: () => import("../pages/admin/notification/DriverNotification.vue"),
          },

          {
            path: "/trips",
            component: () => import("../pages/admin/trip/TripPage.vue"),
            beforeEnter:isCustomer
          },

          
          {
            path: "/payments",
            component: () => import("../pages/admin/payment/PaymentPage.vue"),
          }
         
         
         
         
          
          
        ]
       
    },
];

export const router = createRouter({
    //   history: createMemoryHistory('/app'),
    history: createWebHistory("/app"),
    routes,
});
