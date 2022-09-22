export interface Student {
    id?: string;
    name: string;
    age:number;
    mark: number;
    gender: 'male' | 'female';
    city: string;
    createdAt?: number;
    updatedAt?: number;
}

export const initialStudent: Student = {
    name: '',
    age: 0,
    city: '',
    gender: 'male',
    mark: 0,
  };