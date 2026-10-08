# Brief triển khai HTML — Festival Trái Cây Việt Nam

## 1. Nhiệm vụ và nguồn chuẩn

Bạn là sub-agent frontend. Hãy xây một website trình diễn proposal chuyên nghiệp bằng **HTML, CSS và JavaScript thuần**, gồm **slide 1 là video intro, slide 2–10 là chín ảnh nội dung**. Không xây một landing page dài thay thế cấu trúc này.

Nguồn nội dung bắt buộc:

- `/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/KE-HOACH-NOI-DUNG-10-SLIDE.md`
- `/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/README.md`

Concept: **Việt Nam — Mùa Quả Hội Tụ**.

Thông điệp: **Nếm vị bản địa — Kết nối giá trị Việt.**

Đây là hồ sơ đề xuất, không phải thông báo một sự kiện đã được xác nhận. Giữ nhãn “đề xuất”, “dự kiến” cho quy mô, địa điểm và lịch trình. Không tự thêm ngày, giá vé, đối tác, chứng nhận hoặc số liệu.

## 2. Hiện trạng và phạm vi chỉnh sửa

Tại thời điểm viết brief, thư mục dự án chưa có HTML/CSS/JS. Có ba ảnh chưa được Git theo dõi:

- `/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu/assets/fruit-market.jpg`
- `/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu/assets/mangoes.jpg`
- `/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu/assets/orchard.jpg`

**Chưa xác minh nguồn/quyền sử dụng và chưa có video hoặc chín PNG cuối.** Không coi ba ảnh trên là slide hoàn chỉnh hay tài sản AI đã duyệt. Không xóa, ghi đè hoặc commit chúng nếu chưa được giao riêng.

Trước khi làm, đọc lại trạng thái Git và cây file vì worker khác có thể đã cập nhật dự án.

Chỉ tạo/chỉnh source và tài liệu bàn giao dưới:

`/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu/`

Không sửa tài liệu BTC, cấu hình agent, hook, root README hay secret. Không commit/push, đổi nhánh hoặc ghi đè thay đổi của worker khác nếu chưa được yêu cầu. Không dùng `git add .`.

## 3. Stack và cách chạy

- HTML5 semantic, CSS responsive, JavaScript ES modules thuần.
- Không React, Next.js, Vue, Tailwind, thư viện slider, CDN hoặc backend trong phạm vi này.
- Không cần npm/build step. Không gọi AI API từ trình duyệt.
- Font hệ thống có dấu tiếng Việt là fallback bắt buộc. Chỉ dùng Be Vietnam Pro local khi có file và giấy phép được duyệt; không tự tải font ngoài.
- Chạy qua HTTP, không cam kết hỗ trợ `file://` cho ES modules.

Lệnh chạy dự kiến:

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory /home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu
```

URL: `http://127.0.0.1:8000/`. Khi kiểm thử bằng tool không tương tác, chạy server nền, lưu PID/log và chỉ dừng server do mình khởi tạo.

## 4. File cần bàn giao

Tất cả đường dẫn sau là tương đối với thư mục dự án tuyệt đối ở mục 2:

| File | Trách nhiệm |
|---|---|
| `index.html` | Khung semantic, header, stage, navigation, trạng thái và dialog |
| `styles.css` | Tokens, layout, responsive, focus, reduced motion |
| `app.js` | Điều hướng, render, media lifecycle, hash, phóng ảnh |
| `content.js` | Nội dung văn bản chuẩn của 10 slide và transcript |
| `assets-manifest.js` | Mapping tài sản, đường dẫn và trạng thái duyệt |
| `README.md` | Cách chạy, cấu trúc, cách thay media, giới hạn hiện tại |
| `QA-REPORT.md` | Kiểm thử thực tế, kết quả, lỗi/chặn còn lại |

Media worker bàn giao qua manifest, frontend không tự sản xuất video/PNG trong nhiệm vụ này. Không tạo file giả mang tên video hoặc PDF.

## 5. UI mục tiêu

### Desktop

1. Header gọn: tên festival, nhãn “Hồ sơ đề xuất · Tri Team”.
2. Stage 16:9 là điểm tập trung, dùng `object-fit: contain` để không cắt nội dung slide.
3. Thanh điều khiển bên ngoài stage: Trước, “01 / 10”, tiêu đề slide, Sau, mở ảnh lớn khi phù hợp.
4. Dải thumbnail có nhãn cho 10 slide, cuộn ngang nếu thiếu chỗ.
5. Khu “Đọc nội dung slide” hiển thị văn bản tương đương ảnh; slide 1 có transcript.
6. Footer nhỏ: thông tin proposal và trạng thái tài sản.

### Mobile

- Stage giữ 16:9; không ép full viewport hoặc crop ảnh.
- Nút điều khiển đủ lớn, không che chữ trong ảnh/video.
- Văn bản tương đương dễ đọc ngay dưới stage.
- Cho phép mở ảnh lớn và cuộn để đọc bản gốc; luôn có cách đóng rõ ràng.
- Không tràn ngang toàn trang; thumbnail được phép cuộn trong vùng riêng.

### Thị giác

| Token | Giá trị |
|---|---|
| Xanh vườn | `#164B35` |
| Trắng ngà | `#FFF7E8` |
| Vàng mùa chín | `#F4C542` |
| Hồng thanh long | `#D93B79` |
| Cam quả chín | `#F58232` |

Ưu tiên xanh/trắng ngà, màu còn lại làm điểm nhấn. Tránh hiệu ứng 3D, particle nặng, gradient đại trà và animation gây mất tập trung. Không dùng màu vàng/cam cho chữ nhỏ trên nền sáng khi chưa kiểm tra tương phản.

## 6. Mapping nội dung 10 slide

Copy nội dung từ tài liệu nguồn vào `content.js`, không chỉ đưa tiêu đề hoặc lorem ipsum. Có thể biên tập để dễ đọc nhưng không thay ý nghĩa hoặc bỏ ghi chú giả định.

| ID | Tiêu đề | Loại | Nội dung bắt buộc |
|---|---|---|---|
| `slide-01` | Từ một vùng đất đến một cuộc hội tụ | video | Tên festival, thông điệp, transcript 40–45 giây, ghi chú minh họa AI |
| `slide-02` | Trái ngọt Việt cần một điểm hội tụ | image | Bối cảnh theo đề, ba mục tiêu, nhóm hưởng lợi |
| `slide-03` | Mỗi trái ngọt, một câu chuyện | image | Vùng đất, người trồng, kết nối, hành trình giá trị |
| `slide-04` | Một festival — Năm không gian khám phá | image | Quy mô đề xuất 3 ngày/60–80 gian/5 khu, địa bàn khảo sát, chú thích |
| `slide-05` | Đến để nếm — Ở lại để hiểu — Rời đi với kết nối | image | Lịch ba ngày, hoạt động xuyên suốt, an toàn |
| `slide-06` | Hộ chiếu Vị Việt | image | Năm dấu, lợi ích, mô hình giấy/web, ghi chú demo |
| `slide-07` | Biến trải nghiệm thành câu chuyện được chia sẻ | image | Trước/trong/sau, kênh, KPI định tính, hashtag |
| `slide-08` | Bản địa trong câu chuyện — Hiện đại trong hình ảnh | image | Key visual, màu, typography, nguyên tắc |
| `slide-09` | Một câu chuyện — Nhiều điểm chạm | image | Poster, brochure, web; mockup và thiết kế đọc được |
| `slide-10` | Từ cuộc hội tụ đến giá trị bền lâu | image | Lộ trình, nhóm ngân sách, điều kiện, bước tiếp theo |

Không cần làm hộ chiếu tương tác, CRM, đăng ký, chatbot hoặc thanh toán: đây là **trình xem proposal**, không phải hệ thống vận hành festival.

## 7. Hợp đồng dữ liệu và tài sản

### Nội dung

`content.js` export danh sách đúng 10 slide. Mỗi slide có:

- `id`: đúng mapping mục 6.
- `title`, `type`, `summary`.
- `sections`: danh sách tiêu đề và đoạn/bullet văn bản.
- `notes`: nhãn đề xuất, chú thích nguồn, trạng thái minh họa.
- `transcript`: có cho slide 1.

Không chứa HTML không kiểm soát. Khi render văn bản dùng `textContent`/DOM API, không chèn dữ liệu ngoài qua `innerHTML`.

### Manifest

`assets-manifest.js` export mapping theo slide ID, mỗi mục có:

- `status`: `pending`, `review` hoặc `approved`.
- `src`: đường dẫn tương đối có thật; dùng `null` khi chưa có, không trỏ vào file dự kiến.
- `poster`, `captions`: tương tự, chỉ dùng cho video.
- `alt`: mô tả ảnh ngắn; nội dung dài nằm ở phần đọc slide.
- `width`, `height`: kích thước đã xác minh hoặc `null`.
- `rightsNote`: nguồn/quyền sử dụng đã biết hoặc ghi chưa xác minh.

Manifest có thêm `deliverables` cho PDF/PNG archive nếu có thật. Chưa có file thì `src: null`, không render nút tải có vẻ hoạt động.

Đường dẫn dự kiến sau khi media worker bàn giao:

- Video: `assets/video/intro.mp4`.
- Poster: `assets/video/intro-poster.png`.
- Phụ đề WebVTT: `assets/video/intro.vi.vtt`.
- Chín ảnh: `assets/slides/slide-02.png` đến `assets/slides/slide-10.png`.

Các đường dẫn trên là **quy ước bàn giao**, không phải file hiện có. Ban đầu để `src: null` cho tài sản chưa nhận. Chỉ dùng ảnh/video được duyệt; tài sản `review` hoặc `pending` hiển thị fallback.

## 8. Trạng thái media và fallback

### Chưa có tài sản

- Video: bìa HTML có tên, thông điệp, nhãn “Video intro đang được sản xuất” và transcript.
- Ảnh: layout HTML gọn chứa nội dung slide, nhãn “Bản nội dung — chờ ảnh thiết kế”.
- Không thay slide bằng một ảnh trái cây tùy ý.
- Không có broken image, spinner vô hạn hoặc nút play giả.

### Đã có tài sản

- Ảnh được hiển thị nguyên khung; văn bản tương đương vẫn tồn tại.
- Video dùng `<video controls playsinline preload="metadata">`, không `autoplay`.
- Thêm `<track kind="captions" srclang="vi">` khi phụ đề có thật.
- Tải video khi người dùng vào slide 1, không tải toàn bộ phim khi đang ở slide khác.
- Khi rời slide 1, pause video; quay lại không tự phát.

### Lỗi tải

- `error` trên ảnh/video chuyển sang fallback đọc được; thông báo không tiết lộ path nội bộ nhạy cảm.
- Có thể cho thử lại bằng thao tác rõ ràng, không vòng lặp retry vô hạn.
- Với ảnh đã duyệt nhưng URL sai, request lỗi là tình huống QA cần xử lý; bản bàn giao bình thường phải không có 404.
- Phụ đề lỗi: transcript vẫn truy cập được; ghi nhận lỗi trong QA.

## 9. Hành vi điều hướng

- Mặc định mở slide 1; có deep link `#slide-01` đến `#slide-10`.
- Hash không hợp lệ quay về slide 1 an toàn.
- Nút Trước/Sau không vòng lặp; disabled ở biên.
- Chọn thumbnail cập nhật stage, số trang, tiêu đề, trạng thái active và hash.
- Back/Forward trình duyệt khôi phục slide tương ứng; không tạo vòng lặp cập nhật hash.
- Hỗ trợ ArrowLeft/ArrowRight, Home/End khi focus ở vùng trình chiếu; không chiếm phím trong video, input, textarea, select, contenteditable hoặc dialog.
- Không tự chạy slideshow và không tự chuyển slide khi video kết thúc.
- Chuyển slide không cuộn trang bất ngờ, không cướp focus; trạng thái cập nhật qua `aria-live="polite"`.
- Video play bị từ chối phải xử lý promise nếu dùng nút play tùy chỉnh; ưu tiên controls native.

## 10. Phóng ảnh và khả năng tiếp cận

- Nút mở ảnh lớn chỉ xuất hiện khi ảnh thật đã tải thành công.
- Có thể dùng `<dialog>` native; có nút Đóng, hỗ trợ Escape, focus ban đầu và trả focus về nút mở.
- Giữ ảnh nguyên bản, cho vùng dialog cuộn trên mobile; không bắt buộc custom pinch/drag.
- Không intercept phím điều hướng slide khi dialog đang mở.
- `lang="vi"`, viewport meta, một H1 hợp lý, landmark header/main/footer.
- Button có tên đọc được; slide active dùng `aria-current`; focus rõ và target khoảng 44px trở lên.
- Nội dung tương đương ảnh hiển thị thật hoặc qua `<details>` dễ truy cập, không giấu tất cả khỏi screen reader.
- Có skip link đến main; bảo đảm tương phản WCAG AA cho chữ/nút.
- Tôn trọng `prefers-reduced-motion`; không yêu cầu animation để hiểu nội dung.
- Có thông báo hữu ích trong `<noscript>`.

## 11. Hiệu năng, bảo mật và ranh giới

- Không nhúng base64 video/ảnh lớn vào HTML.
- Chỉ tải ảnh đang xem và thumbnail thật cần thiết; có thể preload một ảnh kế tiếp sau khi ảnh hiện tại tải xong.
- Không tải chín ảnh full-size cùng lúc để tạo thumbnail. Khi chưa có thumbnail, dùng nhãn văn bản/số.
- Không analytics, cookie, thu thập dữ liệu hay external requests mặc định.
- Không API key, `.env`, endpoint bí mật hoặc token ở source/manifest.
- Asset path tương đối để chạy dưới subdirectory.
- Không làm chức năng xuất PDF/PNG giả. Chỉ liên kết file hoàn chỉnh được worker khác bàn giao.
- Không thêm dependency chỉ để chụp screenshot; nếu môi trường có browser automation thì tận dụng, nếu chưa có thì báo hạn chế và kiểm thử thủ công.

## 12. Thứ tự triển khai

1. Đọc tài liệu và kiểm tra Git/cây file; báo xung đột nếu có.
2. Tạo `content.js` đủ 10 slide và manifest trung thực trạng thái media.
3. Dựng HTML semantic và fallback hoàn chỉnh trước khi có tài sản.
4. Làm tokens, desktop/mobile, stage 16:9 và vùng đọc nội dung.
5. Làm navigation, deep link, history và video lifecycle.
6. Làm dialog ảnh, keyboard, focus, reduced motion.
7. Tích hợp tài sản duyệt qua manifest, không đổi schema tùy tiện.
8. Chạy HTTP server và kiểm thử; sửa lỗi, đọc lại file.
9. Bàn giao README và QA report với kết quả thực tế, không tuyên bố website đã có media cuối khi chưa có.

## 13. Ma trận kiểm thử bắt buộc

| Nhóm | Kịch bản | Kết quả mong đợi |
|---|---|---|
| Nội dung | Đếm slide, đối chiếu tài liệu | Đúng 10, đúng thứ tự, đủ ghi chú giả định |
| Điều hướng | Trước/Sau, thumbnail, Home/End | Đúng index, disabled ở biên, không tự vòng |
| URL | Reload deep link, hash sai, Back/Forward | Slide đúng, không lỗi hoặc loop |
| Focus | Keyboard, skip link, chuyển slide | Focus rõ, không bị chiếm ngoài vùng |
| Video | Play/pause, rời slide, quay lại | Không autoplay/âm thanh bất ngờ, rời slide thì pause |
| Missing media | Manifest có `null` hoặc pending | Fallback đủ nội dung, không request file giả |
| Media lỗi | URL sai trong fixture kiểm thử | Fallback, không spinner vô hạn hoặc uncaught error |
| Ảnh | Ảnh dài chữ và tỷ lệ 16:9 | Không crop; có nội dung tương đương |
| Dialog | Mở/đóng/Escape, mobile | Focus trong dialog, trả focus, ảnh cuộn được |
| Responsive | 360×800, 768×1024, 1440×900 | Không tràn ngang, điều khiển không che media |
| Motion | Reduced motion bật | Chuyển trạng thái không phụ thuộc animation |
| Tải file | Chưa có và đã có PDF | Chưa có không có link giả; có thì tải đúng |
| Chất lượng | Console/network, đường dẫn tương đối | Không uncaught error; không 404 ở trạng thái bình thường |
| Secret | Đọc diff/source | Không có key, token hoặc dữ liệu cá nhân |

Các ca video/ảnh thành công phải dùng tài sản thật được duyệt hoặc fixture local hợp lệ, ghi rõ loại nào đã dùng. Nếu chưa có video, đánh dấu ca play/captions là **blocked**, không đánh dấu pass bằng fallback. Không sửa manifest production thành URL lỗi sau kiểm thử.

## 14. Definition of Done

- [ ] Có đủ file bàn giao và source chạy qua HTTP không cần build.
- [ ] Đúng mô hình 1 video + 9 ảnh; không biến thành landing page dài.
- [ ] Chưa có media vẫn đọc đủ proposal, nhãn pending trung thực.
- [ ] Có media thì hiển thị thật, không crop và không autoplay có âm thanh.
- [ ] Navigation, hash/history, keyboard và dialog hoạt động.
- [ ] Nội dung tiếng Việt đầy đủ, giả định và quyền sử dụng không bị che giấu.
- [ ] Responsive, focus, reduced motion và transcript đã kiểm tra.
- [ ] Không link tải giả, không key, không dependency chưa thống nhất.
- [ ] README hướng dẫn thay tài sản bằng manifest; QA report ghi pass/fail/blocked thực tế.
- [ ] Đọc lại tất cả file đã tạo/chỉnh; báo rõ file, lệnh chạy và điểm còn thiếu.

## 15. Prompt giao việc có thể sao chép

```text
Bạn là sub-agent frontend của dự án Festival Trái Cây Việt Nam.

Đọc và tuân thủ:
/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/DOCS-SUBAGENT-HTML.md
/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/KE-HOACH-NOI-DUNG-10-SLIDE.md

Triển khai HTML/CSS/JavaScript thuần tại:
/home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu/

Mục tiêu là trình xem proposal 10 slide: slide 1 video, slide 2–10 ảnh.
Chưa có media thì dùng fallback nội dung có nhãn, không tạo file/link giả.
Không xây backend, không gọi AI API phía client, không thêm framework.
Không xóa/ghi đè ảnh hiện có hoặc thay đổi của worker khác.
Không commit/push trừ khi được yêu cầu riêng.

Trước khi code hãy kiểm tra hiện trạng và nêu kế hoạch ngắn.
Sau khi code hãy chạy server, kiểm thử theo ma trận, đọc lại file.
Bàn giao README và QA-REPORT, liệt kê file đã chỉnh, kết quả thực tế,
ca bị blocked vì thiếu media/công cụ và việc cần media worker hoàn thiện.
```