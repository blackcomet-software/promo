
import {
  Body,
  Button,
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

export const ProjectInvite = (props: {projectName: string, inviteId: string}) => (
  <Html>
    <Head />
    <Preview>You are invited to a project</Preview>
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
            You have been invited to join the {props.projectName} project! 
          </Text>
          <Button href={`https://www.blackcomet.net/accept-invite/${props.inviteId}`}>Accept Invite</Button>
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
