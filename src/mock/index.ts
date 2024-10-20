import { Student, Section } from "../types";

export const students: Student[] = [
    {
        id: 1,
        fullName: 'Иванов Иван Иванович',
        dateOfBirth: '2000-04-15',
        photoUrl: 'https://example.com/photos/ivanov.jpg',
        isActive: true
      },
      {
        id: 2,
        fullName: 'Петров Петр Петрович',
        dateOfBirth: '2001-07-22',
        photoUrl: 'https://example.com/photos/petrov.jpg',
        isActive: false
      },
      {
        id: 3,
        fullName: 'Сидоров Сидор Сидорович',
        dateOfBirth: '1999-11-05',
        photoUrl: 'https://example.com/photos/sidorov.jpg',
        isActive: true
      },
      {
        id: 4,
        fullName: 'Кузнецова Ольга Николаевна',
        dateOfBirth: '2002-08-11',
        photoUrl: 'https://example.com/photos/kuznetsova.jpg',
        isActive: true
      },
      {
        id: 5,
        fullName: 'Михайлов Михаил Михайлович',
        dateOfBirth: '2000-02-28',
        photoUrl: 'https://example.com/photos/mikhailov.jpg',
        isActive: false
      },
      {
        id: 6,
        fullName: 'Смирнова Елена Сергеевна',
        dateOfBirth: '1998-12-19',
        photoUrl: 'https://example.com/photos/smirnova.jpg',
        isActive: true
      },
      {
        id: 7,
        fullName: 'Тихонов Андрей Петрович',
        dateOfBirth: '2003-09-30',
        photoUrl: 'https://example.com/photos/tikhonov.jpg',
        isActive: false
      },
      {
        id: 8,
        fullName: 'Лебедева Анна Александровна',
        dateOfBirth: '2001-05-14',
        photoUrl: 'https://example.com/photos/lebedeva.jpg',
        isActive: true
      },
      {
        id: 9,
        fullName: 'Григорьев Артем Викторович',
        dateOfBirth: '1999-10-23',
        photoUrl: 'https://example.com/photos/grigorev.jpg',
        isActive: false
      },
      {
        id: 10,
        fullName: 'Зайцева Виктория Владимировна',
        dateOfBirth: '2002-03-17',
        photoUrl: 'https://example.com/photos/zaitseva.jpg',
        isActive: true
      },
      {
        id: 11,
        fullName: 'Васильев Дмитрий Алексеевич',
        dateOfBirth: '2000-11-01',
        photoUrl: 'https://example.com/photos/vasiliev.jpg',
        isActive: true
      },
      {
        id: 12,
        fullName: 'Попова Марина Андреевна',
        dateOfBirth: '2001-06-09',
        photoUrl: 'https://example.com/photos/popova.jpg',
        isActive: false
      },
      {
        id: 13,
        fullName: 'Федоров Александр Евгеньевич',
        dateOfBirth: '1997-08-18',
        photoUrl: 'https://example.com/photos/fedorov.jpg',
        isActive: true
      },
      {
        id: 14,
        fullName: 'Морозова Екатерина Павловна',
        dateOfBirth: '2003-12-24',
        photoUrl: 'https://example.com/photos/morozova.jpg',
        isActive: true
      },
      {
        id: 15,
        fullName: 'Воробьев Алексей Николаевич',
        dateOfBirth: '1998-01-13',
        photoUrl: 'https://example.com/photos/vorobyev.jpg',
        isActive: false
      }
];

export const sections: Section[] = [
    {
        id: 1,
        name: 'Футбол',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 10
          },
          {
            id: 2,
            date: '2000-01-01',
            studentId: 1
          },
        
          {
            id: 3,
            date: '2000-01-01',
            studentId: 2
          },
          
        ]
      },
      {
        id: 2,
        name: 'Плавание',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 11
          },
          {
            id: 2,
            date: '2000-01-01',
            studentId: 3
          },
        ]
      },
      {
        id: 3,
        name: 'Баскетбол',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 12
          },
          {
            id: 2,
            date: '2000-01-01',
            studentId: 4
          },
        ]
      },
      {
        id: 4,
        name: 'Теннис',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 13
          },
          {
            id: 2,
            date: '2000-01-01',
            studentId: 5
          },
          {
            id: 3,
            date: '2000-01-01',
            studentId: 8
          },
        ]
      },
      {
        id: 5,
        name: 'Хоккей',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 14
          },
          {
            id: 2,
            date: '2000-01-01',
            studentId: 1
          },
          {
            id: 3,
            date: '2000-01-01',
            studentId: 6
          },
          {
            id: 4,
            date: '2000-01-01',
            studentId: 7
          },
          {
            id: 5,
            date: '2000-01-01',
            studentId: 9
          },
        ]
      },
      {
        id: 6,
        name: 'Легкая атлетика',
        students: [
          {
            id: 1,
            date: '2000-01-01',
            studentId: 15
          }
        ]
      }
]