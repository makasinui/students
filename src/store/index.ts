import { defineStore } from "pinia";
import { sections, students } from "../mock";
import { Section, Sort, Student } from "../types";

export const useStore = defineStore("store", {
	state: () => ({
		students,
		sections,
	}),
	getters: {
        getStudents(state): Student[] {
            const students = state.students;
            const sections = state.sections;
            
            const studentsWithSections = students.map(student => {
                const sectionItems = sections
                    .filter(section => section.students.some(s => s.studentId === student.id))
                    .map(section => {
                        const studentEnrollment = section.students.find(s => s.studentId === student.id);
                        return {
                            ...section,
                            enrollmentDate: studentEnrollment ? studentEnrollment.date : null // Дата зачисления
                        };
                    });
            
                return {
                    ...student,
                    sections: sectionItems
                };
            });
            
            return studentsWithSections;
        },
        getSections(state): Section[] {
            const students = state.students;
            const sections = state.sections

            const sectionsWithStudents = sections.map(section => {
                const sectionStudents = section.students.map(enrollment => {
                    const student = students.find(s => s.id === enrollment.studentId);
                    
                    return {
                        ...enrollment,
                        head: student,
                        date: enrollment.date,
                    };
                });
            
                return {
                    ...section,
                    students: sectionStudents, // добавляем массив студентов в секцию
                };
            });
            

            return sectionsWithStudents;
        }
    },
    actions: {
        // function for get paginated list it returns [[], [], []]
        getPaginatedList(arr: Student[] | Section[], perPage: number, search: string = '', sort: Sort | undefined) {
            // чтобы всегда обновлялся state, даже если сортировка или фильтры = 0
            let resultArr = [...arr];
            const paginatedList = [];
            if(search) {
                const searchString = search.toLowerCase().trim();

                resultArr = resultArr.filter(item => {
                    const fullNameMatches = (item as Student)?.fullName?.toLowerCase()?.includes(searchString);
                    const photoUrlMatches = (item as Student)?.photoUrl?.toLowerCase()?.includes(searchString);
                    const nameMatches = (item as Section)?.name?.toLowerCase()?.includes(searchString);
                    const idMatches = item.id.toString().includes(searchString)

                    return fullNameMatches || photoUrlMatches || nameMatches || idMatches
                })
            }
            if(sort?.name) {
                resultArr = resultArr.sort((a,b) => {
                    const field = sort.name;
                    const desc = sort.desc

                    const firstField = (a as any)[field];
                    const secondField = (b as any)[field];

                    if(desc) {
                        if(typeof firstField === 'boolean' || typeof firstField === 'number') {
                            return Number(secondField) - Number(firstField)
                        }
                        if(Array.isArray(firstField)) {
                            return firstField.length - secondField.length
                        }
                        return firstField.localeCompare(secondField)
                    }
                    if(typeof firstField === 'boolean' || typeof firstField === 'number') {
                        return Number(firstField) - Number(secondField)
                    }
                    if(Array.isArray(firstField)) {
                        return secondField.length - firstField.length
                    }
                    return secondField.localeCompare(firstField)
                })
            }
            while(resultArr.length >= perPage) {
                paginatedList.push(resultArr.slice(0, perPage));
                resultArr = resultArr.slice(perPage, arr.length)
            }
            paginatedList.push(resultArr);
            return paginatedList.filter(item => item.length);
        },
        getPaginatedStudents(page: number = 1, perPage: number = 10, search: string = "", sort: Sort | undefined) {
            const store = useStore();
            const students = this.getPaginatedList(store.getStudents, perPage, search, sort);
            
            return {
                data: students[page - 1] as Student[],
                total: students.length as number
            };
        },
        getStudent(id: number) {
            const store = useStore();
            const students = store.getStudents;

            return students.find(student => student.id === id);
        },
        editStudent(data: Student) {
            const idx = this.students.findIndex(student => student.id === data.id);
            try {
                this.students[idx] = {...data};
                return true;
            } catch(err) {
                return err;
            }
            
        },
        createStudent(data: Student): Student {
            const newStudent = {...data, id: this.students.at(-1)!.id + 1};
            this.students.push({...newStudent})
            return newStudent;
        },
        deleteStudent(id: number) {
            this.students = this.students.filter(student => student.id !== id);
            return true;
        },
        getPaginatedSections(page: number = 1, perPage: number = 10, search: string = "", sort: Sort | undefined) {
            const store = useStore();
            const sections = this.getPaginatedList(store.getSections, perPage, search, sort);
            
            return {
                data: sections[page - 1] as Section[],
                total: sections.length as number
            };
        },
        getSection(id: number) {
            const store = useStore();
            const sections = store.getSections;

            return sections.find(section => section.id === id);   
        },
        editSection(data: Section) {
            const idx = this.sections.findIndex(section => section.id === data.id);
            try {
                const date = new Date().toLocaleDateString('en-CA');
                data.students = data.students.map(student => ({...student, date}));
                this.sections[idx] = {...data};
                return true;
            } catch(err) {
                return err;
            }
        },
        createSection(data: Section): Section {
            const date = new Date().toLocaleDateString('en-CA');
            data.students = data.students.map(student => ({...student, date}));

            const newSection = {...data, id: this.sections.at(-1)!.id + 1};
            this.sections.push({...newSection})
            
            return newSection;
        }
    }
});
