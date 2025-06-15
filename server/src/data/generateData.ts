import { faker } from "@faker-js/faker";
import { User } from "../types/user.types";

const range = (len: number) => Array.from({ length: len }, (_, i) => i);

const newUser = (index: number): User => {
    return {
        id: index + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 70 }),
        visits: faker.number.int({ min: 0, max: 1000 }),
        progress: faker.number.int({ min: 0, max: 100 }),
        status: faker.helpers.shuffle<User["status"]>([
            "relationship",
            "complicated",
            "single",
        ])[0]!,
        createdAt: faker.date.past(),
    };
};

export const generateData = (size: number): User[] => {
    return range(size).map(newUser);
};

export const usersData = generateData(1_000_000);
