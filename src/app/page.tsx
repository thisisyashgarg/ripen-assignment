"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

enum Gender {
  Male = "Male",
  Female = "Female",
}

enum CompanySize {
  One = "1",
  TwoToTen = "2-10",
  ElevenToHundred = "11-100",
  OneHundredPlus = "100+",
}

enum ImageType {
  PNG = "image/png",
  JPEG = "image/jpeg",
  JPG = "image/jpg",
  WEBP = "image/webp",
}

const schema = z.object({
  profileImage: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, {
      message: "Profile image is required",
    })
    .refine((files) => files.length === 1, {
      message: "Only one file can be uploaded",
    })
    .refine(
      (files) => Object.values(ImageType).includes(files[0]?.type as ImageType),
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
type FormData = z.infer<typeof schema>

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" p-8 rounded-lg  w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6">Profile Form</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Profile Image
          </label>
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .webp"
            {...register("profileImage")}
            className="mt-1 block w-full text-sm text-gray-500
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-full file:border-0
                       file:text-sm file:font-semibold
                       file:bg-violet-50 file:text-violet-700
                       hover:file:bg-violet-100"
          />
          {errors.profileImage && (
            <p className="text-red-500 text-sm">
              {errors.profileImage.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            {...register("age", { valueAsNumber: true })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <div className="mt-1 flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value={Gender.Male}
                {...register("gender")}
                className="mr-2"
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value={Gender.Female}
                {...register("gender")}
                className="mr-2"
              />
              Female
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Company Size
          </label>
          <select
            {...register("companySize")}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={CompanySize.One}>1</option>
            <option value={CompanySize.TwoToTen}>2-10</option>
            <option value={CompanySize.ElevenToHundred}>11-100</option>
            <option value={CompanySize.OneHundredPlus}>100+</option>
          </select>
          {errors.companySize && (
            <p className="text-red-500 text-sm">{errors.companySize.message}</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
