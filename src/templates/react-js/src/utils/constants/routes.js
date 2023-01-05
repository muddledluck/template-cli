import AuthenticatedRouteExample from "../../pages/example/authenticatedRouteExample";
import PublicRouteExample from "../../pages/example/publicRouteExample";
import UnauthenticatedRouteExample from "../../pages/example/unauthenticatedRouteExample";

export const PUBLIC_ROUTE = [
  {
    id: "publicRouteExample",
    path: "/",
    element: PublicRouteExample,
  },
];

export const AUTHENTICATED_ROUTE = [
  {
    id: "authenticatedRouteExample",
    path: "/authenticated",
    element: AuthenticatedRouteExample,
  },
];

export const UNAUTHENTICATED_ROUTE = [
  {
    id: "unauthenticatedRouteExample",
    path: "/unauthenticated",
    element: UnauthenticatedRouteExample,
  },
];
