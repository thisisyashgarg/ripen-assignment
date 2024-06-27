"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import RadioGroup from "@/components/ui/RadioGroup"
import profileFormZodObject from "@/validations/profile-form"
import { Gender, CompanySize } from "@/validations/types"

type FormData = z.infer<typeof profileFormZodObject>

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(profileFormZodObject),
  })

  const onSubmit = async (data: FormData) => {
    console.log(data)
  }

  return (
    <div className="flex justify-center items-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 border  rounded-lg space-y-6 w-full max-w-lg"
      >
        <h2 className="text-2xl font-medium">Profile Form</h2>
        <div className="space-y-5">
          <Input
            label="Name"
            type="text"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Age"
            type="number"
            error={errors.age?.message}
            {...register("age", { valueAsNumber: true })}
          />

          <RadioGroup
            label="Gender"
            name="gender"
            register={register}
            options={[
              { value: Gender.Male, label: "Male" },
              { value: Gender.Female, label: "Female" },
            ]}
            error={errors.gender?.message}
          />
          <Select
            label="Company Size"
            options={[
              { value: CompanySize.One, label: CompanySize.One },
              { value: CompanySize.TwoToTen, label: CompanySize.TwoToTen },
              {
                value: CompanySize.ElevenToHundred,
                label: CompanySize.ElevenToHundred,
              },
              {
                value: CompanySize.OneHundredPlus,
                label: CompanySize.OneHundredPlus,
              },
            ]}
            error={errors.companySize?.message}
            {...register("companySize")}
          />
          <Input
            label="Profile Image"
            type="file"
            error={errors.profileImage?.message as string}
            accept=".png, .jpg, .jpeg, .webp"
            {...register("profileImage")}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default Home
