import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { UserApiResponse } from "../types/user.types";
import { SortingState } from "@tanstack/react-table";
import { getUsers } from "@src/api/users.api";

export const useUserData = (sorting: SortingState) => {
    return useInfiniteQuery<UserApiResponse>({
        queryKey: [
            'people',
            sorting, //refetch when sorting changes
        ],
        queryFn: async ({ pageParam = 0 }) => {
            const page = pageParam as number;
            const data = await getUsers({ pageParam: page, sorting });
            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (_lastGroup, groups) => groups.length,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};
