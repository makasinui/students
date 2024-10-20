import { defineStore } from "pinia";
import { sections, students } from "../mock";
import { Section, Student } from "../types";

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
        getPaginatedList(arr: Student[] | Section[], perPage: number) {
            const paginatedList = [];
            while(arr.length >= perPage) {
                paginatedList.push(arr.slice(0, perPage));
                arr = arr.slice(perPage, arr.length)
            }
            paginatedList.push(arr);
            return paginatedList.filter(item => item.length);
        },
        getPaginatedStudents(page: number = 1, perPage: number = 10) {
            const store = useStore();
            const students = this.getPaginatedList(store.getStudents, perPage);
            
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
