"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export const EmailForm = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
    alert("Thank you for your interest! We'll be in touch soon.");
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        className="max-w-lg flex-1"
        placeholder="Enter your email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Get in Touch</Button>
    </form>
  );
};
