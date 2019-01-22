import { init } from "helpers/init";

export class AssignedQualification {
  public id?: number;
  public enrollment?: string;
  public name?: string;
  public career?: string;
  public subjectCode?: string;
  public subject?: string;
  public qualificationId?: number;
  public qualification?: number;
  public letter?: string;
  public year?: number;
  public periodId?: number;
  public period?: string;

	constructor(data: AssignedQualification) {
    init<AssignedQualification>(this, data);
  }
}
