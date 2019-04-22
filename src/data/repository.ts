import { TestModel } from "models/TestModel";
import { Post } from "models/Post";
import { AssignedQualification } from "models/AssignedQualification";

export const testData: TestModel[] = [
  { name: "Pruebita 1", quantity: 1, things: ["one"] },
  { name: "Pruebita 2", quantity: 2, things: ["one", "two"] },
  { name: "Pruebita 3", quantity: 3, things: ["one", "two", "three"] }
]

export const posts: Array<Partial<Post>> = [
  { 
    title: "Post 1", 
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, eius necessitatibus, quasi et, fuga sunt vel nulla dolor similique placeat nihil earum. Rerum error quam, voluptatem reprehenderit in eos nobis!",
    dateTime: new Date(2017, 10, 3)
  },
  { 
    title: "Post 2", 
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, eius necessitatibus, quasi et, fuga sunt vel nulla dolor similique placeat nihil earum. Rerum error quam, voluptatem reprehenderit in eos nobis!",
    dateTime: new Date()
  },
  { 
    title: "Post 3", 
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, eius necessitatibus, quasi et, fuga sunt vel nulla dolor similique placeat nihil earum. Rerum error quam, voluptatem reprehenderit in eos nobis!",
    dateTime: new Date()
  }
]

export function assignedQualifications() {
  const qualifications: AssignedQualification[] = [];

  for (let i = 0; i < 10; i++) {
    const qualification = new AssignedQualification({
      career: `Carrera ${i}`,
      enrollment: `Matricula-H-${i}`,
      id: i,
      letter: 'A',
      name: `Person ${i}`,
      period: `Periodo ${i}`,
      periodId: i * 300,
      qualification: i * 400,
      qualificationId: i * 500,
      subject: `Asignatura ${i}`,
      subjectCode: `Subject-C-${i}`,
      year: 2000 + i
    })
    
    qualifications.push(qualification)
  }

  return qualifications;
}