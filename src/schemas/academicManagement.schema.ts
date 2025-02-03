import { z } from "zod";

export const academicSemesterSchema = z.object({
  name: z.string({ required_error: "Name is a required field" }),
  year: z.string({ required_error: "Year is a required field" }),
  startMonth: z.string({ required_error: "This is a required field" }),
  endMonth: z.string({ required_error: "This is a required field" }),
});
