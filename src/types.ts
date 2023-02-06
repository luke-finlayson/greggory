import { ObjectId } from "mongodb";

export type Player = {
    _id: ObjectId;
    name: string;
    scores: number[];
};

export type SocketCallback<T> = {
    status: string,
    data: T[]
}
