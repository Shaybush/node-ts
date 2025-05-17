import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { UserApiResponse } from "../types/user.types";
import { PAGE_SIZE } from "@src/utils/constants";
import { SortingState } from "@tanstack/react-table";

export const useUserData = (sorting: SortingState) => {
    return useInfiniteQuery<UserApiResponse>({
        queryKey: [
            'people',
            sorting, //refetch when sorting changes
        ],
        queryFn: async ({ pageParam = 0 }) => {
            const response = await axios.get('http://localhost:8080/user', {
                params: {
                    start: pageParam,
                    size: PAGE_SIZE,
                    sort: sorting,
                },
            });
            return response.data;
        },
        initialPageParam: 0,
        getNextPageParam: (_lastGroup, groups) => groups.length,
        refetchOnWindowFocus: false,
        placeholderData: keepPreviousData,
    });
};
