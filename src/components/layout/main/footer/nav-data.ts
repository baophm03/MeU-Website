export type MegaLink = { label: string; labelKey?: string; href: string; note?: string; noteKey?: string };

export const footerColumns: { heading: string; headingKey: string; links: MegaLink[] }[] = [
  {
    heading: "What We Do",
    headingKey: "footer.whatWeDo",
    links: [
      { label: "End-to-end Digital Transformation", labelKey: "footer.digitalTransformation", href: "/solutions/digital-transformation" },
      { label: "Enterprise Management", labelKey: "footer.enterpriseManagement", href: "/solutions/enterprise-management" },
      { label: "Custom Software Solutions", labelKey: "footer.customSoftware", href: "/solutions/custom-software-solutions" },
      { label: "MeOS Technology Ecosystem", labelKey: "footer.meosEcosystem", href: "/products/meos" },
      { label: "Website Operations & Management", labelKey: "footer.websiteOperations", href: "/solutions/website-operations" },
      { label: "IT Talent Solutions", labelKey: "footer.talentSolutions", href: "/solutions/it-talent-solutions" },
      { label: "Technology Training", labelKey: "footer.techTraining", href: "/solutions/technology-training" },
    ],
  },
  {
    heading: "Technology Capabilities",
    headingKey: "footer.techCapabilities",
    links: [
      { label: "Technology Consulting", labelKey: "footer.techConsulting", href: "/solutions/technology-consulting" },
      { label: "AI Application Consulting", labelKey: "footer.aiConsulting", href: "/solutions/ai-consulting" },
      { label: "System Integration", labelKey: "footer.systemIntegration", href: "/solutions/system-integration" },
      { label: "Maintenance & Managed Services", labelKey: "footer.maintenanceManaged", href: "/solutions/maintenance-managed-services" },
      { label: "Clouds & DevOps", labelKey: "footer.cloudDevops", href: "/solutions/cloud-devops" },
    ],
  },
  {
    heading: "Industries",
    headingKey: "footer.industries",
    links: [
      { label: "Healthcare", labelKey: "footer.healthcare", href: "/industries/healthcare" },
      { label: "Logistics", labelKey: "footer.logistics", href: "/industries/logistics-supply-chain" },
      { label: "Retail", labelKey: "footer.retail", href: "/industries/retail-commerce" },
      { label: "Life Sciences", labelKey: "footer.lifeSciences", href: "/industries/pharmaceutical-life-sciences" },
      { label: "Education", labelKey: "footer.education", href: "/industries/education-training" },
      { label: "Associations", labelKey: "footer.associations", href: "/industries/associations-organizations" },
    ],
  },
  {
    heading: "Products",
    headingKey: "footer.products",
    links: [
      { label: "MeOS 365", labelKey: "footer.meos365", href: "/products/meos-365" },
      { label: "MeOS Ecommerce", labelKey: "footer.meosEcommerce", href: "/products/meos-ecommerce" },
      { label: "MeOS MiniApp", labelKey: "footer.meosMiniApp", href: "/products/meos-miniapp" },
      { label: "MeOS Omni", labelKey: "footer.meosOmni", href: "/products/meos-omni" },
      { label: "MeOS", labelKey: "footer.meos", href: "/products/meos" },
    ],
  },
  {
    heading: "Resources",
    headingKey: "footer.resources",
    links: [
      { label: "Case Studies", labelKey: "footer.caseStudies", href: "/case-studies" },
      { label: "Insights", labelKey: "footer.insights", href: "/insights" },
      { label: "Reports", labelKey: "footer.reports", href: "/insights/reports" },
      { label: "News & Events", labelKey: "footer.newsEvents", href: "/insights/news" },
    ],
  },
  {
    heading: "Company",
    headingKey: "footer.company",
    links: [
      { label: "About MeU", labelKey: "footer.aboutMeu", href: "/about/us" },
      { label: "Vision | Mission | Core Values", labelKey: "footer.visionMission", href: "/about/vision-mission" },
      { label: "Partners & Clients", labelKey: "footer.clientsPartners", href: "/about/partners-clients" },
      { label: "Careers", labelKey: "footer.careers", href: "/about/careers" },
      { label: "Contact", labelKey: "footer.contact", href: "/contact" },
    ],
  },
  {
    heading: "Trust & Legal",
    headingKey: "footer.trustLegal",
    links: [
      { label: "Security", labelKey: "footer.security", href: "/trust/security" },
      { label: "Privacy Policy", labelKey: "footer.privacyPolicy", href: "/trust/privacy" },
      { label: "Cookie Policy", labelKey: "footer.cookiePolicy", href: "/trust/cookie-policy" },
      { label: "Terms of Use", labelKey: "footer.termsOfUse", href: "/trust/terms-of-use" },
      { label: "Data Protection", labelKey: "footer.dataProtection", href: "/trust/data-protection" },
    ],
  },
];
