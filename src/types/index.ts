type Student = {
    id: number;
    fullName: string;
    dateOfBirth: string;
    sections: Section[];
    photoUrl: string;
    isActive: boolean;
};

// Тип для секции
type Section = {
    id: number;
    name: string;
    enrolledDate: string;
    students: Student[];
};