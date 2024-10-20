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
            
            const studentsWithSections = students.map(student => ({
              ...student,
              sectionItems: student.sections.map(id => sections.find(section => section.id === id)!)  
            }));
            
            return studentsWithSections;
        },
        getSections(state): Section[] {
            const students = state.students;
            const sections = state.sections

            const sectionsWithStudents = sections.map(section => {
                const assignedStudents = students.filter(student => student.sections.includes(section.id));
                return {
                    ...section,
                    students: assignedStudents
                }
            });

            return sectionsWithStudents;
        }
    },
    actions: {
        // function for get paginated list it returns [[], [], []]
        getPaginatedList(arr: Student[] | Section[], perPage: number, search: string = '', sort: Sort | undefined) {
            const paginatedList = [];
            if(search) {
                const searchString = search.toLowerCase().trim();
                console.log(searchString)
                arr = arr.filter(item => {
                    const fullNameMatches = item?.fullName?.toLowerCase()?.includes(searchString);
                    const photoUrlMatches = item?.photoUrl?.toLowerCase()?.includes(searchString);
                    const nameMatches = item?.name?.toLowerCase()?.includes(searchString);
                    const idMatches = item.id.toString().includes(searchString)

                    return fullNameMatches || photoUrlMatches || nameMatches || idMatches
                })
            }
            if(sort?.name) {
                arr = arr.sort((a,b) => {
                    const field = sort.name;
                    const desc = sort.desc

                    const firstField = a[field];
                    const secondField = b[field];

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
            while(arr.length >= perPage) {
                paginatedList.push(arr.slice(0, perPage));
                arr = arr.slice(perPage, arr.length)
            }
            paginatedList.push(arr);
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
        getPaginatedSections(page: number = 1, perPage: number = 10) {
            const store = useStore();
            const sections = this.getPaginatedList(store.getSections, perPage);
            
            return sections[page];
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
        }
    }
});
