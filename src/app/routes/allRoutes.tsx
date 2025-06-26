import React from "react";

// Páginas públicas
const Login = React.lazy(() => import("@/features/auth/pages/Login"));

// Páginas protegidas
const Dashboard = React.lazy(
  () => import("@/features/dashboard/pages/Dashboard")
);
const Conversations = React.lazy(
  () => import("@/features/conversations/pages/Conversations")
);
const Assistants = React.lazy(
  () => import("@/features/assistants/pages/Assistants")
);
const Tools = React.lazy(() => import("@/features/tools/pages/Tools"));
const Contacts = React.lazy(() => import("@/features/contacts/pages/Contacts"));
const Integrations = React.lazy(
  () => import("@/features/integrations/pages/integrations")
);
const Segments = React.lazy(() => import("@/features/segments/pages/Segments"));
const Campaigns = React.lazy(
  () => import("@/features/campaigns/pages/Campaigns")
);
const Settings = React.lazy(() => import("@/features/settings/pages/Settings"));
const Profile = React.lazy(() => import("@/features/profile/pages/Profile"));

// Rotas públicas
export const publicRoutes = [{ path: "/login", component: <Login /> }];

// Rotas protegidas
export const authProtectedRoutes = [
  { path: "/", component: <Dashboard /> },
  { path: "/dashboard", component: <Dashboard /> },

  { path: "/conversations", component: <Conversations /> },

  { path: "/assistants", component: <Assistants /> },
  { path: "/tools", component: <Tools /> },

  { path: "/contacts", component: <Contacts /> },

  { path: "/integrations", component: <Integrations /> },

  { path: "/segments", component: <Segments /> },

  { path: "/campaigns", component: <Campaigns /> },

  { path: "/settings", component: <Settings /> },
  { path: "/profile", component: <Profile /> },
];
