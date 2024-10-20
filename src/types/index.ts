export type Student = {
    id: number;
    fullName: string;
    dateOfBirth: string;
    photoUrl: string;
    isActive: boolean;
};

export type SectionWithStudent = {
    id: number;
    date: string;
    studentId: number
}

export type Section = {
    id: number;
    name: string;
    students: SectionWithStudent[];
};

export type Sort = {
    name: string;
    desc: boolean;
    clear: boolean;
}