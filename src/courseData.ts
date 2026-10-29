import {
  COURSE_MODULES_A0_A1,
  type CourseModule,
  type CourseDialogueLine,
  type CourseActiveRecallItem,
  type CourseQuestion,
  type CoursePracticeDrill,
  type CourseVocabTuple,
} from './courseDataA0A1.ts';
import { COURSE_MODULES_A2_C1 } from './courseDataA2C1.ts';

export type {
  CourseModule,
  CourseDialogueLine,
  CourseActiveRecallItem,
  CourseQuestion,
  CoursePracticeDrill,
  CourseVocabTuple,
};

export const COURSE_MODULES: CourseModule[] = [
  ...COURSE_MODULES_A0_A1,
  ...COURSE_MODULES_A2_C1,
];
