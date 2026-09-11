export type MegaLink = { label: string; labelKey?: string; href: string; note?: string; noteKey?: string };
export type MegaColumn = { heading: string; headingKey?: string; blurb: string; blurbKey?: string; exploreHref: string; links: MegaLink[] };
export type NavItem = {
  label: string;
  labelKey?: string;
  href: string;
  columns?: MegaColumn[];
  featured?: { eyebrow: string; title: string; body: string; href: string; cta: string };
};

const businessSolutions: MegaColumn = {
  heading: "Business Solutions",
  headingKey: "mega.businessSolutions",
  blurb: "Start from the outcome you need in the operation.",
  blurbKey: "mega.businessSolutionsBlurb",
  exploreHref: "/solutions/business-solutions",
  links: [
    { label: "Digital Transformation", labelKey: "mega.digitalTransformation", href: "/solutions/digital-transformation" },
    { label: "Business Process Optimization", labelKey: "mega.businessProcessOpt", href: "/solutions/business-process-optimization" },
    { label: "Enterprise Management", labelKey: "mega.enterpriseManagement", href: "/solutions/enterprise-management" },
    { label: "Customer Experience", labelKey: "mega.customerExperience", href: "/solutions/customer-experience" },
    { label: "Digital Commerce", labelKey: "mega.digitalCommerce", href: "/solutions/digital-commerce" },
    { label: "AI & Intelligent Automation", labelKey: "mega.aiIntelligentAuto", href: "/solutions/ai-intelligent-automation" },
    { label: "Custom Software Solutions", labelKey: "mega.customSoftware", href: "/solutions/custom-software-solutions" },
  ],
};

const technologyCapabilities: MegaColumn = {
  heading: "Technology Capabilities",
  headingKey: "mega.techCapabilities",
  blurb: "How the work gets designed, built, integrated and operated.",
  blurbKey: "mega.techCapabilitiesBlurb",
  exploreHref: "/solutions/technology-capabilities",
  links: [
    { label: "Technology Consulting", labelKey: "mega.techConsulting", href: "/solutions/technology-consulting" },
    { label: "Software Engineering", labelKey: "mega.softwareEngineering", href: "/solutions/software-engineering" },
    { label: "AI Engineering", labelKey: "mega.aiEngineering", href: "/solutions/ai-engineering" },
    { label: "Quality Engineering", labelKey: "mega.qualityEngineering", href: "/solutions/quality-engineering" },
    { label: "System Integration", labelKey: "mega.systemIntegration", href: "/solutions/system-integration" },
    { label: "Cloud & DevOps", labelKey: "mega.cloudDevops", href: "/solutions/cloud-devops" },
    { label: "Product & UI/UX Design", labelKey: "mega.productUiUx", href: "/solutions/product-ui-ux-design" },
    { label: "Maintenance & Managed Services", labelKey: "mega.maintenanceManaged", href: "/solutions/maintenance-managed-services" },
  ],
};

const talentEnablement: MegaColumn = {
  heading: "Talent & Enablement",
  headingKey: "mega.talentEnablement",
  blurb: "Add capacity to your teams, or grow the people you already have.",
  blurbKey: "mega.talentEnablementBlurb",
  exploreHref: "/solutions/talent-enablement",
  links: [
    { label: "IT Talent Solutions", labelKey: "mega.itTalentSolutions", href: "/solutions/it-talent-solutions", note: "Staff augmentation · dedicated & project teams", noteKey: "mega.itTalentSolutionsNote" },
    { label: "Technology Training", labelKey: "mega.techTraining", href: "/solutions/technology-training", note: "Corporate upskilling · bootcamps · partnerships", noteKey: "mega.techTrainingNote" },
  ],
};

export const industries: MegaLink[] = [
  { label: "Healthcare", labelKey: "mega.healthcare", href: "/industries/healthcare", note: "Patient access, appointments and operations", noteKey: "mega.healthcareNote" },
  { label: "Logistics & Supply Chain", labelKey: "mega.logisticsSupply", href: "/industries/logistics-supply-chain", note: "Shipment and order visibility", noteKey: "mega.logisticsSupplyNote" },
  { label: "Retail & Commerce", labelKey: "mega.retailCommerce", href: "/industries/retail-commerce", note: "Omnichannel selling and fulfillment", noteKey: "mega.retailCommerceNote" },
  { label: "Pharmaceutical & Life Sciences", labelKey: "mega.pharmaLifeSciences", href: "/industries/pharmaceutical-life-sciences", note: "Distribution, documents and training", noteKey: "mega.pharmaLifeSciencesNote" },
  { label: "Education & Training", labelKey: "mega.educationTraining", href: "/industries/education-training", note: "Learner, instructor and admin journeys", noteKey: "mega.educationTrainingNote" },
  { label: "Associations & Organizations", labelKey: "mega.associationsOrgs", href: "/industries/associations-organizations", note: "Member lifecycle and engagement", noteKey: "mega.associationsOrgsNote" },
];

export const navigation: NavItem[] = [
  {
    label: "What We Do",
    labelKey: "nav.whatWeDo",
    href: "/solutions",
    columns: [businessSolutions, technologyCapabilities, talentEnablement],
  },
  {
    label: "Industries",
    labelKey: "nav.industries",
    href: "/industries",
    columns: [
      {
        heading: "Industries we work in",
        headingKey: "mega.industriesWeWorkIn",
        blurb: "Only sectors with validated domain knowledge and delivery evidence.",
        blurbKey: "mega.industriesWeWorkInBlurb",
        exploreHref: "/industries",
        links: industries,
      },
    ],
  },
  {
    label: "Products & Platforms",
    labelKey: "nav.products",
    href: "/products",
    columns: [
      {
        heading: "Browse by category",
        headingKey: "mega.browseByCategory",
        blurb: "Productised platforms with a stable roadmap and a live demo.",
        blurbKey: "mega.browseByCategoryBlurb",
        exploreHref: "/products",
        links: [
          { label: "All Products", labelKey: "mega.allProducts", href: "/products" },
          { label: "Enterprise Platforms", labelKey: "mega.enterprisePlatforms", href: "/products/enterprise" },
          { label: "AI Platforms", labelKey: "mega.aiPlatforms", href: "/products/ai" },
          { label: "Commerce Platforms", labelKey: "mega.commercePlatforms", href: "/products/commerce" },
          { label: "Industry Platforms", labelKey: "mega.industryPlatforms", href: "/products/industry" },
        ],
      },
    ],
  },
  {
    label: "Client Success",
    labelKey: "nav.clientSuccess",
    href: "/case-studies",
    columns: [
      {
        heading: "Client Success",
        headingKey: "mega.clientSuccess",
        blurb: "Challenge, solution and measured impact — filtered the way you buy.",
        blurbKey: "mega.clientSuccessBlurb",
        exploreHref: "/case-studies",
        links: [
          { label: "Featured Case Studies", labelKey: "mega.featuredCaseStudies", href: "/case-studies/featured" },
          { label: "All Case Studies", labelKey: "mega.allCaseStudies", href: "/case-studies" },
          { label: "By Industry", labelKey: "mega.byIndustry", href: "/case-studies/industry" },
          { label: "By Solution", labelKey: "mega.bySolution", href: "/case-studies/solution" },
          { label: "By Technology", labelKey: "mega.byTechnology", href: "/case-studies/technology" },
        ],
      },
    ],
  },
  {
    label: "Insights",
    labelKey: "nav.insights",
    href: "/insights",
    columns: [
      {
        heading: "Insights",
        headingKey: "mega.insights",
        blurb: "Practical perspective for leaders making technology decisions.",
        blurbKey: "mega.insightsBlurb",
        exploreHref: "/insights",
        links: [
          { label: "AI & Automation", labelKey: "mega.insightsAiAutomation", href: "/insights/ai-automation" },
          { label: "Digital Transformation", labelKey: "mega.insightsDigitalTrans", href: "/insights/digital-transformation" },
          { label: "Enterprise Technology", labelKey: "mega.enterpriseTech", href: "/insights/enterprise-tech" },
          { label: "Software Engineering", labelKey: "mega.insightsSoftwareEng", href: "/insights/software-engineering" },
          { label: "Industry Insights", labelKey: "mega.industryInsights", href: "/insights/industry" },
          { label: "Reports & Whitepapers", labelKey: "mega.reportsWhitepapers", href: "/insights/reports" },
          { label: "News & Events", labelKey: "mega.newsEvents", href: "/insights/news" },
        ],
      },
    ],
  },
  {
    label: "About MeU",
    labelKey: "nav.about",
    href: "/about",
    columns: [
      {
        heading: "About MeU",
        headingKey: "mega.aboutMeu",
        blurb: "Who we are and how we work.",
        blurbKey: "mega.aboutMeuBlurb",
        exploreHref: "/about",
        links: [
          { label: "About Us", labelKey: "mega.aboutUs", href: "/about/us" },
          { label: "Our Story", labelKey: "mega.ourStory", href: "/about/story" },
          { label: "Vision & Mission", labelKey: "mega.visionMission", href: "/about/vision-mission" },
          { label: "Leadership", labelKey: "mega.leadership", href: "/about/leadership" },
          { label: "Partners & Clients", labelKey: "mega.partnersClients", href: "/about/partners-clients" },
          { label: "Locations", labelKey: "mega.locations", href: "/about/locations" },
          { label: "Careers", labelKey: "mega.careers", href: "/about/careers" },
          { label: "Contact", labelKey: "mega.contact", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "Trust Center",
    labelKey: "nav.trustCenter",
    href: "/trust",
    columns: [
      {
        heading: "Trust Center",
        headingKey: "mega.trustCenter",
        blurb: "How we protect your data, privacy and AI deployments.",
        blurbKey: "mega.trustCenterBlurb",
        exploreHref: "/trust",
        links: [
          { label: "Security", labelKey: "mega.security", href: "/trust/security" },
          { label: "Privacy", labelKey: "mega.privacy", href: "/trust/privacy" },
          { label: "Data Protection", labelKey: "mega.dataProtection", href: "/trust/data-protection" },
          { label: "Responsible AI", labelKey: "mega.responsibleAi", href: "/trust/responsible-ai" },
        ],
      },
    ],
  },
];

export const footerColumns: { heading: string; headingKey: string; links: MegaLink[] }[] = [
  {
    heading: "What We Do",
    headingKey: "footer.whatWeDo",
    links: [
      { label: "Technology Consulting", labelKey: "footer.techConsulting", href: "/solutions/technology-consulting" },
      { label: "Software Engineering", labelKey: "footer.softwareEngineering", href: "/solutions/software-engineering" },
      { label: "AI & Automation", labelKey: "footer.aiAutomation", href: "/solutions/ai-intelligent-automation" },
      { label: "Quality Engineering", labelKey: "footer.qualityEngineering", href: "/solutions/quality-engineering" },
      { label: "System Integration", labelKey: "footer.systemIntegration", href: "/solutions/system-integration" },
      { label: "Talent Solutions", labelKey: "footer.talentSolutions", href: "/solutions/it-talent-solutions" },
      { label: "Technology Training", labelKey: "footer.techTraining", href: "/solutions/technology-training" },
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
      { label: "Products & Platforms", labelKey: "footer.productsPlatforms", href: "/products" },
      { label: "AI Platforms", labelKey: "footer.aiPlatforms", href: "/products/ai" },
      { label: "Enterprise Platforms", labelKey: "footer.enterprisePlatforms", href: "/products/enterprise" },
      { label: "Commerce Platforms", labelKey: "footer.commercePlatforms", href: "/products/commerce" },
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
      { label: "Leadership", labelKey: "footer.leadership", href: "/about/leadership" },
      { label: "Clients & Partners", labelKey: "footer.clientsPartners", href: "/about/partners-clients" },
      { label: "Careers", labelKey: "footer.careers", href: "/about/careers" },
      { label: "Locations", labelKey: "footer.locations", href: "/about/locations" },
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
