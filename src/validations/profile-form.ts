import { z } from "zod"
import { ImageType, Gender, CompanySize } from "./types"

const profileFormZodObject = z.object({
  profileImage: z
    .any()
    .refine(
      (files) =>
        typeof window !== "undefined" &&
        files instanceof FileList &&
        files.length > 0,
      {
        message: "Profile image is required",
      }
    )
    .refine(
      (files) =>
        typeof window !== "undefined" &&
        files instanceof FileList &&
        files.length === 1,
      {
        message: "Only one file can be uploaded",
      }
    )
    .refine(
      (files) =>
        typeof window !== "undefined" &&
        files instanceof FileList &&
        Object.values(ImageType).includes(files[0]?.type as ImageType),
      { message: "Invalid file type" }
    ),
  name: z.string().min(1, { message: "Name is required" }),
  age: z.number().min(0, { message: "Age must be a positive number" }),
  gender: z.nativeEnum(Gender, {
    errorMap: () => ({ message: "Gender is required" }),
  }),
  companySize: z.nativeEnum(CompanySize, {
    errorMap: () => ({ message: "Company size is required" }),
  }),
})

export default profileFormZodObject
