"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {SignUpCall} from '../../../functions/auth.js'
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    contact_number: "",
    password: "",
  });
  const router = useRouter();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
//     console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
// console.log("Full URL:", `${process.env.NEXT_PUBLIC_API_BASE_URL}/signUp`);
    e.preventDefault();
    console.log("Form data:", formData);
    try {
        const response = await SignUpCall(formData);
        console.log("Response:", response);
      
        if (response.message === "User registered successfully") {
          toast.success("Signup successful");
          router.push("/login");
        } else {
          toast.error(response.message || "Signup failed. Please try again.");
        }
      } catch (error) {
        toast.error("Something went wrong. Please try again later.");
        console.error(error);
      }
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>Fill the details to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>User Name</Label>
                <Input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Contact Number</Label>
                <Input
                  name="contact_number"
                  type="tel"
                  value={formData.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
              <div className="text-center text-sm mt-4">
  Already have an account?{" "}
  <Link href="/login" className="underline underline-offset-4 ">
    Login
  </Link>
</div>
            
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
