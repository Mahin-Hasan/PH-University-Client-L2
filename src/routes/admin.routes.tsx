import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";

// ? * ! todo for comment highlight

type TRoute = {
  path: string;
  element: ReactNode;
};
const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "User Managemenet",
    children: [
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
    ],
  },
];

//* programatical way
export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
  if (item.path && item.element) {
    acc.push({
      path: item.path,
      element: item.element,
    });
  }
  if (item.children) {
    item.children.forEach((child) => {
      acc.push({
        path: child.path,
        element: child.element,
      });
    });
  }

  return acc;
}, []);

console.log(adminRoutes);

//! Hard coded way
// export const adminPaths = [
//   {
//     index: true,
//     // path: "dashboard", // when used as children we cannot use as absolute path like /dashboard
//     element: <AdminDashboard />,
//   },
//   {
//     path: "dashboard", // when used as children we cannot use as absolute path like /dashboard
//     element: <AdminDashboard />,
//   },
//   {
//     path: "create-student",
//     element: <CreateStudent />,
//   },
//   {
//     path: "create-admin",
//     element: <CreateAdmin />,
//   },
//   {
//     path: "create-faculty",
//     element: <CreateFaculty />,
//   },
// ];
