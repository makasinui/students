import { defineStore } from "pinia";
import { sections, students } from "../mock";

export const useStore = defineStore("store", {
	state: () => ({
		students,
		sections,
	}),
	getters: {
        getStudents(state) {
            const students = state.students;
            const sections = state.sections;

            const studentsWithSections = students.map(student => ({
              ...student,
              sectionItems: student.sections.map(id => sections.find(section => section.id === id)!)  
            }));

            return studentsWithSections;
        },
        getSections(state) {
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
});
