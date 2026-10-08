# QA — Việt Nam, Mùa Quả Hội Tụ

Ngày kiểm tra: 08-10-2026. Trình duyệt: Google Chrome 136.0.7103.59; Playwright 1.63.0 trong môi trường tạm ngoài repo. Website chạy qua `python3 -m http.server` trên loopback.

## Kết quả đạt

- Cú pháp các module `app.js`, `content.js`, `assets-manifest.js` và `proposal-content.js` hợp lệ theo `node --check`.
- Nguồn nội dung có đúng 10 slide theo thứ tự; slide 1 là video, slide 2–10 là ảnh. Các mục có tiêu đề, tóm tắt, sections, notes; slide 1 có transcript 6 câu, slide 7 giữ riêng transcript phim concept mở rộng 60 giây.
- Video `assets/video/intro.mp4` phát được trong Chrome, H.264/AAC, 1280×720, dài 45.013 giây. Poster là `assets/video/intro-poster.png`. Trang gốc không gửi request MP4; hero đặt `preload="none"`, còn video trong viewer chỉ nạp metadata khi vào màn hình. Cả hai dùng native controls, không autoplay; video trong viewer phát/dừng được, tự pause khi chuyển slide và không tự phát khi quay lại.
- WebVTT `assets/video/intro.vi.vtt` tải trong trình duyệt và có 8 cue tiếng Việt. Transcript đầy đủ vẫn nằm trong bản đọc slide.
- Nút Trước/Sau dừng ở biên; thumbnail, ArrowLeft/ArrowRight, Home/End, deep link, hash không hợp lệ và Back/Forward trình duyệt đều hoạt động.
- Anchor `#home`, `#intro-video`, `#story`, `#experience` và `#proposal` cuộn đến đúng phần microsite mà không bị bộ định tuyến slide ghi đè.
- PNG nội dung giữ nguyên khung với `object-fit: contain`. Dialog ảnh mở được, nhận focus, đóng bằng Escape và trả focus về nút mở.
- Ở 360×800, 768×1024 và 1440×900, stage giữ 16:9 và trang không tràn ngang. Nút trước/sau cao ít nhất 44 px trên mobile.
- Skip link chuyển focus đến main; `prefers-reduced-motion` được nhận. Có một H1 trang ổn định khi stage hiển thị media đã duyệt.
- Fixture QA cố ý trả 404 được chuyển về fallback nội dung; không để ảnh hỏng, spinner hoặc đường dẫn nội bộ trong giao diện. Manifest production không thay đổi bởi fixture.
- PDF có 10 trang, khổ 960×540 pt. Cả 10 PNG đều 1600×900 và trả HTTP 200; PDF cũng trả HTTP 200.
- Không có lỗi JavaScript uncaught hoặc request ra ngoài loopback. Lỗi mạng duy nhất trong lượt QA là 404 fixture đã chủ động tạo.

## Giới hạn còn lại

- Chưa kiểm tra bằng screen reader hoặc chạy công cụ đánh giá WCAG tự động; các tương phản màu đã được spot-check trước đó.
- Video dùng cảnh vùng trồng/festival minh họa tạo bằng AI; disclosure có trong end card và bản đọc slide. Đây không phải tư liệu sự kiện thực tế.
- Phim concept mở rộng 60 giây trong slide 7 vẫn là storyboard, độc lập với intro 45 giây đã render.
- Bản dựng phối narration với nhạc gốc và ambience được tách từ audio source; clip source bị mute để tránh lặp audio.
- Chưa có file nén PNG; `pngArchive.src` giữ `null` và website không hiện liên kết tải giả.

## Chạy lại

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory /home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu
```

Mở <http://127.0.0.1:8000/>. Website dùng ES modules nên cần HTTP, không mở trực tiếp bằng `file://`.
