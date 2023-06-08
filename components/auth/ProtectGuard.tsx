import { useLazyGetmeQuery } from "@/store/service/endpoints/auth.endpoints";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ScreenLoader } from "../loader";
import { useDispatch } from "react-redux";
import { storeMe } from "@/store/slice/user.slice";

export const ProtectGuard = ({ children }: { children: React.ReactNode }) => {
  const [getme, res] = useLazyGetmeQuery();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { status, data } = useSession();
  const router = useRouter();
  const { push: navigate } = router;

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(storeMe(res.data.data));
      setIsLoading(false);
    } else if (res.isError) {
      navigate("/signin");
    }
  }, [res]);

  useEffect(() => {
    const isAuthorized = status === "authenticated";

    if (status !== "loading") {
      if (isAuthorized && data?.user) {
        setIsLoading(true);
        // @ts-ignore
        getme({ id: data?.user.id });
      } else {
        setIsLoading(false);
        navigate("/signin");
      }
    }
  }, [status, data]);

  if (isLoading) {
    return <ScreenLoader />;
  }

  return <>{children}</>;
};
