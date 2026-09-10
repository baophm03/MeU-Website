import type { Metadata } from "next";
import { Hero } from "./_components/hero";
import { Challenges } from "./_components/challenges";
import { BusinessSolutions } from "./_components/business-solutions";
import { AiWorkflow } from "./_components/ai-workflow";
import { Industries } from "./_components/industries";
import { Products } from "./_components/products";
import { ClientSuccess } from "./_components/client-success";
import { Capabilities } from "./_components/capabilities";
import { WhyMeu } from "./_components/why-meu";
import { Insights } from "./_components/insights";
import { FinalCta } from "./_components/final-cta";

export const metadata: Metadata = {
  title: "MeU Solutions — Technology & Digital Transformation Partner",
  description:
    "MeU Solutions partners with ambitious organizations to design, build and operate the systems that move their business forward: transformation, software engineering, applied AI and IT talent.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Challenges />
      <BusinessSolutions />
      <AiWorkflow />
      <Industries />
      <Products />
      <ClientSuccess />
      <Capabilities />
      <WhyMeu />
      <Insights />
      <FinalCta />
    </>
  );
}
