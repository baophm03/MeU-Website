# MeU Visual System — Cinematic Partnership

## Concept

MeU xuất hiện như một đối tác chiến lược giúp doanh nghiệp nhìn rõ bài toán, thiết kế hệ thống và đưa giải pháp vào vận hành. Hình ảnh mang quy mô lớn, tối, có chiều sâu và con người; lớp giao diện giữ kỷ luật, rõ ràng và có thể triển khai thật.

## Design tokens

| Token | Giá trị | Vai trò |
|---|---:|---|
| Ink 950 | `#050608` | Nền hero, CTA và section điện ảnh |
| Ink 900 | `#0B1018` | Nền card tối |
| Ink 800 | `#141C28` | Border/surface nổi |
| Paper 50 | `#F4F6F8` | Nền vùng đọc dài |
| White | `#F8FAFC` | Heading trên nền tối |
| Slate 300 | `#AAB4C2` | Body text trên nền tối |
| Slate 650 | `#526174` | Body text trên nền sáng |
| Cobalt 500 | `#315CFF` | CTA, focus, dữ liệu trọng tâm |
| Cobalt 300 | `#75A7FF` | Glow và đường dữ liệu phụ |
| Success | `#50CFA1` | Chỉ dùng cho trạng thái thành công thật |

Không dùng purple gradient. Ánh sáng xanh là một phần của hình ảnh, không thay thế cấu trúc nội dung.

## Typography

- Display: `Manrope` hoặc `Inter Tight`, weight 500–700, hỗ trợ đầy đủ tiếng Việt.
- Body/UI: `Inter`, weight 400–600.
- H1 desktop `clamp(64px, 6.2vw, 104px)`, line-height 0.94–1.02; mobile 42–52px.
- H2 desktop 52–72px; mobile 34–42px.
- Body lead 20–24px; body 16–18px; label 11–13px uppercase với tracking 0.12–0.18em.
- Headline có thể uppercase ở hero/section divider; nội dung dài dùng sentence case.

## Grid và spacing

- Max width 1440px; content width 1280px; desktop 12 cột, tablet 8, mobile 4.
- Header 88px, thu còn 72px khi cuộn.
- Section desktop 120–168px; tablet 88–120px; mobile 64–88px.
- Card gap 24px; mobile 16px. Radius cơ sở 4px, feature media tối đa 12px.
- Thin rules 1px `rgba(255,255,255,.16)` tạo nhịp thay cho nhiều container.

## Components

- Primary button: cobalt solid, cao 52px, góc 2–4px, icon mũi tên dịch 4px khi hover.
- Secondary button: transparent, border trắng/xám, cùng kích thước primary.
- Challenge card: hàng ngang có số, pain, outcome và arrow; hover làm sáng đường biên và ảnh nền.
- Solution card: hình cinematic 16:10, eyebrow, title, outcome, tối đa 3 scope item.
- Industry card: ảnh 4:3 phủ màu xanh đen, tên ngành lớn đặt sát đáy.
- Case card: ảnh hoặc product screen 16:10, cấu trúc Challenge / Solution / Impact; metric chỉ xuất hiện khi CMS đánh dấu approved.
- Insight card: ảnh 16:9, topic/date/read time, title tối đa 3 dòng.
- Proof strip: logo có consent hoặc evidence label; không tạo logo và số liệu giả.
- Architecture visual: SVG/WebGL nhẹ, luôn có ảnh tĩnh, caption và mô tả thay thế.

## Motion

- Page entry: opacity và translateY tối đa 16px, 500–700ms.
- Hero visual: parallax 2–4%, ánh sáng trôi chậm; không autoplay video có âm thanh.
- Section transition: mask reveal hoặc clip-path trên media, text xuất hiện theo dòng.
- Card hover: media scale tối đa 1.025, 300–450ms.
- `prefers-reduced-motion`: tắt parallax, scrub và stagger; giữ opacity transition ngắn.

## Homepage sequence

1. Hero — business challenge, value proposition, hai CTA và proof strip.
2. Challenge selector — sáu bài toán doanh nghiệp dưới dạng editorial list/cards.
3. Business Solutions — một giải pháp featured và sáu giải pháp compact.
4. AI & Intelligent Automation — workflow input, human review và outcome.
5. Industries — sáu ngành với hình ảnh có bối cảnh thực.
6. Products — một product featured và hai product card; ẩn khi chưa đủ dữ liệu.
7. Client Success — case featured cùng Challenge / Solution / Impact.
8. Capabilities — lifecycle Consult → Build → Integrate → Test → Operate.
9. Why MeU — evidence, differentiators và logo đã được duyệt.
10. Insights — ba nội dung mới hoặc curated.
11. Final CTA — một lời mời trao đổi, contact route rõ ràng.

## Responsive behavior

- Hero mobile dùng ảnh làm canvas, headline 4–6 dòng và CTA xếp dọc; không giữ các label trang trí ở mép.
- Mega menu thành drawer accordion full-height.
- Featured layouts chuyển thành media trước, nội dung sau; không thu nhỏ sơ đồ desktop.
- Card grid 3/2/1; editorial list giữ số thứ tự và arrow, bỏ mô tả phụ nếu cần.
- Architecture dùng bản simplified SVG và nút mở hình lớn.

## CMS mapping

Mỗi section có `eyebrow`, `heading`, `summary`, `theme`, `media`, `primary_cta`, `secondary_cta`, `items` hoặc references. Media cần desktop/mobile crop, focal point, alt, caption và rights metadata. Proof metric cần value, unit, scope, period, source và approval state. Homepage API trả một payload đã resolve references.
