import apiClient from './index';
import { PAGE_SIZE } from '@src/utils/constants';
import { UserApiResponse } from '@src/types/user.types';
import { SortingState } from '@tanstack/react-table';

const BASE_API = '/user'

type UserProps = {
    pageParam: number;
    sorting: SortingState
}

export const getUsers = async ({ pageParam, sorting }: UserProps): Promise<UserApiResponse> => {
    const response = await apiClient.get(`${BASE_API}`, {
        params: {
            start: pageParam,
            size: PAGE_SIZE,
            sort: sorting,
        },
    });
    return response.data;
};