import { User, UserApiResponse } from "../types/user.types";
import { usersData } from "../data/generateData";

const getAllUsers = async (page: number, pageSize: number, sort: string): Promise<UserApiResponse> => {
    try {
        let sortedData = [...usersData];

        if (sort) {
            const [key, order] = sort.split(":");
            sortedData.sort((a, b) => {
                if (order === "desc") return a[key as keyof typeof a] < b[key as keyof typeof b] ? 1 : -1;
                return a[key as keyof typeof a] > b[key as keyof typeof b] ? 1 : -1;
            });
        }

        const pagedData = sortedData.slice(page * pageSize, page * pageSize + pageSize);

        await sleep();

        const response: UserApiResponse = {
            data: pagedData,
            meta: {
                totalRowCount: usersData.length,
            },
        };
        return response;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const sleep = (ms = 1000) => {
    return new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });
};

const addUser = (user: User): User[] => {
    try {
        usersData.push(user)
        return usersData;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const getUserAvg = (): number => {
    try {
        const avg = usersData.reduce((acc, currentUser, index) => {
            acc += currentUser.age
            if (index === usersData.length - 1) {
                return acc / usersData.length
            }
            return acc
        }, 0)
        return avg
    } catch (error: any) {
        throw new Error(error.message)
    }

}

const getUsersOlderThenAge = (age: number) => {
    try {
        return usersData.filter(user => user.age > age);
    } catch (error: any) {
        throw new Error(error.message)
    }
}

const updateUserAge = (name: string, age: number): boolean => {
    try {
        const user = usersData.find(user => user.firstName === name);
        if (user) {
            user.age = age;
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { getAllUsers, getUserAvg, addUser, getUsersOlderThenAge, updateUserAge }
