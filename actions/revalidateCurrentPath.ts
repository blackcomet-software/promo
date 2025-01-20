"use server";

import { revalidatePath } from "next/cache";

export async function revalidateCurrentPath() {
  console.log("Revalidating current path")
  revalidatePath("/")
}
