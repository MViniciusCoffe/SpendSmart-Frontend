import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get("authToken");
      const email = Cookies.get("userEmail")

      if (!token || !email) {
        router.push("/login");
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
