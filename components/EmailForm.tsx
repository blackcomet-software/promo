"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { getInTouch } from "@/actions/email";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("This is not a valid email!"),
});

export const EmailForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    getInTouch(values.email);
    console.log(values);
  }

  function onError() {
    toast.error(
      "Oops! That doesn’t look like a valid email. Please double-check and try again.",
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onError)}
        className="flex space-x-2"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Enter your email"
                  {...field}
                  disabled={form.formState.isSubmitSuccessful}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button disabled={form.formState.isSubmitSuccessful} type="submit">
          {form.formState.isSubmitSuccessful ? "See you soon" : "Get in Touch"}
        </Button>
      </form>
    </Form>
  );
};
