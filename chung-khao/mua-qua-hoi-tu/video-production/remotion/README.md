# Remotion · Festival Trái Cây Việt Nam

Project dựng video intro 45 giây cho proposal “Việt Nam — Mùa Quả Hội Tụ”. Đây là source nội bộ để chỉnh timeline, hiệu ứng, lời dẫn và nhạc; website chỉ tải bản MP4 đã render trong `../../assets/video/intro.mp4`.

## Render

Từ thư mục này, cài dependencies nếu cần rồi chạy:

```bash
npx remotion render FestivalIntro ../../assets/video/intro.mp4 --codec=h264 --timeout=120000
```

Composition dùng năm source clips, một khung trái cây tĩnh có chuyển động đẩy nhẹ, voice MP3 theo từng cảnh, score gốc và một track ambience riêng trích từ audio Veo. Scene 4 giữ một khung hình một giây; scene 6 dừng trên key visual trong ba giây cuối. Sau khi sửa thời điểm lời dẫn, cập nhật WebVTT/SRT và chạy lại `python3 ../scripts/package_audio.py` để làm mới các file audio bàn giao.

## Chỉnh sửa

- `src/FestivalIntro.tsx`: scene timing, thread graphic, end card, mix nhạc/lời dẫn.
- `src/Composition.tsx`: composition 1280×720, 30 fps, 45 giây.
- `public/media/`: source clip, keyframe, voice và original score.

Cảnh vùng trồng và không gian festival là minh họa ý tưởng tạo bằng AI; end card nêu rõ đây không phải tư liệu sự kiện đã diễn ra.
