"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

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

    await db.collection("users").doc(uid).set({
      name,
      email,
    });
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

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;
  try{
    const userRecord=await auth.getUserByEmail(email)
    if (!userRecord){
        return{
            sucess:false,
            message:'User Not Exist, Create Account'
        }
    }
    await setSessionCookie(idToken)

  }catch(e){
    console.log('Error : Error in SignIn',e)
    return{
        sucess:false,
        message:'Failed To log in'

    }
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7 * 1000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}
