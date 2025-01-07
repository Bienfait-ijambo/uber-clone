import {
    createMemoryHistory,
    createRouter,
    createWebHistory,
} from "vue-router";

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
          },
          {
            path: "/vehicles",
            component: () => import("../pages/admin/vehicle/VehiclePage.vue"),
          },
          
        ]
       
    },
];

export const router = createRouter({
    //   history: createMemoryHistory('/app'),
    history: createWebHistory("/app"),
    routes,
});
