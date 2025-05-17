import { User } from "../data/user.stub"
import axios from "axios";

const getAllUsers = async (): Promise<User[]> => {
    try {
        return axios.get('http://localhost:8080/users');
    } catch (error: any) {
        throw new Error(error.message)
    }
}

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
        const user = usersData.find(user => user.name === name);
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
