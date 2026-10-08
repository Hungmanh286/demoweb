# Đề xuất nâng cấp UI/UX — Việt Nam, Mùa Quả Hội Tụ

## Tóm tắt điều hành

Kết hợp `proposal-writer` (cấu trúc thuyết phục và đề nghị ra quyết định) với `frontend-design` (ngôn ngữ thị giác, typography và trải nghiệm đọc). Đề xuất biến microsite thành một hồ sơ biên tập cao cấp: giàu bản sắc mùa quả Việt, nhưng cho phép ban giám khảo hoặc đối tác hiểu nhanh giá trị, cách thực hiện và bước cần phê duyệt.

Phạm vi hiện tại là đề xuất, không triển khai sửa giao diện. Đánh giá dựa trên mã HTML/CSS, nội dung và ảnh slide 8, 10; chưa kiểm tra trực tiếp giao diện mới bằng trình duyệt hay nghiên cứu người dùng. Giả định người đọc chính là người đánh giá/phê duyệt proposal, không phải khách mua vé.

## Hiện trạng và cơ hội

| Quan sát có căn cứ | Đề xuất | Ưu tiên |
|---|---|---|
| Hero ưu tiên “Khám phá câu chuyện”; hồ sơ đầy đủ nằm sau nhiều phần kể chuyện và ảnh demo | Đặt “Xem đề xuất 10 slide” làm hành động chính; video là hành động phụ; đưa tóm tắt quyết định lên gần đầu | P0 |
| Slide 8 nêu nền ngà #FFF7E8 và Be Vietnam Pro, trong khi CSS dùng #EFF2E8 và Noto Sans/Noto Serif fallback | Thống nhất token giữa website, slide và PDF; chốt font có hỗ trợ tiếng Việt, giấy phép và phương án đóng gói local | P0 |
| Slide PNG 16:9 chứa nhiều chữ nhỏ; bản đọc văn bản đã có sẵn | Giữ trình chiếu cho desktop; ưu tiên bản đọc HTML trên mobile, không bắt người đọc phóng to để hiểu nội dung | P0 |
| Liên kết PDF đang ở footer; thumbnail và điều hướng đã hoạt động | Đưa tải PDF cạnh tiêu đề viewer, thêm mục lục theo chủ đề và chỉ báo slide hiện tại | P0 |
| Slide 10 có quy trình, nguồn lực và kiểm soát nhưng nhiều nội dung nhỏ trên cùng một nền | Làm rõ một đề nghị phê duyệt; chia thứ bậc giữa timeline, rủi ro và bước tiếp theo | P1 |
| Phần demo ảnh nói nhiều về cách dàn chữ và sản xuất hình ảnh | Thay bằng giá trị người đọc cần hiểu: không gian festival, hành trình thử vị và kết nối thương mại; chuyển brief kỹ thuật xuống tài liệu phụ | P1 |

Giữ lại nền tảng tốt: phụ đề/transcript, không autoplay, điều khiển bàn phím, focus, reduced motion, bản văn tương đương, thông báo concept và ảnh AI. Không coi các tính năng đang có là tính năng cần xây mới.

## Hướng mỹ thuật khuyến nghị: Biên tập mùa quả Việt

Không dùng phong cách dashboard SaaS, gradient tím, kính mờ hoặc lưới thẻ đồng dạng. Điểm nhớ duy nhất là key visual lát cắt/múi quả hội tụ, lấy chất liệu từ sản vật và mùa vụ; các thành phần còn lại tiết chế.

### Hệ token đề xuất

| Token | Giá trị | Vai trò |
|---|---|---|
| Xanh vườn | #164B35 | Nhận diện, CTA chính, một số mảng nền |
| Giấy ngà | #FFF7E8 | Nền đọc chủ đạo, đồng bộ slide 8 |
| Mực lá | #19392A | Văn bản trên nền sáng |
| Vàng mùa chín | #F4C542 | Nhấn thông tin và tiến trình, không dùng làm chữ nhỏ trên nền ngà |
| Hồng thanh long | #D93B79 | Chi tiết nhận diện, không mặc định dùng cho chữ nhỏ |
| Đường phân cách | #D3DCCF | Cấu trúc nhẹ, cần kiểm tra tương phản nếu mang ý nghĩa chức năng |

Cam quả chín trong bộ nhận diện có thể giữ ở ảnh/ấn phẩm; không cần dùng tất cả màu thương hiệu trong mỗi màn hình. Mọi cặp màu phải kiểm tra tương phản trước khi triển khai.

- Typography: ưu tiên xác minh và đóng gói Be Vietnam Pro cho nội dung, điều khiển và tiêu đề slide; cân nhắc Noto Serif cho tiêu đề biên tập lớn nếu bộ font local và giấy phép phù hợp. Đây là đề xuất tài sản mới, không phải font đã cài.
- Cỡ chữ website: nội dung 16–18 px, chú thích 12–14 px; tiêu đề hero 48–72 px desktop và 36–44 px mobile, điều chỉnh theo độ dài thực tế.
- Nội dung căn trái, dòng đọc khoảng 60–75 ký tự; không căn đều hai bên. Dùng khoảng cách theo thang 8/16/24/32/48/64 px.
- Chỉ dùng số thứ tự cho hành trình và timeline thực sự có thứ tự. Chuyển label sang sentence case, tránh chữ hoa giãn cách tràn lan.
- Ảnh và copy tách riêng; không phủ đoạn chữ dài lên ảnh. Chỉ dùng ảnh minh họa đúng ngữ cảnh, ghi rõ AI và nguồn/giới hạn sử dụng.
- Motion phản hồi thao tác 150–220 ms; không parallax, không tự chuyển slide, không animation từng thẻ.

### Tự phản biện hướng thiết kế

Serif lớn + nền xanh + ảnh trái cây vẫn có thể giống landing page du lịch chung chung. Để tránh điều đó, giữ hình hội tụ từ múi/hạt làm dấu hiệu riêng, dùng hành trình “vùng đất → người trồng → hương vị → kết nối” làm cấu trúc nội dung và ưu tiên phần quyết định proposal thay vì các khối số liệu trang trí. Không thêm hiệu ứng nếu không giúp hiểu nội dung.

## Kiến trúc thông tin đề xuất

```text
Header: Nhận diện | Ý tưởng | Trải nghiệm | Hồ sơ | Tải PDF
Hero: Mùa Quả Hội Tụ + một câu giá trị + key visual
      [Xem đề xuất 10 slide] [Xem intro 45 giây]
      Concept đề xuất — thời gian/địa điểm chưa xác nhận
Tóm tắt: Vấn đề → Giải pháp → Giá trị → Đề nghị phê duyệt
Câu chuyện: Vùng đất / Người trồng / Hương vị
Trải nghiệm: Sơ đồ năm không gian + hành trình khách
Hồ sơ: Mục lục | Stage 16:9 | Trước/Sau | Tải PDF
        Chế độ trình chiếu / Chế độ đọc
Khả thi: Lộ trình / Nguồn lực / Rủi ro / Điều cần xác nhận
Kết: Thống nhất concept → Phê duyệt khảo sát
Footer: Tri Team / nguồn ảnh / disclosure / tài liệu bổ sung
```

Desktop: bố cục biên tập bất đối xứng, ảnh lớn và vùng chữ yên tĩnh; viewer có mục lục theo chủ đề khi đủ chỗ. Mobile: một cột, CTA rõ, mục lục có thể thu gọn; bản đọc dễ tiếp cận ngay cạnh viewer. Không tạo menu hoặc nút tải giả khi chưa có chức năng/tài sản.

## Nâng chất lượng nội dung proposal

- Tóm tắt đầu trang phải trả lời: đang giải quyết vấn đề gì, giải pháp khác biệt ở đâu, ai được hưởng lợi, đang xin phê duyệt điều gì.
- Mỗi slide có một thông điệp chính; phần giải thích dài đi vào bản đọc HTML hoặc ghi chú.
- Giữ đúng 10 slide nếu đây là ràng buộc nộp bài; không tự thêm slide chỉ để có bảng giá.
- Slide 8: trình bày hệ màu và font có thứ bậc, tăng độ đọc của caption; nhận diện phải khớp website thật.
- Slide 10: giữ bốn giai đoạn, nhấn “Thống nhất concept và phê duyệt khảo sát”; tách rõ chi phí cần dự toán, nguồn hỗ trợ chưa cam kết và rủi ro.
- Không bổ sung số liệu thị trường, ngân sách, nhà tài trợ, ngày tổ chức hoặc hiệu quả kinh doanh chưa được cung cấp/kiểm chứng.
- Nếu thêm KPI, ghi là tiêu chí dự kiến và định nghĩa cách đo, không trình bày như kết quả đã đạt.

## Phạm vi và lộ trình

| Giai đoạn | Đầu ra | Điều kiện hoàn tất |
|---|---|---|
| 1. Chốt cấu trúc | Tóm tắt proposal, wireframe desktop/mobile, token | Duyệt mục tiêu người đọc và thứ tự nội dung |
| 2. Nâng UI | Hero, nhịp layout, typography, CTA/PDF | Đồng nhất nhận diện, không mất disclosure |
| 3. Nâng UX viewer | Mục lục, lựa chọn đọc/trình chiếu, mobile | Hash/Back/Forward, keyboard và video vẫn hoạt động |
| 4. Đồng bộ bàn giao | PNG/PDF và kiểm tra responsive/accessibility | Đúng 10 slide, nội dung khớp, liên kết tải hợp lệ |

Không thay framework: triển khai bằng HTML/CSS/ES modules hiện có. Ngân sách và lịch triển khai chưa xác lập; cần căn cứ nhân lực, phạm vi sửa slide và tài sản font/ảnh trước khi báo giá hoặc cam kết thời gian. Chưa bao gồm đăng ký tham gia, thanh toán, CRM hoặc analytics.

## Tiêu chí nghiệm thu khi triển khai

- Kiểm tra 360, 390, 768, 1024 và 1440 px; không tràn ngang, chữ không bị cắt.
- Tương phản WCAG AA: 4.5:1 cho chữ thường, 3:1 cho chữ lớn; trạng thái/focus không chỉ phân biệt bằng màu.
- Mục tiêu vùng bấm tối thiểu 44×44 px; giữ skip link, focus rõ, điều khiển bàn phím và reduced motion.
- Bản đọc tương đương truy cập được; kiểm tra thủ công với screen reader, không chỉ công cụ tự động.
- PDF dễ tìm từ đầu trang và viewer, chứa đúng 10 trang; PNG/slide vẫn hiển thị đầy đủ, không crop nội dung.
- Video không autoplay, có phụ đề, dừng đúng khi rời slide; rà soát việc phát đồng thời video hero và viewer.
- Không lỗi JavaScript, không ảnh hỏng, không CTA giả; kiểm tra tải chậm và media lỗi.
- Mục tiêu hiệu năng nếu đo được: LCP ≤ 2.5 giây, CLS ≤ 0.1, INP ≤ 200 ms; kết quả lab không thay thế dữ liệu người dùng thực.

## Đề nghị bước tiếp theo

Ưu tiên P0 trước: đồng bộ nhận diện, đưa tóm tắt và PDF lên sớm, cải thiện bản đọc mobile. Sau đó hoàn thiện key visual và slide 10. Đánh giá prototype bằng một nhiệm vụ cụ thể: người đọc có tìm được concept, giá trị chính và đề nghị phê duyệt mà không phải xem hết video hay phóng to slide hay không.