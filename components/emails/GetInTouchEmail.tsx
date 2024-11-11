import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";
import tailwindConfig from "@/tailwind.config";
import "@/app/globals.css";

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://www.blackcomet.net";

export const GetInTouchEmail = () => (
  <Tailwind config={tailwindConfig}>
    <Html>
      <Head />
      <Preview>Hey there! We’re excited to connect with you!</Preview>
      <Body className="bg-neutral-50">
        <Container style={container} className="mb-16">
          <Section className="py-5">
            <Img
              src={`${baseUrl}/icon_512.png`}
              width="49"
              height="21"
              alt="Stripe"
            />
            <Hr className="border-[#E4E4E7] my-5" />

            <Text style={paragraph}>
              Just wanted to give you a quick heads-up that we’ve received your
              request to get in touch. Our team is already gearing up to get
              back to you. Sit tight, we’ll reach out soon with all the info,
              answers, or friendly chit-chat you need.
            </Text>

            <Text style={paragraph}>
              We appreciate your interest and look forward to connecting with
              you soon.
            </Text>

            <Text style={paragraph}>Best regards, The BlackComet team</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

const container = {
  backgroundColor: "var(--card)",
  borderColor: "var(--border)",
  borderWidth: 1,
  margin: "0 auto",
  padding: "20px 0 48px",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
};
