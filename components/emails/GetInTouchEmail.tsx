import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

export const GetInTouchEmail = () => (
  <Html>
    <Head />
    <Preview>Hey there! We’re excited to connect with you!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={section}>
          <Img
            src="https://www.blackcomet.net/icon_512.png"
            width="50"
            height="50"
            alt="BlackComet"
          />
          <Hr style={seperator} />
          <Text style={paragraph}>
            Just wanted to give you a quick heads-up that we’ve received your
            request to get in touch. Our team is already gearing up to get back
            to you. Sit tight, we’ll reach out soon with all the info, answers,
            or friendly chit-chat you need.
          </Text>

          <Text style={paragraph}>
            We appreciate your interest and look forward to connecting with you
            soon.
          </Text>

          <Text style={paragraph}>
            Best regards, the <strong>BlackComet</strong> team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  color: "#24292e",
  padding: "0 8px",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "20px 0 48px",
};

const section = {
  padding: "24px",
  border: "solid 1px #dedede",
  borderRadius: "5px",
};

const seperator = {
  color: "hsl(240,5.9%,90%)",
  margin: "20px 0",
};

const paragraph = {
  color: "hsl(240,10%,3.9%)",
  fontSize: "16px",
  lineHeight: "24px",
};
