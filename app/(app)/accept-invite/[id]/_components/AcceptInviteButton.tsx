"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function AcceptInviteButton() {
  const { pending } = useFormStatus()
  return <Button disabled={pending}>Accept</Button>
}
