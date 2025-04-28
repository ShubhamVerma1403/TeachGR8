
export interface TeacherBOm{
  ListOfTeacher:Teacher[];
}
export interface Teacher {
  TeacherID:Number;
  StudentID:Number;
  FullName: string;
  Subject: string;
  Post: string;
  Rating: number;
  Comments: string;
}
