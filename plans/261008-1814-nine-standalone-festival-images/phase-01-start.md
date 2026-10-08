---
title: "Sản xuất, tích hợp và kiểm tra 9 ảnh"
status: todo
---

# Sản xuất, tích hợp và kiểm tra 9 ảnh

## Overview

Thực hiện [plan](./plan.md), bám nguồn `chung-khao/mua-qua-hoi-tu/index.html`, `content.js`, video `assets/video/intro.mp4`, transcript và brief hiện có.

## Requirements

- 9 ảnh riêng biệt, ngang 16:9, không chữ hoặc cấu trúc slide. Mỗi ảnh có chủ thể và hành động rõ.
- Không giả tư liệu sự kiện, địa điểm/đối tác xác nhận hoặc giao dịch hoàn tất.
- Website giữ chữ ngoài ảnh, hỗ trợ đọc trên điện thoại và xem ảnh lớn.

## Files

- Sửa: `scripts/gen_image.py`; `index.html`, `styles.css`, `app.js`, `content.js`, `assets-manifest.js`, `README.md`, `IMAGE-GENERATION-PROMPTS.md` trong microsite.
- Tạo: `image-production/prompts.json`, 9 PNG và 9 WebP, manifest provenance, báo cáo kiểm tra.
- Không sửa `.env`, video, PDF và các PNG slide hồ sơ cũ.

## Implementation Steps

1. Khóa danh sách và prompt 9 ảnh trong plan trước khi gọi API.
2. Chuyển `scripts/gen_image.py` sang brief không chữ; giữ khả năng chọn từng ảnh và đọc khóa an toàn.
3. Sinh ảnh đầu tiên để duyệt phong cách, sau đó sinh đủ 9 ảnh với tên mô tả. Lưu PNG gốc và WebP tối ưu.
4. Xem tất cả ảnh; sửa nếu có chữ, lỗi hình thể hoặc cảnh trùng. Không dùng ảnh cắt video thay sản phẩm mới.
5. Tích hợp gallery 9 ảnh và viewer; cập nhật nội dung, nhãn, alt text và trạng thái tài sản. Sửa tỷ lệ hero.
6. Kiểm tra desktop/mobile, tải media, điều hướng, phóng to, phím Escape, hash, video/phụ đề, lỗi console và liên kết.
7. Cập nhật tài liệu, provenance và báo cáo kết quả. Không commit/push nếu chưa được yêu cầu.

## Todo

- [ ] Tạo và duyệt 9 ảnh không chữ.
- [ ] Tích hợp website.
- [ ] Kiểm tra và cập nhật tài liệu.

## Success Criteria

Đủ các tiêu chí trong plan; báo cáo nêu rõ kiểm tra đã chạy và hạn chế còn lại.

## Rủi ro và rollback

API có thể từ chối/quá thời gian: giữ ảnh đã sinh và manifest, chạy lại đúng ảnh thiếu. Không in response chứa khóa. Ảnh có chữ/lỗi tay: sinh lại cảnh lỗi trước khi đưa lên web. Giữ video và hồ sơ cũ để khôi phục; thay đổi source được kiểm tra qua git diff.
