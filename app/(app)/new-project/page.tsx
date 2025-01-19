import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewProject() {
  return (
    <div className="container mx-auto flex flex-col gap-8 items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-2">
      <h1 className="font-black text-4xl tracking-tight">New project</h1>
      <p className="text-muted-foreground">Every great accomplishment begins with a spark of an idea</p>
      </div>
      <div className=" gap-12 grid grid-cols-2 justify-center">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>From scratch</CardTitle>
          <CardDescription className="min-h-12">A great option when you have experience with IT projects</CardDescription>
        </CardHeader>
        <div className="flex-1">

        </div>
        <CardFooter className="justify-center">
          <Button>I&apos;l do it myself</Button>
        </CardFooter>
      </Card>

      <Card className="max-w-sm flex flex-col">
        <CardHeader>
          <CardTitle>Use a template</CardTitle>
          <CardDescription>Get up and ready with one of our template projects</CardDescription>
        </CardHeader>
        <div className="my-auto" />
        <CardFooter className="justify-center">
          <Button>Lets get started</Button>
        </CardFooter>
      </Card>
      </div>
    </div>
  )
}
