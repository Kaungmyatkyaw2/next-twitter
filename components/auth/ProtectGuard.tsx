import { useLazyGetmeQuery } from "@/store/service/endpoints/auth.endpoints";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ScreenLoader } from "../loader";
import { useDispatch } from "react-redux";
import { storeMe } from "@/store/slice/user.slice";
import { useNavigationEvent } from "@/hooks";

export const ProtectGuard = ({ children }: { children: React.ReactNode }) => {
  const [getme, res] = useLazyGetmeQuery();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const { status, data } = useSession();
  const router = useRouter();
  const path = usePathname();
  const { push: navigate } = router;

  console.log(path);

  useNavigationEvent(() => {
    console.log("first");
  });

  useEffect(() => {
    if (res.isSuccess) {
      dispatch(storeMe(res.data.data));
      setIsLoading(false);
      if (path?.includes("sign")) {
        navigate("/");
      }
    } else if (res.isError) {
      navigate("/signin");
    }
  }, [res]);

  useEffect(() => {
    const isAuthorized = status === "authenticated";

    if (status !== "loading") {
      // @ts-ignore
      if (isAuthorized && data.user.id) {
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
