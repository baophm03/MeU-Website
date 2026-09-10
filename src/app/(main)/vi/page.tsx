import Link from "next/link";
import { ArrowRight, Check, ChevronRight, MoveDownRight } from "lucide-react";
import type { ReactNode } from "react";
import styles from "../(home)/meu-home.module.css";
import HomeMotion from "../(home)/home-motion";

const challenges = [
  ["01", "Modernize fragmented systems", "Turn disconnected tools into one reliable operating environment."],
  ["02", "Move work without bottlenecks", "Redesign approvals and workflows around how your teams actually operate."],
  ["03", "Make data decision-ready", "Create a shared, governed view of performance across the business."],
  ["04", "Apply AI where it matters", "Build practical automation with people in control of critical decisions."],
  ["05", "Launch digital products", "Move from an ambitious concept to a resilient product customers can use."],
  ["06", "Extend your delivery capacity", "Add experienced product and engineering teams without adding complexity."],
] as const;

const solutions = ["Business process optimization", "Enterprise management systems", "Customer experience platforms", "Digital commerce", "Data & analytics", "Cloud modernization"] as const;
const industries = ["Financial services", "Manufacturing", "Retail & commerce", "Healthcare", "Education", "Professional services"] as const;
const capabilities = [
  ["01", "Consult", "Frame the opportunity and define a measurable path."],
  ["02", "Build", "Design and engineer software around real operating needs."],
  ["03", "Integrate", "Connect platforms, data and teams into one system."],
  ["04", "Test", "Validate quality, resilience and readiness before launch."],
  ["05", "Operate", "Improve the product continuously with accountable support."],
] as const;
const insights = [
  ["FIELD NOTE · 8 MIN", "Where enterprise AI creates value before it creates noise", "A practical framework for selecting workflows that are ready for intelligent automation."],
  ["PERSPECTIVE · 6 MIN", "The hidden cost of stitching business systems together", "Why integration decisions made today determine how quickly a company can change tomorrow."],
  ["GUIDE · 11 MIN", "From transformation roadmap to working software", "How leadership teams can keep strategy, delivery and adoption connected."],
] as const;

function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return <Link href={href} className={`${styles.arrowLink} ${light ? styles.arrowLinkLight : ""}`}>{children}<ArrowRight aria-hidden="true" size={17} /></Link>;
}
function SectionHead({ index, eyebrow, title, copy, light = false }: { index: string; eyebrow: string; title: ReactNode; copy?: string; light?: boolean }) {
  return <div className={`${styles.sectionHead} ${light ? styles.light : ""}`}><div className={styles.kicker}><span>{index}</span>{eyebrow}</div><h2>{title}</h2>{copy ? <p>{copy}</p> : null}</div>;
}

export default function HomePage() {
  return <HomeMotion><div className={styles.page}>
    <div className={styles.brandIntro} data-brand-intro aria-hidden="true">
      <div className={styles.brandIntroImage} data-brand-intro-image />
      <div className={styles.brandIntroMark} data-brand-intro-mark>MeU<span>SOLUTIONS THAT MOVE</span></div>
    </div>
    <section className={styles.hero} aria-labelledby="hero-title" data-gsap-hero>
      <div className={styles.heroBackdrop} aria-hidden="true" data-gsap-backdrop />
      <div className={styles.heroShade} aria-hidden="true" />
      <div className={styles.shell}>
        <div className={styles.heroTop}><span>STRATEGY · TECHNOLOGY · DELIVERY</span><span>HO CHI MINH CITY / GLOBAL DELIVERY</span></div>
        <div className={styles.heroBody}><div className={styles.heroCopy}>
          <p className={`${styles.heroEyebrow} hero-kicker`}>Công nghệ gắn với mục tiêu kinh doanh.</p>
          <h1 id="hero-title">Bài toán của doanh nghiệp.<br/><em>Giải pháp công nghệ của chúng tôi.</em></h1>
          <p className={`${styles.heroLead} hero-reveal`}>We partner with ambitious organizations to design, build and operate the systems that move their business forward.</p>
          <div className={`${styles.heroActions} hero-reveal`}><Link className={styles.primaryButton} href="/contact">Trao đổi với chuyên gia <ArrowRight size={18} /></Link><Link className={styles.secondaryButton} href="/solutions">Khám phá giải pháp</Link></div>
        </div></div>
        <div className={styles.proofStrip}><span>ONE ACCOUNTABLE PARTNER</span><span>END-TO-END DELIVERY</span><span>BUILT FOR ADOPTION</span><span>VIETNAM · GLOBAL</span></div>
      </div>
    </section>
    <main>
      <section className={`${styles.section} ${styles.challenges}`} data-gsap-section><div className={styles.shell}>
        <SectionHead index="01" eyebrow="BẮT ĐẦU TỪ BÀI TOÁN" title={<>Điều gì cần <em>chuyển động?</em></>} copy="Technology earns its place when it removes friction, unlocks growth or makes better decisions possible." />
        <div className={styles.challengeList}>{challenges.map(([n,title,copy]) => <article className={styles.challenge} key={n}><span>{n}</span><div><h3>{title}</h3><p>{copy}</p></div><Link href="/solutions" aria-label={`Explore ${title}`}><ArrowRight size={20}/></Link></article>)}</div>
      </div></section>
      <section className={`${styles.section} ${styles.darkSection}`} data-gsap-section><div className={styles.shell}>
        <SectionHead light index="02" eyebrow="GIẢI PHÁP DOANH NGHIỆP" title={<>Thay đổi cách vận hành.<br/><em>Không chỉ thay phần mềm.</em></>} copy="We connect business design with engineering, so every solution has a clear purpose and a practical route into daily work." />
        <div className={styles.featureSolution}><div className={styles.featureContent}><span>FEATURED / DIGITAL TRANSFORMATION</span><h3>Make complexity actionable.</h3><p>Translate strategic ambition into a sequenced roadmap, modern platforms and measurable operating change.</p><ul><li><Check size={15}/> Transformation strategy</li><li><Check size={15}/> Platform modernization</li><li><Check size={15}/> Adoption & enablement</li></ul><ArrowLink light href="/solutions/digital-transformation">Explore the solution</ArrowLink></div>
          <div className={styles.blueprint} aria-hidden="true"><div className={styles.bpBlock}>BUSINESS<br/>PRIORITIES</div><MoveDownRight/><div className={styles.bpBlock}>TARGET<br/>OPERATING MODEL</div><MoveDownRight/><div className={`${styles.bpBlock} ${styles.bpActive}`}>WORKING<br/>SYSTEM</div></div></div>
        <div className={styles.solutionRows}>{solutions.map((s,i)=><Link href="/solutions" key={s}><span>0{i+2}</span><strong>{s}</strong><ChevronRight size={19}/></Link>)}</div>
      </div></section>
      <section className={styles.aiSection} data-ai-section aria-label="AI and intelligent automation workflow">
        <div className={styles.aiViewport}>
          <div className={styles.aiTrack} data-ai-track>
            <article className={`${styles.aiPanel} ${styles.aiIntro}`}>
              <div className={styles.aiPanelInner}>
                <span className={styles.aiStep}>03 / AI &amp; INTELLIGENT AUTOMATION</span>
                <h2>Trí tuệ nằm trong<br/>the <em>workflow.</em></h2>
                <p>We apply AI to defined business decisions, with context, controls and human judgment designed into the system.</p>
                <div className={styles.scrollCue}>CUỘN ĐỂ THEO DÒNG TÍN HIỆU <ArrowRight size={18}/></div>
              </div>
            </article>
            <article className={styles.aiPanel}>
              <div className={styles.signalOrb} aria-hidden="true"><span>01</span></div>
              <div className={styles.aiPanelInner}><span className={styles.aiStep}>01 / INPUT</span><h3>Ngữ cảnh kinh doanh đi vào hệ thống.</h3><p>Documents, live signals and system data become a governed stream of usable context.</p><div className={styles.aiTags}><span>DOCUMENTS</span><span>SIGNALS</span><span>SYSTEM DATA</span></div></div>
            </article>
            <article className={`${styles.aiPanel} ${styles.aiIntelligence}`}>
              <div className={styles.signalOrb} aria-hidden="true"><span>02</span></div>
              <div className={styles.aiPanelInner}><span className={styles.aiStep}>02 / INTELLIGENCE</span><h3>Mô hình suy luận. Quy tắc giữ kết quả hữu ích.</h3><p>Orchestration connects models, business rules and integrations around a defined decision.</p><div className={styles.aiTags}><span>MODELS</span><span>RULES</span><span>INTEGRATIONS</span></div></div>
            </article>
            <article className={styles.aiPanel}>
              <div className={styles.signalOrb} aria-hidden="true"><span>03</span></div>
              <div className={styles.aiPanelInner}><span className={styles.aiStep}>03 / HUMAN CONTROL</span><h3>Con người kiểm soát điều quan trọng.</h3><p>Approvals, exceptions and feedback keep judgment visible at every critical point.</p><div className={styles.aiTags}><span>APPROVAL</span><span>EXCEPTION</span><span>LEARNING</span></div></div>
            </article>
            <article className={`${styles.aiPanel} ${styles.aiOutcome}`}>
              <div className={styles.signalOrb} aria-hidden="true"><span>04</span></div>
              <div className={styles.aiPanelInner}><span className={styles.aiStep}>04 / OUTCOME</span><h3>Trí tuệ chuyển thành hành động.</h3><p>Traceable decisions move back into daily systems and create measurable operational value.</p><div className={styles.aiUseCases}><span>Document intelligence</span><span>Operational copilots</span><span>Decision automation</span></div></div>
            </article>
          </div>
          <div className={styles.aiProgress} aria-hidden="true"><i data-ai-progress /></div>
          <span className={styles.aiCounter} data-ai-counter>01 — 05</span>
        </div>
      </section>
      <section className={`${styles.section} ${styles.paper}`} data-gsap-section><div className={styles.shell}>
        <SectionHead index="04" eyebrow="NGÀNH" title={<>Built around the way<br/>your world <em>works.</em></>} />
        <div className={styles.industryGrid}>{industries.map((item,i)=><Link href="/industries" className={styles.industry} key={item}><span>0{i+1}</span><h3>{item}</h3><p>Sector-aware systems, workflows and delivery.</p><ArrowRight size={20}/></Link>)}</div>
      </div></section>
      <section className={`${styles.section} ${styles.products}`} data-gsap-section><div className={styles.shell}>
        <SectionHead light index="05" eyebrow="SẢN PHẨM" title={<>Focused products.<br/><em>Operational by design.</em></>} />
        <div className={styles.productFeature}><div><span>ENTERPRISE OPERATIONS PLATFORM</span><h3>A shared view of work, data and decisions.</h3><p>Modular business software shaped to each operating model, from workflow and CRM to membership and analytics.</p><ArrowLink light href="/products">View product portfolio</ArrowLink></div><div className={styles.productUi} aria-label="Abstract enterprise product interface"><header><i/><i/><i/></header><aside/><main><div/><div/><div/><section/></main></div></div>
        <p className={styles.placeholderNote}>Product names and availability will be published after portfolio approval.</p>
      </div></section>
      <section className={`${styles.section} ${styles.caseSection}`} data-gsap-section><div className={styles.shell}>
        <SectionHead index="06" eyebrow="THÀNH CÔNG KHÁCH HÀNG" title={<>Progress you can<br/><em>see in the work.</em></>} />
        <article className={styles.caseStudy}><div className={styles.caseVisual}><span>ANONYMIZED CLIENT CASE</span><div className={styles.caseLines}/><strong>FROM FRAGMENTED<br/>TO CONNECTED</strong></div><div className={styles.caseCopy}><span>ENTERPRISE SERVICES</span><h3>Connecting a complex service operation around one source of truth.</h3><dl><div><dt>CHALLENGE</dt><dd>Manual handoffs and disconnected records slowed service delivery.</dd></div><div><dt>SOLUTION</dt><dd>A unified workflow platform integrated with the client’s core systems.</dd></div><div><dt>IMPACT</dt><dd>Clearer ownership, faster decisions and a platform ready to scale.</dd></div></dl><ArrowLink href="/client-success">Read client stories</ArrowLink></div></article>
      </div></section>
      <section className={`${styles.section} ${styles.lifecycleSection}`} data-gsap-section><div className={styles.shell}>
        <SectionHead light index="07" eyebrow="NĂNG LỰC" title={<>With you from first<br/>question to <em>daily operation.</em></>} />
        <div className={styles.lifecycle} data-gsap-lifecycle>{capabilities.map(([n,title,copy])=><article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><div className={styles.lifeLine} aria-hidden="true"><i/><i/><i/><i/><i/></div>
      </div></section>
      <section className={`${styles.section} ${styles.whySection}`} data-gsap-section><div className={styles.shell}>
        <SectionHead index="08" eyebrow="VÌ SAO CHỌN MEU" title={<>Senior thinking.<br/>Practical <em>delivery.</em></>} />
        <div className={styles.whyGrid}><article><span>01</span><h3>Business before features</h3><p>We define the operational result before committing to a technical answer.</p></article><article><span>02</span><h3>One connected team</h3><p>Strategy, experience, engineering and quality work toward the same outcome.</p></article><article><span>03</span><h3>Built to stay useful</h3><p>We plan for adoption, ownership and improvement beyond the first launch.</p></article></div>
        <div className={styles.evidence}>Client logos and verified delivery metrics will appear here after approval.<span>PROOF, NOT PROMISES.</span></div>
      </div></section>
      <section className={`${styles.section} ${styles.insightsSection}`} data-gsap-section><div className={styles.shell}>
        <SectionHead index="09" eyebrow="GÓC NHÌN" title={<>Ideas for leaders<br/>building <em>what’s next.</em></>} />
        <div className={styles.insightGrid}>{insights.map(([meta,title,copy],i)=><article key={title}><div className={styles.insightVisual}><span>0{i+1}</span><i/></div><span>{meta}</span><h3>{title}</h3><p>{copy}</p><ArrowLink href="/insights">Read insight</ArrowLink></article>)}</div>
      </div></section>
      <section className={styles.finalCta} data-gsap-section><div className={styles.ctaGrid} aria-hidden="true"/><div className={styles.shell}><span>LET’S BUILD WHAT’S NEXT.</span><h2>Bring us the challenge.<br/><em>We’ll bring a way forward.</em></h2><p>Start a focused conversation with a senior MeU technology partner.</p><Link className={styles.primaryButton} href="/contact">Trao đổi với chuyên gia <ArrowRight size={18}/></Link></div></section>
    </main>
  </div></HomeMotion>;
}

