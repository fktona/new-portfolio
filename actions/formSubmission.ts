"use server";

export async function submitForm(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  const params = new URLSearchParams({
    userMail: "adetona.fk@gmail.com",
    userName: "Faith Adetona",
  });

  try {
    const response = await fetch(
      `https://sendspear.onrender.com/api/message?userMail=adetona.fk@gmail.com&userName=Faith Adetona`,
      {
        method: "POST",
        body: JSON.stringify({ message, name, email }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // if (!response.ok) {

    //   throw new Error("Failed to submit form");
    // }

    return { success: true, message: "Message Sent SuccessFully" };
  } catch (error) {
    return { success: false, message: "Failed to send message" };
  }
}
