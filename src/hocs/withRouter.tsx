import { useLocation, useNavigate, useParams } from "react-router-dom";

//@ts-ignore
export function withRouter(Component) {
  //@ts-ignore
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        location={location}
        params={params}
        navigate={navigate}
      />
    );
  }

  return ComponentWithRouterProp;
}