import { NextFunction, Request, Response } from 'express';
import { addUser, getAllUsers, getUserAvg, getUsersOlderThenAge, updateUserAge } from '../services/user.service';
import { validUser } from '../validations/user.validation';
import { usersData } from '../data/generateData';

export const userController = {
    getAll: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { start = 0, size = 50, sort = "" } = req.query;
            const startIndex = Number(start);
            const pageSize = Number(size);

            const users = await getAllUsers(startIndex, pageSize, sort as string);
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    },
    getAgeAvg: (req: Request, res: Response, next: NextFunction) => {
        try {
            const avgAge = getUserAvg();
            res.status(200).json({ averageAge: avgAge });
        } catch (error) {
            next(error)
        }
    },
    addUser: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age, name } = req.body;
            if (!age || !name) throw new Error('must provide age and name');
            validUser(req.body);

            addUser(req.body);
            res.status(201).json(usersData);
        } catch (error) {
            next(error);
        }
    },
    getUsersAboveAge: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age } = req.body;
            if (!age) throw new Error('must provide an age');
            validUser(req.body);

            const matchedUsers = getUsersOlderThenAge(age);
            res.status(200).json(matchedUsers);
        } catch (error) {
            next(error);
        }
    },
    updateUserAge: (req: Request, res: Response, next: NextFunction) => {
        try {
            const { age, name } = req.body;
            if (!age || !name) throw new Error('must provide age and name')
            validUser(req.body);

            const isChanged = updateUserAge(name, age);
            if (!isChanged) throw new Error('user not found');
            res.status(201).json(usersData)
        } catch (error) {
            next(error);
        }
    }
};
