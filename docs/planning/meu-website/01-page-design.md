# 01 — Kế hoạch thiết kế từng trang

## 1. Design brief và cấu trúc trải nghiệm

Đối tượng chính: CEO/COO tìm cách cải thiện vận hành; CTO/CIO tìm đối tác triển khai; trưởng bộ phận có bài toán cụ thể; procurement cần bằng chứng và thông tin tin cậy. Người tìm việc và người học có hành trình riêng, không trộn vào form tư vấn doanh nghiệp.

Mỗi landing phải trả lời: **bài toán gì → kết quả mong muốn → MeU làm gì → làm bằng cách nào → bằng chứng → bước tiếp theo**. Không bắt người xem đọc hết danh sách công nghệ trước khi hiểu lợi ích.

### 1.1. Hệ thống thị giác đề xuất

| Thành phần | Quy định thiết kế ban đầu |
|---|---|
| Canvas | Nền trắng hoặc `#F5F7FA`; dark section `#101828` dành cho architecture/CTA nổi bật, không xen kẽ tùy tiện |
| Màu | Text `#17212F`, muted `#526174`, accent đề xuất `#2357D9`, border `#DEE4EB`; thay accent theo brand asset khi có |
| Typography | Một sans-serif có đầy đủ dấu tiếng Việt, ví dụ Inter; H1 desktop 56–64px/mobile 36–40px, H2 36–44/28–32px, body 18/16px; legal/article body 18px |
| Bề rộng | Content tối đa 1280px; 12 cột desktop, 8 tablet, 4 mobile; lề 24px desktop nhỏ, 16–20px mobile |
| Khoảng cách | Section desktop 88–112px, mobile 48–64px; gap card 24px/16px; article content tối đa 760px |
| Card | Border 1px, radius 12–16px, padding 24–32px; không tất cả card đều có shadow; có thứ bậc featured/standard/compact |
| Button | Cao 48px, primary solid; secondary outline/text; một CTA chính mỗi vùng quyết định |
| Icon | Một thư viện line icon thống nhất; icon mô tả năng lực, không dùng icon thay bằng chứng |
| Hình ảnh | Screenshot sản phẩm thật, ảnh đội ngũ/dự án có quyền dùng, sơ đồ kiến trúc đã được duyệt; tránh ảnh robot, chip phát sáng cho mọi trang |
| Motion | Hover/focus 150–220ms, reveal nhẹ tối đa 12px; không scroll hijack, không video tự phát có âm thanh; có chế độ reduced motion |
| Responsive | Không ép nguyên bảng/sơ đồ desktop vào mobile; bảng chuyển thành các nhóm nhãn–giá trị, sơ đồ có mô tả và nút mở lớn |
| Accessibility | Mục tiêu WCAG 2.2 AA; keyboard/focus rõ, không dùng màu làm tín hiệu duy nhất; kiểm tra contrast thực tế trước khi chốt token |

Không dùng số liệu, khách hàng hoặc chứng nhận giả để làm mockup “trông đủ nội dung”. Design có thể dùng nhãn dữ liệu minh họa được đánh dấu và phải thay trước publish.

### 1.2. Header, mega menu và footer

**Header desktop:** logo trái; sáu mục ở giữa; Search, VI/EN và “Talk to an Expert” bên phải. Sticky cao khoảng 80px, thu còn 68–72px khi cuộn; tránh che anchor. Mở menu bằng click, hỗ trợ hover có delay nhưng không phụ thuộc hover.

**What We Do mega menu:** panel rộng theo container, ba cột Business Solutions / Technology Capabilities / Talent & Enablement. Mỗi cột có mô tả một dòng và link “Explore all”. Tổng 17 link con; dùng text, không nhồi 17 thumbnail. Một dải proof nhỏ ở đáy nếu có case được duyệt.

**Industries:** lưới tên ngành + ảnh/editorial featured case. Chỉ hiển thị ngành đã publish. **Products:** bốn category + một product nổi bật. **Client Success:** Featured, All, By Industry/Solution/Technology là link view/bộ lọc của cùng collection. **Insights:** bảy chủ đề, bài mới nhất. **About:** story, mission, leadership, partners, locations, careers, contact.

**Mobile:** drawer full height; accordion từng nhóm; CTA luôn dễ tìm nhưng không che nội dung; đóng bằng Escape, nút đóng và sau khi chọn link; focus trap đúng. Language switch giữ cùng thực thể nội dung; nếu bản dịch chưa có, thông báo và đưa về hub locale đích thay vì âm thầm đổi nội dung.

**Footer:** sáu cột theo sitemap: What We Do, Industries, Products, Resources, Company, Trust & Legal. Có logo, tagline, địa chỉ/liên hệ đã xác minh và utility cookie preferences. Không thêm newsletter form nếu chưa có chương trình gửi thực tế.

CMS: menu editor chọn entry đã publish, label VI/EN và thứ tự. Không để editor tự thêm nhóm cấp một; schema khóa sáu slot. Trust/legal và Contact đặt trong footer; logo luôn về home.

## 2. Thư viện card và module dùng chung

Mỗi card có đúng một liên kết chính. Nếu cần CTA phụ, link tiêu đề và CTA riêng; không bọc một card có button bên trong bằng anchor toàn bộ. Hover và focus phải có cùng mức nhận biết. Chiều cao đồng đều trong cùng row, không khóa height khiến tiếng Việt tràn.

| Card/module | Hình thức | Dữ liệu và giới hạn | Click/đích đến |
|---|---|---|
| C01 Challenge | Nền nhẹ, số thứ tự/icon 32px, câu hỏi 2 dòng, mô tả ngắn; grid 3/2/1 | Title 50–80 ký tự gợi ý, pain summary, 1–2 outcome, solution ref | Solution phù hợp; một challenge có nhiều solution thì tới view hub đã lọc |
| C02 Solution | Không cần ảnh; eyebrow, title, kết quả, 3 bullet phạm vi, text CTA; 3/2/1 | Title, card summary riêng 100–160 ký tự, outcomes tối đa 3, icon | Solution detail |
| C03 Capability | Card gọn hoặc hàng ngang đánh số theo lifecycle | Title, một câu năng lực, 2–3 deliverable, phase | Capability detail |
| C04 Industry | Ảnh 4:3 phía trên, title, một bài toán đặc thù, link | Cover + focal point, industry summary; không bắt buộc số case | Industry landing |
| C05 Product | Screenshot 16:10, tên, category, stage badge, 3 value bullets; featured layout 6/6 | Screenshot thật, summary, stage, deployment labels; không tự sinh giá | Product detail; “Request demo” chỉ khi demo_enabled |
| C06 Case | Ảnh 16:10; client/anonymous label; challenge → solution → impact; một metric nổi bật nếu được duyệt | Title, client display, industry, summary, approved metric, cover | Case detail |
| C07 Insight | Thumbnail 16:9; format/topic, title 2–3 dòng, author/date/read time | Excerpt không cần lặp title; read time tính từ body locale | Article/report/event đúng template |
| C08 Report | Cover A4 nhỏ bên trái, title, abstract, page count và format | Public cover, private/public asset theo access mode | Report landing, không tải file nhạy cảm trực tiếp từ card |
| C09 Event | Date block lớn + title, location/online, status | starts/ends/timezone, event status, registration mode | Event detail; event đã qua dùng “View recap” |
| C10 Person | Portrait 4:5, name, role, 1 câu expertise; link profile khi có nội dung | Portrait, role, bio summary, profile_enabled | Profile hoặc card không link; không tạo detail rỗng |
| C11 Partner/client | Logo fit-contain trong vùng đồng đều, name và relationship rõ | Logo, relationship, consent; certification tách riêng | Website đã duyệt hoặc case; không link nếu chưa có đích |
| C12 Job | Hàng ngang title, team, location, employment/work mode, deadline | Không dùng “competitive salary” như dữ liệu bắt buộc | Job detail; job closed bỏ Apply |
| C13 Proof metric | Số + đơn vị + baseline/thời kỳ + chú thích nguồn | Value, unit, scope, evidence, approval; không animate từ 0 bắt buộc | Case hoặc footnote có thể kiểm chứng |
| C14 Integration | Logo/name, capability, integration state | Native/API/planned phân biệt rõ; planned không trình bày là có sẵn | Product anchor hoặc doc được duyệt |
| C15 Engagement | 3 cột so sánh gọn; suitable for, team/setup, governance | Staff augmentation/dedicated/project-based; training variants riêng | Contextual consultation |
| C16 Location | Office photo optional, address/contact, timezone, maps link | Location entry + tọa độ tùy chọn | Directions; không bắt map iframe tải ngay |
| C17 Trust topic | Title, summary, policy updated date, owner label công khai nếu được duyệt | Trust/legal entry ref | Trust detail |
| C18 Download | Icon định dạng, tên, dung lượng, ngôn ngữ, version, access badge | Media/document ref; link có thời hạn nếu gated/private | Download endpoint hoặc form |

Các module chung: breadcrumb, local anchor navigation, outcome grid, challenge–solution mapping, architecture figure + caption + alt, process steps, feature accordion, testimonial, FAQ, related content rail, contextual CTA. Desktop related grid 3; mobile xếp dọc tối đa 3 card, không bắt swipe để đọc hết.

**CMS card preview:** editor xem đồng thời card và hero; card_title/card_summary/card_image được override riêng theo locale, mặc định kế thừa title/summary/cover. UI thông báo text quá dài nhưng không tự cắt nội dung SEO. Alt/caption không lấy tên file làm mặc định xuất bản.

## 3. Home — `/{locale}`

Thiết kế trang chủ như một câu chuyện 11 đoạn đúng sitemap. Primary CTA “Talk to an Expert”; secondary “Explore solutions”. Không đặt form dài trong hero.

| # | Section và bố cục | Nội dung/CMS |
|---|---|---|
| 01 | Hero 7/5: headline trái, product/system visual phải; phía dưới proof strip | Headline “Your Business Challenge. Our Technology Solution.” có bản VI biên tập riêng; visual và proof được duyệt |
| 02 | “Bạn muốn giải quyết điều gì?” — 6 C01, nhóm pain vận hành/tăng trưởng/hệ thống/dữ liệu/AI/nguồn lực | Challenge collection; mỗi card map solution/talent; không cần quiz nhiều bước ở MVP |
| 03 | Business Solutions — 1 featured + 6 C02 compact | Chọn thứ tự 7 solution bằng reference |
| 04 | AI & Intelligent Automation — dark split, workflow có input–human review–output | Solution AI ref; 3 use case cụ thể, link AI Engineering phân biệt implementation |
| 05 | Industries — grid C04, chỉ ngành đủ nội dung | Danh sách ngành publish, tối đa 6 |
| 06 | Products — 1 product featured + 2 standard C05 | Ẩn toàn section nếu chưa có sản phẩm đáp ứng tiêu chí sitemap |
| 07 | Client Success — featured case 7/5 và 2 C06 | Tóm tắt Challenge/Solution/Impact; metric có chú thích |
| 08 | Capabilities — lifecycle Consult → Build → Integrate → Test → Operate | Mỗi phase map capability; Design/AI là capability xuyên phase, không bị bỏ sót |
| 09 | Why MeU — approved metrics + client logos + 3 differentiators | Không dùng các claim “global leader”, số dự án/năm kinh nghiệm chưa chứng minh |
| 10 | Insights — 3 C07, ưu tiên chủ đề liên quan hành trình mua | Có lựa chọn curated hoặc rule newest published |
| 11 | CTA cuối — một thông điệp + primary button + liên hệ phụ | “Let's build what's next.” → Talk to an Expert |

CMS: `landing(home)` có section slots cố định, editable heading/summary/visual/reference. Cho ẩn section 06 nếu thiếu product, không cho xóa hành trình challenge/solution/proof/CTA. Không gọi 10 request lọc bài từ browser như home hiện tại; backend trả một page payload đã resolve references.

## 4. What We Do — hub và ba nhánh

URL quyết định: `/{locale}/solutions` là What We Do hub; `/solutions/business-solutions`, `/solutions/technology-capabilities`, `/solutions/talent-enablement` là ba hub con. Các leaf dùng `/solutions/{slug}` để URL ngắn và không thay đổi khi tổ chức menu.

| Trang | Thiết kế | CMS |
|---|---|---|
| What We Do | Hero nhỏ; challenge selector; ba vùng Business/Capability/Talent; featured case; CTA | `landing` + references; challenge selector là link/filter, không lưu lead |
| Business Solutions | Hero outcome-first; 7 C02; bảng pain → solution; proof; CTA | 7 solution refs, challenge refs |
| Technology Capabilities | Lifecycle ngang desktop/dọc mobile; 8 C03; methodology/quality proof; CTA | 8 capability refs; process labels |
| Talent & Enablement | Hai panel lớn Build your team / Develop your people; engagement comparison; proof | Talent và training refs; CTA context riêng |

### 4.1. Template Solution detail

Thứ tự: breadcrumb → hero 7/5 → outcome strip → “Does this sound familiar?” → solution modules → typical workflow/architecture → delivery approach → related capabilities → industry fit → case evidence → FAQ → contextual CTA.

Hero: H1 nêu kết quả, subhead nói ai phù hợp; visual workflow hoặc screenshot, không chỉ có ảnh stock. Local navigation dưới hero: Overview / Solutions / Approach / Client success. C02 module không tự có trang detail nếu chỉ là thành phần giải pháp; accordion hoặc anchor là đủ.

CMS chung: `solution`; localized hero/problem/outcome/modules/delivery/FAQ; quan hệ capabilities, industries, products, cases, insights, technologies. Không dùng tag dạng text để tạo các quan hệ này.

| Trang / slug | Hero và trọng tâm riêng | Section/card cần thiết | CTA chính |
|---|---|---|---|
| Digital Transformation / `digital-transformation` | Từ hệ thống rời rạc tới roadmap có ưu tiên; visual maturity → roadmap | Assessment dimensions; roadmap theo giai đoạn; modernization/integration/data workstreams; deliverable mẫu đã ẩn thông tin | Discuss your transformation roadmap |
| Business Process Optimization / `business-process-optimization` | Quy trình hiện tại → quy trình mục tiêu; visual swimlane | Workflow/approval/document/BPM modules; bottleneck cards; human approval; baseline/target metric tách rõ | Review your business process |
| Enterprise Management / `enterprise-management` | Một bức tranh vận hành thống nhất; visual module map | ERP/CRM/HRM/Sales/Inventory/Membership/Analytics; system boundaries; buy/customize/build comparison; migration approach | Discuss your enterprise system |
| Customer Experience / `customer-experience` | Customer journey theo touchpoint | Portal/booking/loyalty/notification/service modules; journey before/after; omnichannel architecture; customer-facing case | Map your customer journey |
| Digital Commerce / `digital-commerce` | Discovery → purchase → fulfillment → retention | E-commerce/Zalo/social/loyalty/affiliate/payment modules; commerce flow; channel integrations; conversion evidence có scope | Plan your commerce platform |
| AI & Intelligent Automation / `ai-intelligent-automation` | Giải bài toán bằng AI với kiểm soát của con người | Use-case grid Assistant/Document/Vision/Recommendation/Predictive; feasibility/data readiness; pilot workflow; trust link; case evidence | Assess an AI use case |
| Custom Software Solutions / `custom-software-solutions` | Phần mềm theo đúng quy trình đặc thù | Web/mobile/portal/internal/API modules; discovery→MVP→scale; buy-vs-build guide; ownership/handover; screenshots | Scope your software project |

Không viết hai trang AI giống nhau: Solution AI nói **business use case và value**; AI Engineering nói **data/evaluation/deployment/operations**.

### 4.2. Template Capability detail

Thứ tự: hero năng lực → when you need it → concrete deliverables → approach/process → technical scope → tooling/standards đã dùng → engagement options → case evidence → related solutions → CTA. Hero có ảnh làm việc/sơ đồ deliverable. Card technical scope C03 có “what you receive”, không chỉ tên công nghệ.

CMS chung: `capability`; phase, deliverables, methods, tool refs, engagement models, related solutions/cases. Trình bày tooling theo nhóm và vai trò; chỉ đăng logo công nghệ có năng lực thực tế.

| Trang / slug | Module khác biệt cần thiết | CTA |
|---|---|---|
| Technology Consulting / `technology-consulting` | Assessment canvas; architecture review; roadmap; selection scorecard; mẫu đầu ra tư vấn | Book a discovery discussion |
| Software Engineering / `software-engineering` | Web/mobile/API/enterprise/Zalo scope; SDLC; code ownership; release and handover | Discuss an engineering engagement |
| AI Engineering / `ai-engineering` | Data pipeline; model/RAG/orchestration theo scope thật; evaluation; human review; observability; Responsible AI | Discuss AI implementation |
| Quality Engineering / `quality-engineering` | Manual/automation/API/performance/mobile/regression/security testing; test strategy; coverage và exit criteria; report preview | Review your quality strategy |
| System Integration / `system-integration` | System landscape; sync/event/batch patterns; mapping/reconciliation; error recovery; cutover | Map your integration needs |
| Cloud & DevOps / `cloud-devops` | Environment architecture; pipeline; IaC nếu có; observability; recovery/operating model; migration phases | Discuss cloud and delivery operations |
| Product & UI/UX Design / `product-ui-ux-design` | Discovery artifacts; journey/flow; screen samples; design system; usability validation; developer handoff | Start product discovery |
| Maintenance & Managed Services / `maintenance-managed-services` | Support scope; service window; incident/change process; onboarding; reporting; exclusions; SLA chỉ đăng cam kết đã duyệt | Discuss support requirements |

### 4.3. IT Talent Solutions

URL `/solutions/it-talent-solutions`. Hero “Đội ngũ phù hợp với giai đoạn phát triển”; ảnh team thật. Sections: nhu cầu → C15 so sánh Staff Augmentation / Dedicated Team / Project-based Team → role capability grid (Engineer, QA, BA, UI/UX, DevOps, AI) → tuyển chọn/onboard → governance & collaboration → case → FAQ → yêu cầu đội ngũ.

Role card: role name, responsibility, seniority range nếu có, delivery fit. Không hiển thị CV cá nhân/rate cụ thể chưa được duyệt. Ba engagement model là card/anchor trên một trang ở MVP; không tự mở chín trang role chỉ để SEO.

CMS: `talent`, engagement models và role items có thứ tự; related capabilities/cases. Form dùng `team_request` context, thêm role/team size/start window tùy chọn sau thông tin bắt buộc.

### 4.4. Technology Training

URL `/solutions/technology-training`. Hero hướng doanh nghiệp, không biến thành sàn khóa học nếu chưa vận hành đào tạo công khai.

Sections: audience → Corporate / Project-based / University Partnership → track cards Software Engineering, QA & Testing, AI, DevOps, BA → learning outcomes → curriculum accordion → format/customization → instructor proof → assessment → inquiry CTA.

Track card: title, audience, expected outcomes, duration_label đã duyệt, delivery mode; “Discuss this track” truyền track context. Không có checkout/lịch khai giảng giả. CMS `training`, nested tracks/curriculum; đề xuất course detail chỉ ở phase sau khi có cohort/instructor/schedule rõ.

## 5. Industries

### 5.1. Hub `/industries`

Hero ngắn “Technology grounded in your industry”; C04 grid 3/2/1; mỗi card một pain và solution mapping. Bên dưới cross-industry capabilities và case evidence. Không tạo trang ngành từ danh sách tên trống.

### 5.2. Template industry detail

Đúng bảy phần sitemap: Overview & Challenges → Solution Ecosystem → Technology Capabilities → Solution Architecture → Case Studies → Related Insights → Talk to an Expert. Có thể thêm glossary/FAQ nếu hữu ích nhưng không thay proof bằng một đoạn bán hàng chung.

Solution ecosystem là diagram hoặc grouped C02, không phải danh sách dịch vụ lặp từ header. Industry-specific architecture có caption phạm vi, integration và data flow, tránh tiết lộ topology khách hàng. CMS `industry`; readiness fields và reviewer bắt buộc trước publish.

| Ngành / slug | Pain và hình thức trực quan | Solution cards / detail modules |
|---|---|---|
| Healthcare / `healthcare` | Patient/appointment/operations journey; hình cơ sở và giao diện đã duyệt | Portal/booking/workflow/integration; phân vai truy cập và dữ liệu; không claim compliance/y khoa ngoài evidence |
| Logistics & Supply Chain / `logistics-supply-chain` | Shipment/order visibility timeline | Tracking, warehouse/process orchestration, partner integration, operational dashboard; exception handling |
| Retail & Commerce / `retail-commerce` | Omnichannel purchase/fulfillment journey | POS/e-commerce/CRM/loyalty/inventory/payment integration theo năng lực thực; link Digital Commerce |
| Pharmaceutical & Life Sciences / `pharmaceutical-life-sciences` | Distribution/document/training flow | Document workflow, distribution visibility, quality-related workflows, training portals; domain scope phải được chuyên gia duyệt |
| Education & Training / `education-training` | Learner/admin/instructor journey | Learning portal, enrollment, content operations, reporting, integration; product ref nếu có platform đủ điều kiện |
| Associations & Organizations / `associations-organizations` | Member lifecycle onboarding→engagement→renewal | Membership/CRM/events/content/payment/reporting; hội viên và business portal case đã được phép dùng |

**Gate:** domain owner + mô tả ít nhất 3 pain cụ thể + giải pháp khả thi + evidence nguồn năng lực (case hoặc artifact/reference đã duyệt). Case công khai không bắt buộc nếu NDA, nhưng không được thay bằng case giả. Trang chưa đạt gate không xuất hiện ở menu/sitemap/search.

## 6. Products & Platforms

### 6.1. Listing và category

`/products` = All Products. Bốn landing category `/products/category/enterprise-platforms`, `ai-platforms`, `commerce-platforms`, `industry-platforms` dùng cùng listing template, có intro/SEO riêng nếu đủ nội dung. Filter chip category, industry, deployment; search tên sản phẩm; URL lưu filter. “All Products” không tạo thêm `/all`.

Featured product C05 rộng; bên dưới grid 3/2/1. Card badge chỉ có available / pilot / retired theo trạng thái thực; roadmap không trình bày thành feature live. Không có số product giả để lấp lưới. Zero state: giải thích chưa có sản phẩm phù hợp và link custom solution.

### 6.2. Product detail `/products/{slug}`

Hero 6/6: tên, category, proposition, stage, screenshot; CTA “Request demo”, secondary “Explore features”. Product chưa demo được dùng “Discuss availability”.

Thứ tự: Overview → Business Benefits → Key Features → Integrations → Industries → Security → Deployment & Documentation → Case Studies → Request Demo. Sticky anchors trên desktop; mobile có nút mục lục gọn. Feature section split screenshot + explanatory bullets; integration C14 nêu rõ native/API/planned; documentation C18 ghi version.

Security nói tính năng/biện pháp có thật, không đồng nhất với chứng nhận. Deployment nêu cloud/private/on-prem/hybrid **chỉ những lựa chọn hỗ trợ**. Pricing chỉ thêm nếu sales có chính sách công khai.

CMS `product`: stable core, repeatable deployment, feature set, version/roadmap owner và demo readiness. Product screenshots, feature availability và docs được version hóa; relate ngành/solution/case. Không đưa dự án custom vào đây nếu không đủ tiêu chí.

**Demo flow:** product CTA → `/request-demo?product={id}` → form đã chọn product → confirmation; team sales nhận lead có product context qua outbox, không gửi email ngay từ browser.

## 7. Client Success / Case Studies

### 7.1. Collection `/case-studies`

Hero ngắn; một featured case; filter Industry/Solution/Technology, kết quả dạng C06. Mỗi facet có count đúng tập dữ liệu sau filter, bộ lọc kết hợp AND giữa các nhóm/OR trong một nhóm; reset filters; pagination.

Featured là `/case-studies?featured=true`. By Industry/Solution/Technology là state tương ứng trong một collection, không dựng ba trang trùng bài. Filter URLs mặc định noindex; chỉ mở index một curated landing riêng khi có yêu cầu nội dung/SEO sau này.

### 7.2. Case detail `/case-studies/{slug}`

Hero title theo kết quả; client logo hoặc “Confidential [industry] client”; summary phải diễn đạt scope. Desktop: content 8 cột + sticky facts 4 cột; mobile facts đặt sau hero.

Nội dung đúng chín phần: Client → Challenge → Business Objectives → MeU Solution → Solution Architecture → Technology → Implementation → Business Impact → Key Metrics. Module implementation dùng timeline có milestones, scope, team model và vai trò MeU. Architecture có caption và alternative text dài.

Metric card C13: baseline, result, unit, measurement window, scope, nguồn. Không tự tính phần trăm nếu không có baseline phù hợp. Quote có author/role/permission; logo và screenshots cũng cần clearance riêng. NDA case có thể ẩn tên/ảnh/số nhạy cảm nhưng vẫn kể rõ bài toán, giải pháp và kết quả định tính.

Cuối trang: related solution + industry + 2 case + CTA “Discuss a similar challenge”. Sidebar chỉ dùng facts đã được duyệt: ngành, engagement, timeline label, technologies; không bắt công khai ngân sách.

CMS `case_study`, metric/evidence references và publication approval. Field `client_visibility=named|anonymous`. Downloads optional; không upload hợp đồng/hồ sơ nội bộ vào media public.

## 8. Insights

### 8.1. Hub và bảy trang chủ đề

`/insights`: featured editorial 8/4; topic navigation; bài mới; report nổi bật; event sắp diễn ra nếu có. Topic landing `/insights/topic/{slug}` dùng hero nhỏ, intro riêng, related solution và filtered C07.

| Chủ đề | Slug | Nội dung/card và liên kết chuyển đổi |
|---|---|---|
| AI & Automation | `ai-automation` | Use case, implementation/evaluation insights; link Solution AI và AI Engineering |
| Digital Transformation | `digital-transformation` | Roadmap, change/process lessons; link transformation/process optimization |
| Enterprise Technology | `enterprise-technology` | Architecture/integration/enterprise operations; link enterprise/integration |
| Software Engineering | `software-engineering` | Engineering/QA/DevOps/design practices; author technical expertise |
| Industry Insights | `industry-insights` | Industry filter bổ sung, domain analysis; link industry landing |
| Reports & Whitepapers | `reports-whitepapers` | C08 thay C07 mặc định; abstract, cover, version và access mode |
| News & Events | `news-events` | C07 news + C09 event, phân biệt Upcoming/Past; timezone rõ |

### 8.2. Article detail `/insights/{slug}`

Reading layout: breadcrumb/topic → title/deck → author/date/updated/read time → cover → content 720–760px + mục lục bên cạnh desktop. Body structured rich text: headings, paragraph, list, image caption, table, quote, code khi cần. Mục lục từ heading IDs; không tự nhập một bản mục lục khác trong CMS.

CTA giữa bài chỉ sau section phù hợp; cuối bài đặt 1 related solution + 1 case + 2 insights. Author bio compact C10 và source links. News dùng cùng template với format `news`, không cần route detail thứ hai.

CMS `article`: format article/news, author refs, primary topic, secondary topics, body, related content và SEO. Read time là derived field theo locale. Không dùng insight publish date để giả cập nhật toàn bộ bài.

### 8.3. Report detail `/insights/reports/{slug}`

Hero cover trái 4 cột, abstract/outcomes phải 8 cột; “What you'll learn”, audience, contents preview, author/date/version/page count; download CTA. `access_mode=public` tải trực tiếp qua tracked endpoint; `gated` mở form tên/email/company với lựa chọn marketing **tách biệt, không tick sẵn**. Người không đồng ý marketing vẫn nhận tài liệu nếu yêu cầu tải hợp lệ.

File gốc gated ở private storage; sau submit trả entitlement/token, download URL hết hạn và không lộ trong page payload. Success state có nút tải và email delivery nếu được cấu hình; không bắt chờ email mới đọc được.

CMS `report` + `document` + `lead_form`; không xây DRM, login portal ở MVP.

### 8.4. Event detail `/insights/events/{slug}`

Hero tên, ngày giờ/timezone, venue hoặc online, status; agenda timeline, audience, speakers C10, registration CTA, FAQ. Desktop registration card sticky; mobile đặt sau overview. Upcoming mở form/link external đã duyệt; full/waitlist/cancelled có state rõ; past chuyển CTA sang recap/recording nếu có.

CMS `event`: times/timezone, venue, agenda, speaker refs, capacity policy, registration mode `inquiry|external|closed`; internal ticketing/payment/check-in nằm ngoài MVP. Link ngoài không đồng nghĩa backend MeU đã nhận đăng ký.

## 9. About MeU

| Trang / URL | Layout và card | CMS/CTA |
|---|---|---|
| About Us `/about` | Hero ảnh team; positioning; 3 value pillars; capabilities overview dạng link; story excerpt; people; evidence; CTA | `company_page`; Talk to an Expert, secondary Careers |
| Our Story `/about/our-story` | Editorial intro + timeline milestone hai cột; ảnh thời kỳ, caption; tránh timeline chỉ có năm và slogan | `company_page`, nested milestones; link client success |
| Vision & Mission `/about/vision-mission` | Vision statement lớn, mission 3 commitments, values đi kèm hành vi cụ thể | `company_page`; proof refs; không thêm capability brochure |
| Leadership `/about/leadership` | Intro gọn; C10 portrait grid 3/2/1, title/role/expertise | `person` filtered leaders; profile link chỉ khi `profile_enabled` |
| Leader detail `/about/leadership/{slug}` | Portrait + role; bio, expertise, selected insights, contact qua form công ty | `person`; không công khai email cá nhân mặc định |
| Partners & Clients `/about/partners-clients` | Hai nhóm tách rõ; logos C11; partnership nature; related cases | `organization`; permission logo; CTA relevant case |
| Locations `/about/locations` | Office cards C16; contact/timezone; map lazy-load hoặc external link | `location`; Directions/Contact office; không tạo office detail rỗng ở MVP |
| Careers `/about/careers` | Team/culture thực; benefits có thật; hiring process; C12 filter team/location/work mode | `job` + `company_page`; Explore open roles |
| Contact `/contact` | Hai cột contact methods/office và form ngắn | Một canonical Contact page dùng chung menu About/utility; `/about/contact` redirect 301 |

### 9.1. Job detail và apply

`/about/careers/{slug}`: role hero, team/location/work mode/employment, overview → responsibilities → requirements → benefits → hiring process → Apply. Salary range optional có currency/unit, không suy diễn. Cột phụ desktop chứa deadline và CTA.

`/about/careers/{slug}/apply`: form full page tập trung, job recap; họ tên/email, phone optional, CV PDF, portfolio optional, notice tuyển dụng và consent record; lỗi theo field, upload progress, submit idempotent. CV private, kiểm tra loại/kích thước và scan. Job closed hiển thị trạng thái đóng, server từ chối application mới dù người dùng mở tab từ trước.

CMS: recruiter quản lý job và pipeline applications riêng; application không phải content entry/public page. Candidate data không đưa vào analytics event payload.

## 10. Trust Center và legal

`/trust`: intro “How we build and operate responsibly”; C17 Security/Privacy/Data Protection/Responsible AI; policy updated dates; contact tư vấn bảo mật. Không tạo badge ISO/SOC 2 khi chưa có chứng nhận thực tế.

| Trang / URL | Thiết kế và nội dung | CMS |
|---|---|---|
| Security `/trust/security` | Hero gọn; Secure SDLC → Access Management → Code Review & Security Testing → Backup & Recovery → Incident Response; process/capability, không lộ thông tin vận hành nhạy cảm | `trust_page`, evidence, reviewer, review_due_at |
| Privacy `/trust/privacy` | Bản Privacy Policy canonical; mục lục, effective/updated dates, phạm vi, dữ liệu, mục đích, liên hệ, version | `legal_page`; nội dung policy phải được chủ sở hữu xác nhận trước publish |
| Data Protection `/trust/data-protection` | Data lifecycle diagram; collection/access/storage/retention/deletion; roles và contact | `trust_page`; policy refs; không tự tuyên bố compliance |
| Responsible AI `/trust/responsible-ai` | Principles + operating practices: data handling, evaluation, human oversight, limitation, escalation | `trust_page`; link AI solution/engineering |
| Cookie Policy `/trust/cookie-policy` | Bảng purpose/provider/duration/category theo công cụ triển khai thật; nút Cookie preferences | `legal_page`; consent categories cấu hình tập trung |
| Terms of Use `/trust/terms-of-use` | Reading layout, version/effective date, scope/contact | `legal_page` |

Privacy Policy ở footer trỏ thẳng `/trust/privacy`, không tạo thêm trang `/privacy-policy` cùng nội dung. Không tự soạn các nghĩa vụ pháp lý như thể đã được counsel duyệt; ở đây chỉ quy định cấu trúc CMS và UX.

## 11. Utility và conversion pages

| Trang | UI, tương tác | Backend/CMS |
|---|---|---|
| Search `/search?q=` | Search lớn; tabs All/Solutions/Products/Cases/Insights; results dạng row có type/breadcrumb/excerpt; clear query, empty/error states, pagination; VI/EN độc lập | Search index từ published content; ranking theo type/title/exact match; noindex |
| Contact `/contact` | Full name, work email (không cấm email cá nhân), company, inquiry type, message; optional phone; office panel | CMS intro/contact refs; backend lưu `lead` + acknowledgement |
| Talk to an Expert `/talk-to-an-expert` | Hero ngắn + contextual form; solution/industry preselected; challenge text; optional timeline và budget range gồm “Not sure” | `lead` type consultation; nguồn page/ref truyền bằng ID hợp lệ; không yêu cầu budget để submit |
| Request Demo `/request-demo?product=` | Product recap và form name/email/company/role optional/need; product picker nếu không có context | `lead` type demo; server kiểm tra product published/demo_enabled |
| Thank you `/thank-you` | Xác nhận yêu cầu đã nhận, next step theo SLA được duyệt, link nội dung phù hợp | Page noindex; không đưa email/PII vào URL; hiển thị request ref không chứa dữ liệu cá nhân |
| Report download | Inline form/success trong report detail; download qua signed entitlement | Private asset + backend grant; không cần một trang SEO `/download` |
| Cookie preferences | Dialog accessible, cần thiết/analytics/marketing; lưu version và có cách mở lại | Consent record/config; công cụ không cần thiết chỉ kích hoạt sau lựa chọn phù hợp |
| 404 / lỗi hệ thống | Thông báo rõ, search và hub links; server error có Retry, không giả thành “không có nội dung” | Template code; strings VI/EN; noindex |

Form chung: required labels rõ, validate client + server, lỗi gắn field và giữ dữ liệu khi lỗi; loading chống double submit; honeypot/rate limit; captcha chỉ khi cần và có fallback phù hợp. Consent inquiry không gộp với marketing. Thông báo thời gian phản hồi phải do MeU xác nhận, không mặc định cam kết 24h.

## 12. Quy tắc nội dung, locale và SEO áp dụng mọi trang

- Mỗi route có đúng một H1, breadcrumb logic và CTA context. Metadata không dùng mặc định một tiêu đề chung cho toàn site.
- `/vi` và `/en` là hai bản dịch độc lập, liên kết bằng cùng entry ID. Publish/review theo locale; không auto-publish bản dịch máy. Không dùng URL một ngôn ngữ nhưng trả nội dung ngôn ngữ khác.
- Canonical dùng URL đang publish; hreflang chỉ gồm bản dịch đã publish. Root `/` chọn locale theo quy tắc triển khai; link chọn ngôn ngữ luôn có thể đổi thủ công.
- Sitemap index theo loại trong tài liệu gốc, chứa cả hai locale khi live. Search, preview, draft, thank-you, apply và arbitrary filter không index.
- Category landing có nội dung biên tập riêng mới index; filter query vẫn noindex. Pagination listing indexable là quyết định riêng, canonical tự trỏ trang hiện tại; không dồn mọi page về page 1.
- Schema.org kế hoạch: Organization/WebSite, BreadcrumbList, Article, Event, JobPosting khi đủ dữ liệu; không thêm Review/AggregateRating/certification giả. Format/eligibility cần xác minh theo tài liệu chính thức khi triển khai.
- Public related content chỉ trả published references đúng locale; thiếu ref thì giảm số card/ẩn module, không thay bằng mock. Mỗi strategic page có ít nhất một đường tới proof nếu có và một CTA.
- Khi CMS/API lỗi: dùng published snapshot/cache hợp lệ đã có; trang chưa từng có dữ liệu trả lỗi phù hợp. Không đẩy dữ liệu mock lên production như fallback nghiệp vụ.

## 13. Deliverable của giai đoạn visual design

1. Chốt logo/font/color từ brand assets thật; palette ở mục 1 chỉ là proposal.
2. Thiết kế hi-fi trước 6 màn hình đại diện: Home, Solution detail, Industry detail, Product detail, Case detail, Article detail — desktop 1440 và mobile 390.
3. Duyệt card library C01–C18 và navigation; sau đó mở rộng Talent/Training/Company/Careers/Trust/Forms theo template.
4. Figma component variants bao gồm hover/focus/loading/empty/error/long text. Bản VI phải được kiểm tra trực tiếp, không chỉ thay nhãn sau khi xong EN.
5. Handoff kèm design tokens, asset ratios/focal points, section contracts, content examples và mapping CMS field. Bản planning này chưa thay thế hi-fi visual approval.
