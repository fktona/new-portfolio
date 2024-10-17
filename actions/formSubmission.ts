"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export async function submitForm(prevState: any, formData: FormData) {
  const validatedFields = formSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "There were errors with your submission",
    };
  }

  const { name, email, message } = validatedFields.data;

  const params = new URLSearchParams({
    userMail: "adetona.fk@gmail.com",
    userName: "Faith Adetona",
  });

  try {
    const response = await fetch(
      `https://sendspear.onrender.com/api/message?${params}`,
      {
        method: "POST",
        body: JSON.stringify({ message, name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    return { success: true, message: "Form submitted successfully" };
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, message: "Failed to submit form" };
  }
}
