export interface TchStdRatingAll{
  TecherID:Number;
  StudentID:Number;
  TeacherFullName: string;
  StudentFullName: string;
  Rating: number;
  Comments: string;
}
export interface TchStdRatingAllBOm{
  ListofAllTchStdRt: TchStdRatingAll[];
}
