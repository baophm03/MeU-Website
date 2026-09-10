# 03 — Kế hoạch triển khai và nghiệm thu

## 1. Phạm vi và giả định

Sitemap 20/08/2026 là baseline: sáu header groups cố định; Trust Center và utilities theo tài liệu. Phạm vi planning bao phủ mọi trang, còn lịch launch phụ thuộc nội dung được duyệt. Không thêm menu cấp một khi thiếu nơi đặt nội dung; ưu tiên taxonomy/relations/anchors.

Giả định nguồn lực để ước lượng: 1 designer, 2 frontend, 1 backend, QA tham gia từ tuần 3, 1 content owner điều phối domain reviewers và bản dịch. Nếu chỉ một người full stack hoặc content làm sau code thì lịch phải tính lại.

Những thứ chưa biết nhưng không cản lập kế hoạch: brand book/font/logo MeU cuối cùng; backend hiện có và auth provider; CRM/mail provider; sản phẩm đủ điều kiện; case được phép công khai; policy/consent/retention đã duyệt; danh sách URL cũ và traffic. Các mục này là dependency theo phase, không tự giả định đã có.

## 2. Đối chiếu với source hiện tại

Repo này hiện có branding/dữ liệu VCCI, không phải website MeU đã chuyển đổi. Bằng chứng chính từ lần đọc source:

| Phần hiện có | Có thể tận dụng | Phần cần thay/thiết kế lại |
|---|---|---|
| `src/components/ui` + Tailwind | Primitive Button/Dialog/Table/Form/Select, responsive foundation | Tokens/typography/layout MeU, accessibility states, không copy visual VCCI |
| `src/app/(main)` | Khái niệm public shell, listing/detail, media fallback | Route `/[locale]`, strategic templates, SSR/server reads, metadata riêng từng type |
| `src/app/admin` | Admin shell/table/dialog/editor workflow cơ bản | CMS type registry, locale, revision, approvals, relation pickers, lead/application workflows |
| `src/lib/api/cms-admin.ts` | Kinh nghiệm adapter/normalize API | Bỏ mapping `tintuc/baiviettrang` cho toàn bộ nội dung mới; DTO riêng từng MeU type |
| `src/api/...` và Orval | Cơ chế generate client từ OpenAPI | Generate từ MeU spec sau chốt schema; không patch hàng loạt generated models bằng tay |
| `src/store/useAuthStore.ts`, `src/lib/auth/admin-auth.ts` | Có login/refresh/session flow | Xem lại session boundary; không lưu remembered password; backend permission enforcement, private response cache isolation |
| `src/components/shared/rich-text-editor.tsx` | Editor UX cơ bản | Structured RichText contract, safe paste/render, asset refs, tránh onBlur thay đổi format ngoài ý muốn |
| `src/app/(main)/[...slug]/templates/data.ts` | Mapping bài và category | Resolver full path+locale+type; không lookup chỉ cuối slug; public projection không lộ draft/hidden |
| `src/mockdata` | Chỉ làm fixture dev sau khi tách dữ liệu mẫu | Không dùng mock/localStorage làm source of truth production; không copy khách hàng/nội dung VCCI sang MeU |
| GitLab CI/Docker | Pipeline pattern đã có | Secrets/server env, environment separation, migration/rollback/health checks và validation trước deploy |

Lưu ý kỹ thuật có ảnh hưởng planning: CMS hiện tại có một số module dùng API, một số dùng localStorage; auth UI không thay thế quyền backend; backend source chưa nằm trong phạm vi đã đọc. Vì vậy không ước lượng đây chỉ là “đổi giao diện và thêm vài page”.

### Kiến trúc frontend mục tiêu

```text
src/app/[locale]/                       Public routing theo manifest
src/features/content/templates/        Home, solution, product, case, insight...
src/features/content/sections/         Các block có schema và template allowlist
src/features/content/cards/            C01–C18
src/features/content/contracts/        Public DTO/schema dùng chung
src/features/cms/                       Collection editors + publish workflow
src/features/leads/                     Form states và submission client
src/features/careers/                   Jobs và application UI
src/lib/server/                        Read API/preview/revalidation, secrets chỉ server
src/api/meu/                           Orval generated client từ MeU OpenAPI
```

Đây là cấu trúc đề xuất, chưa tạo các folder app trên. URL admin có thể giữ `/admin`, nhưng chọn locale nội dung bên trong CMS; public URLs dùng VI/EN. ISR/cache hoặc SSR là implementation choice phải được kiểm chứng với phiên bản Next thực tế; mục tiêu là HTML public có nội dung/metadata từ server và cache invalidation theo publish.

## 3. Thứ tự ưu tiên launch

| Mức | Trang/tính năng | Điều kiện |
|---|---|---|
| P0 — nền tảng bắt buộc | Design system, navigation, content/revision/locale, public resolver, media, roles, SEO, form lead, preview/publish | Hoàn thành trước nhập nội dung hàng loạt |
| P1 — launch core | Home, What We Do + 3 hub, 7 solutions + 8 capabilities + Talent/Training nếu có nội dung, About, Contact/Expert, Trust/legal đã duyệt | Strategic copy, relation, media và reviewer sẵn sàng |
| P1 — proof và khám phá | Case listing/detail, Insights hub/article/topic, Industries hub và các industry đạt gate, Search | Có ít nhất tập case/insight đủ phục vụ hành trình; không yêu cầu chứng minh bằng case giả |
| P1 có điều kiện — products | Products hub/category/detail, Request Demo | Có ít nhất một product đạt stable core/repeatable deployment/demo readiness; nếu chưa có, hub dùng thông điệp phù hợp, không bịa catalog |
| P2 — mở rộng theo nội dung | Đủ 6 ngành, đủ 4 product category có nội dung, Reports & gated download, Events, Leadership profiles, Locations, Careers/Apply | Assets, policies, owners và vận hành đã sẵn sàng |
| P3 — tối ưu sau launch | CRM sâu, personalization, search engine riêng, testing conversion, public training catalog | Có dữ liệu và nhu cầu chứng minh hiệu quả |

P2 không có nghĩa bỏ thiết kế/schema: các trang này đã có specification. Nếu hợp đồng yêu cầu toàn bộ sitemap live ngay, đưa P2 vào release và tăng lịch theo content/QA; vẫn giữ publish gates.

## 4. Roadmap đề xuất 10–12 tuần

Các tuần có phần chồng lấn khi contract đã ổn định. Ước lượng dùng cho planning, cần team xác nhận sau technical spike và content audit.

| Phase | Thời lượng dự kiến | Deliverable cụ thể | Dependency / exit gate |
|---|---|---|---|
| 0 — Discovery/content audit | Tuần 1 | Xác nhận scope MeU, brand assets, content matrix, URL cũ, backend/auth/CRM constraints, product/industry/case readiness | Content owner và technical owner ký baseline |
| 1 — UX/design system | Tuần 1–3 | Header/mobile nav, cards C01–C18, 6 màn hi-fi đại diện, VI/EN long text, forms và CMS editor wireframes | Visual direction và field mapping được duyệt |
| 2 — Backend foundation | Tuần 2–4 | DB schema/migrations, contracts/OpenAPI, media private/public, account/RBAC, revisions/locales/publish/preview/outbox | Contract/integration tests pass; không leak draft/private |
| 3 — Public + CMS core | Tuần 4–6 | Home/hubs/solution/capability/talent/training/industry; corresponding CMS editors; server page assembly | Một vertical slice VI+EN publish→public hoạt động end-to-end |
| 4 — Evidence/content collections | Tuần 6–8 | Products/case/insights, topic/filter pages, evidence/readiness validation, related content | Card/detail dùng cùng entity, filters đúng, approved metrics only |
| 5 — Conversion/company/trust | Tuần 7–9 | Lead intake, demo/report download, careers/apply, company/people/locations, trust/legal, consent | Sales/recruiter vận hành được; permissions/private assets đúng |
| 6 — Content migration & UAT | Tuần 9–10 | Import content hai locale, redirects, SEO, content preview review, responsive/a11y/performance QA | Content signoff; sitemap không chứa draft/filter/PII URLs |
| 7 — Release & stabilization | Tuần 11–12 | Staging rehearsal, backup/restore, monitoring, rollback rehearsal, production rollout theo phạm vi đã duyệt | Business UAT + technical release gate; outbox và lead delivery được theo dõi |

Critical path: **content model → OpenAPI → CMS editor → nhập content → review/publish → public templates → migration/UAT**. Design có thể song song với backend foundation; không làm toàn bộ frontend bằng data shape khác rồi mới ép CMS theo sau.

## 5. Backlog theo epic

| Epic | Công việc tối thiểu | Definition of Done |
|---|---|---|
| E01 Foundation | Repo boundary, design tokens, locale routing, public/admin DTO separation, environments | Một public route và admin auth shell chạy được đúng locale |
| E02 CMS engine | Entry registry, immutable revision, relations, workflow, preview, schedule, audit | Draft edits không ảnh hưởng live; publish conflict rollback đúng |
| E03 Global experience | Mega menu, mobile nav, footer, language switch, breadcrumb, 404 | Keyboard/mobile dùng được; link resolve đúng publication |
| E04 Strategic pages | Home, hubs, solution/capability/talent/training/industry | Required sections/CTA/proof relation hợp lệ; no data duplication |
| E05 Products | Category landing, listing/filter, detail, features/docs/readiness, demo context | Planned feature phân biệt; product không đủ readiness không publish |
| E06 Client success | Listing filters, nine-section detail, anonymous mode, evidence metrics | Không lộ client private hoặc metric chưa được duyệt |
| E07 Insights | Topics/article/news/report/event, authors, rich text, TOC | Format routing đúng; report private; timezone event đúng |
| E08 Company & careers | About/story/mission/people/partners/locations/jobs/apply | Closed job chặn submit; recruiter-only CV access |
| E09 Trust & conversion | Policy versions, consent, lead forms, outbox, delivery dashboard | Lead không mất khi CRM lỗi; marketing choice độc lập |
| E10 SEO/release | Search index, XML sitemaps, canonical/hreflang, redirects, metadata, telemetry | Published-only discovery; redirect không loop; restore/invalidation được thử |

## 6. Content matrix và trách nhiệm nhập liệu

Một row cho mỗi entry/locale: `internal_key`, template, proposed URL, owner, source copy, images/rights, related refs, evidence, translation state, SEO state, reviewer, publish status, deadline. Route manifest là inventory; content matrix bổ sung trạng thái triển khai thực tế.

| Type | Nội dung tối thiểu để review | Owner đề xuất |
|---|---|---|
| Solution | Audience, 3 pain cụ thể, outcomes không giả số, modules, delivery, capability refs, CTA | Business/domain lead + content |
| Capability | Scope, deliverables, process, tooling thực tế, related solution/proof | Engineering/service lead |
| Talent/Training | Engagements, roles/tracks, governance/outcomes, vận hành inquiry | Talent/training lead |
| Industry | Domain reviewer, pain, solution ecosystem, evidence năng lực, architecture nếu có | Domain lead |
| Product | Repeatable core, feature availability, deployment, screenshots, docs/version, demo owner | Product owner |
| Case | Client clearance, 9 phần câu chuyện, evidence từng metric/quote/logo | Delivery lead + account owner |
| Insight/report/event | Author/source, topic, body/abstract/agenda, related solution, assets/access | Editorial + expert |
| Company/job | Fact/benefit/location đã xác nhận, job hiring owner/deadline | Leadership/HR |
| Trust/legal | Policy thực tế, version, effective/review dates, reviewer | Security/privacy/business owner |

Không dịch máy rồi publish mặc định. Duyệt EN về terminology và VI về độ tự nhiên; tests layout dùng title/card dài hơn 30% so với mẫu ngắn. Chỉ set hreflang cho bản dịch đã live.

## 7. Migration và chuyển từ VCCI sang MeU

1. Không đổi trực tiếp dữ liệu VCCI đang live. Xác nhận repo này là nền kỹ thuật được chọn cho MeU; tách environment/database/content namespaces/brand assets.
2. Inventory route/domain cũ của **MeU** từ nguồn thật khi có; không tạo redirect từ URL VCCI chỉ vì cùng repo.
3. Import vào draft: normalize slug, map content types/relations/media, gắn locale; sanitize HTML cũ sang RichText với báo cáo node không hỗ trợ, không silent drop ảnh/caption.
4. Dry run sinh báo cáo slug collisions/missing refs/missing locale/private assets/missing consent. Không publish importer tự động nếu chưa review.
5. Duyệt sample mỗi template và batch remaining; tạo redirects canonical, kiểm tra vòng lặp và một-hop destinations.
6. Test staging bằng dữ liệu đã cho phép. Sau content freeze tạo release snapshot, deploy, warm pages, verify sitemap/search/forms và retain rollback plan.

## 8. Tiêu chí nghiệm thu UX/frontend

### Mọi template

- Desktop 1440/1280, tablet 768, mobile 390/360: không overflow; H1/CTA/card/TOC/bảng hiển thị rõ; VI và EN được test.
- Navigation keyboard, focus visible, dialog focus return, form errors accessible, reduced motion; tiêu chí WCAG 2.2 AA cần audit thực tế khi build.
- Images đúng ratio/focal point/alt; không méo logo, không ảnh placeholder trong content live; content dài không bị cắt mất nghĩa.
- Loading không nhảy layout lớn; empty không nhầm error; filtered empty có Reset; pagination state lưu được URL; back từ detail về list giữ filter.
- Strategic pages có title/description/canonical/OG đúng nội dung; public HTML có nội dung để crawler đọc; not-found trả đúng status.

### Theo template

| Template | Kiểm tra quyết định |
|---|---|
| Home | 11 slots đúng hành trình, section product ẩn đúng nếu thiếu, CTA không mất trên mobile |
| Solution/capability | Business value và technical delivery tách đúng; không lặp y nguyên 17 trang |
| Industry | Readiness gate hoạt động; related case đúng ngành; không publish industry trống |
| Product | Stage/feature availability/deployment đúng; demo giữ product context; private doc không lộ |
| Case | Named/anonymous đúng; metrics có scope/evidence; 9 phần đọc được; no private source serialization |
| Article/report/event | TOC anchors đúng; read time locale; download entitlement; event local time và past/cancelled state |
| Careers/apply | Job close edge case; upload MIME/size/scan; user không truy cập CV người khác |
| Trust/legal | Version/effective/review dates, cookie preferences và links canonical đúng |
| Forms | Double submit idempotent; backend error giữ form; delivery failure vẫn giữ lead đã commit |

Performance budgets đề xuất cho lúc build: LCP ≤2,5s, INP ≤200ms, CLS ≤0,1 ở phân vị 75 khi đủ field data; trước launch dùng lab/device/network profile thống nhất. Các ngưỡng tham chiếu theo [Core Web Vitals — web.dev](https://web.dev/articles/vitals). Đây là mục tiêu kỹ thuật, không tuyên bố website hiện tại đạt. Hero không chờ client fetch; không hydrate cả page builder ở browser nếu section là nội dung tĩnh; lazy-load gallery/maps/embed dưới fold.

Accessibility target tham chiếu [WCAG 2.2 — W3C](https://www.w3.org/TR/WCAG22/); nghiệm thu phải đánh giá đầy đủ các tiêu chí AA áp dụng cho các trang và luồng hoàn chỉnh, không chỉ kiểm tra contrast bằng công cụ tự động.

## 9. Tiêu chí nghiệm thu backend/CMS

- Test owner/editor/reviewer/publisher/sales/recruiter; gọi trực tiếp API bị từ chối đúng quyền, không chỉ ẩn nút.
- Hai editor save cùng version: một 409, không mất dữ liệu. Publish approved revision, draft không leak; lịch publish và timezone đúng.
- VI draft không thay EN live; locale switch không link bản dịch draft; search/sitemap chỉ chứa publication hợp lệ.
- Slug collision/reserved slug/redirect cycle bị reject trước commit; rename sinh 301/308 và canonical mới nhất.
- Relation/media/evidence integrity; không delete asset live đang dùng; field thiếu required reference chặn publish; optional ref bỏ đúng.
- Anonymous case không trả client ID/name/logo private qua API hoặc JSON-LD. Evidence/private storage/CV không được public serialize hoặc index.
- Lead/application/report submit validate server và idempotency; transactional outbox retry khi CRM/mail mất kết nối; không tạo bản ghi nhân đôi.
- Rate limit/upload controls, bounded filter/search/query sizes; không nhận raw SQL/filter string từ client.
- Unpublish/revoke/rights expiry có visibility handling, cache invalidation và alert; không giữ dữ liệu đã thu hồi trong stale public cache.
- Backup/restore cho database + storage + route state được diễn tập; migrations có rollback/forward-fix plan.

## 10. Ngoài phạm vi mặc định

Không bao gồm checkout/e-commerce của chính MeU, hệ thống ticketing sự kiện, LMS, candidate portal login, customer support portal, CRM hoàn chỉnh, personalization theo account, công cụ cấu hình mọi pixel trong CMS, hay chứng nhận compliance. Những thứ này có thể là nội dung giới thiệu capability/product nhưng không tự trở thành tính năng website.

## 11. Bước triển khai đầu tiên sau planning

Chốt content model/API bằng một vertical slice **Digital Transformation (VI/EN) → related capability → case đã được duyệt → form consultation → lead trong CMS**. Song song thiết kế 6 màn hình hi-fi đại diện. Khi slice này qua publish/permissions/preview/form test, mới nhân rộng template và nhập hàng loạt nội dung.
