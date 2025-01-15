import { Code, Users, Rocket, Cog, Linkedin, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EmailForm } from "@/components/EmailForm";
import * as motion from "framer-motion/client";
import { NavigationLink } from "@/components/NavigationLink";
import { Button } from "@/components/ui/button";

const links = [
  { id: "services", label: "Services" },
  //{ id: "case-studies", label: "Case Studies" },
  { id: "about", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-poppins">
      <header className="sticky top-0 bg-background px-4 lg:px-6 h-14 flex items-center">
        <div className="container mx-auto flex items-center">
          <Link className="flex items-center justify-center" href="#">
            <Code className="h-6 w-6 mr-2" />
            <span className="font-bold">BlackComet</span>
          </Link>
          <nav className="ml-auto flex gap-4 items-center sm:gap-6">
            {links.map((x, index) => (
              <motion.div
                key={x.id}
                initial={{
                  opacity: 0,
                  y: -20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.1,
                    duration: 0.4,
                  },
                }}
              >
                <NavigationLink navId={x.id}>
                  <Link
                    scroll={false}
                    href={`#${x.id}`}
                    className="text-sm font-medium hover:underline underline-offset-4"
                  >
                    {x.label}
                  </Link>
                </NavigationLink>
              </motion.div>
            ))}
            <Link href="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 items-center">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 justify-items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Forging the Future of Software
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                    BlackComet: Where young minds craft innovative solutions.
                    We&apos;re not just coding; we&apos;re engineering your
                    digital future.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Start Your Project
                  </Link>
                  <Link
                    className="inline-flex h-10 items-center justify-center rounded-md border border-gray-200 bg-white px-8 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Explore Our Work
                  </Link>
                </div>
              </div>
              <Image
                alt="BlackComet team collaborating"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src="/undraw_progress_black.png"
                width="550"
              />
            </div>
          </div>
        </section>
        <section
          id="services"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 justify-items-center"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Our Services
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  At BlackComet, we forge innovative software solutions tailored
                  to your unique business challenges.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <Users className="h-12 w-12 mx-auto" />
                <h3 className="text-xl font-bold">Agile Development Squads</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our young, energetic teams adapt swiftly to your project
                  needs, ensuring rapid development and iteration.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Rocket className="h-12 w-12 mx-auto" />
                <h3 className="text-xl font-bold">Cutting-Edge Solutions</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  We leverage the latest technologies to build modern, scalable
                  applications that keep you ahead of the competition.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <Cog className="h-12 w-12 mx-auto" />
                <h3 className="text-xl font-bold">
                  Tech Innovation Consulting
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our fresh perspective helps identify unique opportunities for
                  digital transformation in your business.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="about"
          className="w-full py-12 md:py-24 lg:py-32 justify-items-center"
        >
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Meet Our Innovators
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our team of passionate tech enthusiasts brings fresh ideas and
                  cutting-edge skills to every project.
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-center gap-6 py-12 lg:gap-12">
              {[
                {
                  name: "Nordin van Dijk",
                  role: "Full Stack Developer",
                  bio: "A coding prodigy with a knack for creating elegant, efficient solutions. Nordin's passion for tech started at 12, and he's been pushing boundaries ever since.",
                  image: "/profile_nordin.jpeg",
                  github: "https://github.com/nordinvandijk",
                  linkedin: "https://www.linkedin.com/in/nordinvandijk/"
                },
                {
                  name: "Jesper van Dijk",
                  role: "Full Stack Develoer",
                  bio: "With an eye for detail and a user-first mindset, Jesper crafts the most solid applications.",
                  image: "/profile_jesper.jpeg",
                  github: "https://github.com/jespervandijk",
                  linkedin: "https://www.linkedin.com/in/jesper-van-dijk-45b989193/"
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4 max-w-sm"
                  vocab="https://schema.org"
                  typeof="Person"
                >
                  <Image
                    alt={member.name}
                    className="rounded-full"
                    height="150"
                    src={member.image}
                    style={{
                      aspectRatio: "150/150",
                      objectFit: "cover",
                    }}
                    width="150"
                  />
                  <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold" property="name">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.role}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {member.bio}
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <Link
                      href={member.linkedin}
                      className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                      href={member.github}
                      className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* <section className="w-full py-12 md:py-24 lg:py-32 justify-items-center">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Client Success Stories
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  See how BlackComet&apos;s young, dynamic team has helped
                  businesses achieve their goals.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <Image
                  alt="Client"
                  className="rounded-full"
                  height="100"
                  src="/placeholder.svg"
                  style={{
                    aspectRatio: "100/100",
                    objectFit: "cover",
                  }}
                  width="100"
                />
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Mark Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Founder, TechStart
                  </p>
                  <p className="text-gray-500 dark:text-gray-400">
                    &quot;BlackComet&apos;s young team brought a fresh
                    perspective to our project. Their energy and innovative
                    ideas helped us launch our product ahead of schedule and
                    under budget.&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800 justify-items-center"
        >
          <div className="container mx-auto px-4 md:px-6 justify-items-center flex flex-col gap-4 items-center ">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to innovate with BlackComet?
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Let&apos;s discuss how our dynamic team can bring your ideas to
                life with cutting-edge technology.
              </p>
            </div>
            <div className="w-full max-w-sm">
              <EmailForm />
              <p className="text-xs text-center text-gray-500 dark:text-gray-400 my-2">
                We&apos;ll get back to you within 24 hours to schedule a chat.
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 BlackComet Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
