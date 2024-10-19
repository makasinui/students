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
            if(arr.length === perPage) {
                return [arr];
            }
            const paginatedList = [];
            while(arr.length >= perPage) {
                paginatedList.push(arr.slice(0, perPage));
                arr = arr.slice(perPage, arr.length)
            }
            paginatedList.push(arr);
            return paginatedList.filter(Boolean);
        },
        getPaginatedStudents(page: number = 1, perPage: number = 10) {
            const store = useStore();
            const students = this.getPaginatedList(store.getStudents, perPage);
            console.log(students, students.length)
            return {
                data: students[page - 1] as Student[],
                total: students.length as number
            };
        },
        getPaginatedSections(page: number = 1, perPage: number = 10) {
            const store = useStore();
            const sections = this.getPaginatedList(store.getSections, perPage);
            
            return sections[page];
        }
    }
});
