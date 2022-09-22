import { useForm } from "react-hook-form";

// @ts-ignore
export const withUseFormHook = (Component) => {
  // @ts-ignore
  return (props) => {
    const form = useForm();
    return <Component {...props} {...form} />;
  };
};
