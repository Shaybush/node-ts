export type User = {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    visits: number;
    progress: number;
    status: "relationship" | "complicated" | "single";
    createdAt: Date;
};

export type UserApiResponse = {
    data: User[];
    meta: {
        totalRowCount: number;
    };
};
