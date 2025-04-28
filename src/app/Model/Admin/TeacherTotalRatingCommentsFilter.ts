export interface TeacherTotalRatingCommentsFilter {
  TeacherID: number;
  FirstName: string;
  LastName: string;
  AverageRating: number;
  FeedBackCount?: number;  // Optional, as it can be null in C#
}
