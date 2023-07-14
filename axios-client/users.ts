import { apiInstance } from ".";

export async function axiosFetchFollowers({
  skip,
  take,
  id,
}: {
  skip: number;
  take: number;
  id: string;
}) {
  return await apiInstance.get(
    `/user/getFollowers?take=${take}&skip=${skip}&id=${id}`
  );
}

export async function axiosFetchFollowings({
  skip,
  take,
  id,
}: {
  skip: number;
  take: number;
  id: string;
}) {
  return await apiInstance.get(
    `/user/getFollowings?take=${take}&skip=${skip}&id=${id}`
  );
}
