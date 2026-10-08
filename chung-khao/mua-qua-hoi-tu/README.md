# Việt Nam — Mùa Quả Hội Tụ

Microsite concept Festival Trái Cây Việt Nam của Tri Team, mở đầu bằng câu chuyện và hình ảnh minh họa; bên dưới là viewer hồ sơ đúng 10 slide: slide 1 là video intro 45 giây, slide 2–10 là ảnh PNG thiết kế. Đây là hồ sơ đề xuất, chưa phải thông báo sự kiện đã xác nhận.

## Chạy website

```bash
python3 -m http.server 8000 --bind 127.0.0.1 --directory /home/hungmanh/Documents/aitc2026-team-463-tri-team/chung-khao/mua-qua-hoi-tu
```

Mở <http://127.0.0.1:8000/>. Cần HTTP để trình duyệt nạp ES modules; không mở trực tiếp bằng `file://`. Microsite và viewer không cần npm, build step, API hoặc kết nối ngoài.

## Deploy lên Vercel

Repo có `vercel.json` ở thư mục gốc. Khi import `Hungmanh286/demoweb` vào Vercel, giữ **Root Directory** là `.` và để Vercel dùng cấu hình repo. Build chạy `node scripts/build-vercel.mjs`, xuất site tĩnh vào `dist/`; không cần API key, biến môi trường hay framework preset. Script chỉ đóng gói trang microsite, video intro, ảnh, PDF và PNG slide; không đưa source dựng video hoặc cấu hình cục bộ vào output.

## Điều khiển và media

- Nút Trước/Sau và dải thumbnail chuyển giữa các slide; URL hỗ trợ `#slide-01` đến `#slide-10`, Back/Forward khôi phục vị trí.
- Khi focus ở vùng trình chiếu, dùng ArrowLeft/ArrowRight, Home và End.
- Video dùng native controls, không autoplay, được nạp khi mở slide 1 và dừng khi rời slide. Bật nút CC để xem phụ đề tiếng Việt; transcript đầy đủ ở phần đọc bên dưới.
- Ảnh chỉ có nút mở lớn sau khi ảnh tải thành công. Bản nội dung tương đương luôn đọc được dưới stage.
- Lịch, địa điểm, quy mô, đối tác và ngân sách trong proposal vẫn là đề xuất hoặc cần xác nhận.

## File chính

- `index.html`: hero microsite có player video intro 45 giây và phụ đề, phần câu chuyện, trải nghiệm, ảnh demo, viewer proposal và transcript.
- `styles.css`: hệ màu/chữ, bố cục responsive, focus và reduced motion.
- `app.js`: điều hướng slide/hash, render văn bản/media, lifecycle video, lỗi tải và dialog.
- `content.js`: nội dung 10 slide, ghi chú và transcript; nguồn chuẩn mà app nạp.
- `IMAGE-GENERATION-PROMPTS.md`: brief và prompt tạo ảnh chi tiết cho các vị trí trên website; ảnh không có chữ để giữ phần copy riêng.
- `IMAGE_CREDITS.md`: nguồn ảnh Unsplash và giới hạn sử dụng ảnh minh họa.
- `proposal-content.js`: đường dẫn tương thích cũ, re-export `content.js`.
- `assets-manifest.js`: mapping media, trạng thái, kích thước, ghi chú quyền sử dụng và deliverable.
- `assets/video/intro.mp4`: video 1280×720, 45 giây, lời dẫn, nhạc và ambience được mix riêng.
- `assets/video/intro-poster.png`: key visual có tiêu đề, dùng làm poster video và ảnh bìa PNG.
- `assets/video/intro.vi.vtt` và `intro.vi.srt`: phụ đề tiếng Việt; `transcript.vi.txt`: transcript đầy đủ.
- `assets/video/voiceover.mp3`, `music-original.mp3`, `sound-effects.mp3`: các track audio bàn giao riêng.
- `assets/video/storyboard-ai.json`, `references/`: cốt truyện API sinh, ảnh tham chiếu nhân vật và sáu keyframe.
- `output/pdf/` và `output/png/`: PDF 10 trang và mười PNG 1600×900.
- `video-production/`: storyboard, prompt, source clips, voice, score và project Remotion để chỉnh sửa/render lại video.

## Render lại video

Trong thư mục `video-production/remotion/`, sau khi cài dependencies của project:

```bash
npx remotion render FestivalIntro ../../assets/video/intro.mp4 --codec=h264 --timeout=120000
```

Chạy `python3 ../scripts/package_audio.py` từ thư mục `video-production/remotion/` để dựng lại các track audio riêng, rồi render video. Composition dùng năm clip, một keyframe trái cây, voice riêng theo cảnh, nhạc gốc và ambience trích từ audio Veo. Chỉnh timeline hoặc lời dẫn thì cập nhật lại WebVTT và SRT tương ứng. Video có cảnh minh họa tạo bằng AI; end card và nội dung slide nêu rõ đây không phải tư liệu sự kiện thực tế.

## Trạng thái tài sản

Các slide PNG và PDF đang được ghi `approved` trong manifest. Video intro được dựng từ các source AI trong `video-production/` và tích hợp trong viewer; phim concept mở rộng 60 giây trên slide 7 vẫn là một storyboard riêng. Ba JPG tham khảo trong `assets/` không được dùng làm slide. Chưa có file nén PNG; `pngArchive.src` giữ `null`, nên không hiện liên kết tải giả.

Xem kết quả kiểm tra và giới hạn còn lại tại `QA-REPORT.md`. Không có analytics, thu thập dữ liệu, API key hay request mặc định ra ngoài loopback.
