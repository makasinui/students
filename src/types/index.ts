export type Student = {
    id: number;
    fullName: string;
    dateOfBirth: string;
    sections: number[];
    photoUrl: string;
    isActive: boolean;
    sectionItems?: Section[];
};

export type Section = {
    id: number;
    name: string;
    studentItems?: Student[];
};