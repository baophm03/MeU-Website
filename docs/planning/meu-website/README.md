# MeU Solutions — Kế hoạch website, UI và CMS

Ngày lập: 09/09/2026. Trạng thái: **đề xuất để thiết kế và triển khai**, chưa phải giao diện đã được duyệt hoặc tính năng đã có.

Nguồn yêu cầu: sitemap “MEU SOLUTIONS FINAL WEBSITE SITEMAP”, bản 20/08/2026 do người dùng cung cấp. Giữ nguyên sáu nhóm header; Trust Center ở footer/utility. Không thêm Talent hoặc Training vào menu cấp một.

## Bộ tài liệu

| Tài liệu | Dùng để làm gì |
|---|---|
| [01 — Thiết kế từng trang](01-page-design.md) | Art direction, navigation, card, từng landing/detail, nội dung và CTA |
| [02 — CMS, backend và schema](02-cms-and-schema.md) | Màn hình quản trị, collection, field/type, quan hệ, publish, API và dữ liệu form |
| [03 — Kế hoạch triển khai](03-delivery-plan.md) | Đối chiếu source hiện tại, phạm vi MVP, thứ tự thực hiện và tiêu chí nghiệm thu |
| [Route manifest](routes.json) | Danh sách URL/template/CMS ở dạng máy đọc được; bao gồm route động, bộ lọc và redirect |

## Quyết định nền tảng

1. Website bán giải pháp theo hành trình **Challenge → Solution → Capability → Industry → Case Study → Consultation**.
2. Hai locale `/vi` và `/en`. Dùng slug tiếng Anh thống nhất cho các trang chiến lược; tiêu đề, nội dung, SEO dịch riêng. Bài viết/case/product có thể có slug theo locale.
3. Thiết kế bằng **template có cấu trúc**; CMS sửa nội dung và chọn biến thể cho phép, không nhập CSS/HTML tùy ý để tự tạo layout.
4. Dữ liệu dùng lại bằng quan hệ: một case có thể xuất hiện ở solution, industry, product và insight; không copy thành nhiều bài.
5. Các category sản phẩm, chủ đề insight và bộ lọc case là các view của collection, không phải mỗi mục một module backend riêng.
6. Các chỉ số, logo khách hàng, testimonial, chứng nhận chỉ xuất bản khi có bằng chứng/quyền sử dụng. Nội dung chưa đủ thì ẩn section hoặc chưa publish trang.
7. Repo hiện tại là frontend VCCI. Kế hoạch này là mục tiêu MeU mới; chỉ tái sử dụng phần kỹ thuật phù hợp sau khi tách dữ liệu/branding. Chưa giả định có quyền truy cập source backend hoặc database hiện tại.

## Hướng thiết kế đề xuất

Website B2B công nghệ với nền sáng, chữ lớn, bố cục editorial rõ ràng, ảnh sản phẩm thật và sơ đồ hệ thống có chú thích. Màu nhấn dùng có chủ đích ở CTA, liên kết và số liệu. Đây là hướng đề xuất, **không phải nhận diện thương hiệu MeU đã được xác nhận**.

Thay vì thiết kế hàng chục trang rời rạc, triển khai khoảng 15 họ template: home, hub, solution, capability, talent, training, industry, product, case, insight/resource/event, company, career, trust/legal, search và conversion. Các biến thể cụ thể được quy định trong tài liệu 01.

## Phạm vi của bản planning

Bản này đủ để chia việc cho design, frontend, backend và content. Bao phủ sitemap đầy đủ, nhưng không yêu cầu đưa toàn bộ nội dung lên live cùng lúc. Các trang thiếu case, sản phẩm chưa đủ điều kiện hoặc policy chưa được phê duyệt giữ ở trạng thái draft. Thời lượng trong tài liệu 03 là ước lượng theo giả định nguồn lực, không phải cam kết lịch.
