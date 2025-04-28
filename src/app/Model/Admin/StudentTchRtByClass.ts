export interface StudentTchRtByClass {
  Roll_NO:Number;
  TeacherID:Number;
  StudentID:Number;
  TeacherFullName: string;
  StudentFullName: string;
  Rating: number;
  Comments: string;
}
export interface StudentTchRtByClassBOm{
  StudentTchRtByClassList: StudentTchRtByClass[];
}
