"use server";

import { db } from "@/firebase/admin";

export async function signUp(parms: SignUpParams) {
  const { uid, name, email } = parms;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        sucess: false,
        message: "User Already Exists. Please Sign in insted",
      };
    }

    await db.collection('users').doc(uid).set({
        name,email 
    })
  } catch (e: any) {
    console.log("ERROR : Creating user", e);

    if (e.code === "auth/email-already-exists") {
      return {
        sucess: false,
        message: "This Email Already in Use",
      };
    }
    return {
      sucess: false,
      message: "Failed to Create An Account",
    };
  }
}
