import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { registerSchema, TregisterSchema } from "@/src/middleware/types";
import { useEffect, useState } from "react";
import EmployeeDetail from "../EmployeeCard/EmployeeDetail";
import emailjs from "@emailjs/browser";
import { useContext } from "react";
import { ThemeProviderContext } from "../../../components/theme-provider";
interface EmployeeDetails {
  name: string;
  email: string;
  phone?: string | undefined;
  role: "Developer" | "Designer" | "Manager";
  joiningDate: string;
}
const EmpForm = () => {
  const [employee, setEmployee] = useState<EmployeeDetails[]>([]);
  const context = useContext(ThemeProviderContext);
  //console.log("emp", employee.length);
  useEffect(() => {
    const savedEmployees = JSON.parse(
      localStorage.getItem("employees") || "[]"
    );
    setEmployee(savedEmployees);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    reset,
  } = useForm<TregisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const sendEmail = (data: TregisterSchema) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      joiningDate: data.joiningDate,
    };

    emailjs
      .send("service_iys87gq", "template_jv4xpto", templateParams, {
        publicKey: "Sy-d_9hKXf1H_4u2C",
      })
      .then((response) => console.log("Email sent successfully", response))
      .catch((error) => console.error("Email send error", error));
  };

  const onSubmit = (data: TregisterSchema) => {
    const newEmployees = [...employee, data];
    setEmployee(newEmployees);
    localStorage.setItem("employees", JSON.stringify(newEmployees));
    sendEmail(data);
    reset({
      name: "",
      email: "",
      phone: "",
      role: "Developer",
      joiningDate: "",
    });
  };
  return (
    <div
      className={`flex items-center justify-evenly min-h-screen  box-border ${
        context.theme === "dark" ? "bg-slate-700" : "bg-gray-100"
      }`}
    >
      <Card className="w-1/4">
        <CardHeader>
          <CardTitle>Add Employee </CardTitle>
          <CardDescription>Employee Registration Form.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("name")}
                  type="name"
                  id="name"
                  name="name"
                  placeholder="Name of employee"
                />
                {errors.name && (
                  <p className="text-red-500">{`${errors.name.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="E-mail of employee"
                />
                {errors.email && (
                  <p className="text-red-500">{`${errors.email.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  {...register("phone")}
                  type="phone"
                  id="phone"
                  name="phone"
                  placeholder="contact of employee"
                />
                {errors.phone && (
                  <p className="text-red-500">{`${errors.phone.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">Role</Label>
                <Select
                  // {...register("role")}
                  onValueChange={(value) =>
                    setValue(
                      "role",
                      value as "Developer" | "Designer" | "Manager"
                    )
                  }
                  name="role"
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Developer">Developer</SelectItem>
                    <SelectItem value="Designer">Designer</SelectItem>
                    <SelectItem value="Manager">Manager</SelectItem>
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-red-500">{`${errors.role.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Joining Date</Label>
                <Input
                  {...register("joiningDate")}
                  type="date"
                  id="date"
                  placeholder="Joining Date"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
                {errors.joiningDate && (
                  <p className="text-red-500">{`${errors.joiningDate.message}`}</p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Cancel</Button>
                  <Button disabled={isSubmitting} type="submit">
                    Add Employee
                  </Button>
                </CardFooter>
                {/* <button disabled={isSubmitting} type="submit">
                  Add Employee
                </button> */}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <Card className="w-4/6">
        <CardHeader>
          <CardTitle>Employee List</CardTitle>
          <CardDescription>Employee Details table.</CardDescription>
        </CardHeader>
        {employee.length > 0 ? (
          <EmployeeDetail employee={employee} />
        ) : (
          <p className="p-3 text-red-500">
            No data to Preview. Please Add Employee Details.
          </p>
        )}
      </Card>
    </div>
  );
};

export default EmpForm;
