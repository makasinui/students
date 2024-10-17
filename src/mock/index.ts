import { Student, Section } from "../types";

export const students: Student[] = [
    {
        id: 1,
        fullName: 'Иванов Иван Иванович',
        dateOfBirth: '2000-04-15',
        sections: [1],
        photoUrl: 'https://example.com/photos/ivanov.jpg',
        isActive: true
      },
      {
        id: 2,
        fullName: 'Петров Петр Петрович',
        dateOfBirth: '2001-07-22',
        sections: [1,2],
        photoUrl: 'https://example.com/photos/petrov.jpg',
        isActive: false
      },
      {
        id: 3,
        fullName: 'Сидоров Сидор Сидорович',
        dateOfBirth: '1999-11-05',
        sections: [3],
        photoUrl: 'https://example.com/photos/sidorov.jpg',
        isActive: true
      },
      {
        id: 4,
        fullName: 'Кузнецова Ольга Николаевна',
        dateOfBirth: '2002-08-11',
        sections: [3,4],
        photoUrl: 'https://example.com/photos/kuznetsova.jpg',
        isActive: true
      },
      {
        id: 5,
        fullName: 'Михайлов Михаил Михайлович',
        dateOfBirth: '2000-02-28',
        sections: [4],
        photoUrl: 'https://example.com/photos/mikhailov.jpg',
        isActive: false
      },
      {
        id: 6,
        fullName: 'Смирнова Елена Сергеевна',
        dateOfBirth: '1998-12-19',
        sections: [4],
        photoUrl: 'https://example.com/photos/smirnova.jpg',
        isActive: true
      },
      {
        id: 7,
        fullName: 'Тихонов Андрей Петрович',
        dateOfBirth: '2003-09-30',
        sections: [1,5],
        photoUrl: 'https://example.com/photos/tikhonov.jpg',
        isActive: false
      },
      {
        id: 8,
        fullName: 'Лебедева Анна Александровна',
        dateOfBirth: '2001-05-14',
        sections: [2,3],
        photoUrl: 'https://example.com/photos/lebedeva.jpg',
        isActive: true
      },
      {
        id: 9,
        fullName: 'Григорьев Артем Викторович',
        dateOfBirth: '1999-10-23',
        sections: [6,1],
        photoUrl: 'https://example.com/photos/grigorev.jpg',
        isActive: false
      },
      {
        id: 10,
        fullName: 'Зайцева Виктория Владимировна',
        dateOfBirth: '2002-03-17',
        sections: [2,6],
        photoUrl: 'https://example.com/photos/zaitseva.jpg',
        isActive: true
      },
      {
        id: 11,
        fullName: 'Васильев Дмитрий Алексеевич',
        dateOfBirth: '2000-11-01',
        sections: [3,4],
        photoUrl: 'https://example.com/photos/vasiliev.jpg',
        isActive: true
      },
      {
        id: 12,
        fullName: 'Попова Марина Андреевна',
        dateOfBirth: '2001-06-09',
        sections: [1,4],
        photoUrl: 'https://example.com/photos/popova.jpg',
        isActive: false
      },
      {
        id: 13,
        fullName: 'Федоров Александр Евгеньевич',
        dateOfBirth: '1997-08-18',
        sections: [2],
        photoUrl: 'https://example.com/photos/fedorov.jpg',
        isActive: true
      },
      {
        id: 14,
        fullName: 'Морозова Екатерина Павловна',
        dateOfBirth: '2003-12-24',
        sections: [6],
        photoUrl: 'https://example.com/photos/morozova.jpg',
        isActive: true
      },
      {
        id: 15,
        fullName: 'Воробьев Алексей Николаевич',
        dateOfBirth: '1998-01-13',
        sections: [5],
        photoUrl: 'https://example.com/photos/vorobyev.jpg',
        isActive: false
      }
];

export const sections: Section[] = [
    {
        id: 1,
        name: 'Футбол'
      },
      {
        id: 2,
        name: 'Плавание'
      },
      {
        id: 3,
        name: 'Баскетбол'
      },
      {
        id: 4,
        name: 'Теннис'
      },
      {
        id: 5,
        name: 'Хоккей'
      },
      {
        id: 6,
        name: 'Легкая атлетика'
      }
]