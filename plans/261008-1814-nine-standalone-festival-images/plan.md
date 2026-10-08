---
title: "9 ảnh không chữ và website Mùa Quả Hội Tụ"
description: "Tạo chín ảnh độc lập qua scripts/gen_image.py, đồng bộ video và tích hợp website."
status: pending
priority: P1
effort: ""
tags: []
created: 2026-10-08
---

# 9 ảnh không chữ và website Mùa Quả Hội Tụ

## Overview

Ngày lập: 08/10/2026. Yêu cầu đã xác nhận: tạo đúng 9 ảnh mới, không có chữ, không phải slide thuyết trình hoặc các mảnh cắt; dùng `scripts/gen_image.py` sau khi có plan, đưa ảnh vào website và hoàn thiện trải nghiệm xem.

Đã đọc website, nội dung proposal và transcript; đã mở web trên Chrome, kiểm tra video intro phát được (45,013 giây, 1280×720) và xem khung hình theo thời gian. Câu chuyện: vùng đất → người trồng → trái ngọt → nếm và hiểu → kết nối. Tông xanh vườn, vàng xoài, hồng thanh long, gỗ và ánh sáng ấm. Đây là festival concept chưa được xác nhận.

## Goals

| # | Goal | Priority |
|---|------|----------|
| 1 | 9 cảnh riêng biệt, hoàn chỉnh, không chữ và không collage | P1 |
| 2 | Cùng ngôn ngữ hình ảnh với video, không bịa sự kiện đã diễn ra | P1 |
| 3 | Đưa 9 ảnh vào gallery và viewer; tiêu đề/chú thích ở HTML | P1 |

## Danh sách 9 ảnh

| Ảnh | Chủ đề | Bố cục | Vai trò trên web |
|---|---|---|---|
| 01 | Nơi vị ngọt bắt đầu | Xoài trên cành, sương và ánh sáng sớm; cận cảnh có chiều sâu vườn | Mở hành trình |
| 02 | Bàn tay giữ nhịp mùa | Người trồng kiểm tra xoài, góc nghiêng trung cảnh | Câu chuyện người trồng |
| 03 | Mỗi hương vị, một câu chuyện | Trái cây trên bàn gỗ, góc ba phần tư, giỏ tre | Hero và sản vật |
| 04 | Một cuộc hội tụ giữa sắc xanh | Toàn cảnh pavilion với quầy gỗ, mái che, lối đi thoáng | Hình dung không gian |
| 05 | Nếm chậm để hiểu sâu | Người hướng dẫn trao đĩa thử vị cho khách trưởng thành | Trải nghiệm giác quan |
| 06 | Mỗi trải nghiệm, một dấu nhớ | Bàn tay đóng dấu hình lá lên hộ chiếu không chữ, góc từ trên | Hộ chiếu Vị Việt |
| 07 | Sáng tạo từ vị bản địa | Workshop chế biến, người hướng dẫn và khách cùng thao tác | Bếp Sáng Tạo |
| 08 | Cuộc gặp mở thêm cơ hội | Người trồng và người mua trò chuyện bên bàn trái cây | Kết nối, không khẳng định giao dịch |
| 09 | Mùa Quả Hội Tụ | Múi quả và lá tạo vòng mở trên nền xanh, sợi vàng rất mảnh | Khép mạch nhận diện |

Prompt đầy đủ: [prompts.json](../../chung-khao/mua-qua-hoi-tu/image-production/prompts.json). Tất cả prompt cấm chữ, chữ số, nhãn, bảng hiệu, logo, watermark, QR, infographic, slide và collage. Tên ảnh không phải nội dung để mô hình viết lên ảnh.

## Phụ thuộc và phạm vi

- Dùng API AI Thực Chiến và model `nano-banana-2` theo công cụ sẵn có của repo. Khóa chỉ đọc từ môi trường hoặc `.env`, không đưa vào log/tài liệu/client.
- Ảnh PNG gốc và WebP dùng trên web nằm ở `chung-khao/mua-qua-hoi-tu/assets/generated/`; lưu prompt/model/ngày tạo trong manifest.
- Không thay video. Giữ đường dẫn hash viewer hiện tại và PDF/PNG hồ sơ cũ, ghi rõ chúng là hồ sơ đề xuất riêng.
- Dùng `plans/` theo yêu cầu AGENTS; toàn bộ tài sản sản xuất và website của vòng thi nằm dưới `chung-khao/`.

## Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | [Sản xuất, tích hợp và kiểm tra](./phase-01-start.md) | Pending |

## Success Criteria

- [ ] Có đúng 9 ảnh AI mới; mỗi ảnh là một cảnh độc lập không chữ, được kiểm tra bằng mắt.
- [ ] `scripts/gen_image.py` là công cụ gọi API, có thể chạy lại theo từng ảnh.
- [ ] Website có gallery 9 ảnh, viewer video + 9 ảnh, phóng to và điều hướng bàn phím.
- [ ] Hero và phần câu chuyện dùng bộ ảnh mới; không kéo giãn ảnh, không tràn trên mobile.
- [ ] Video vẫn phát được, phụ đề vẫn tải; tất cả media/link dùng thực tế không lỗi HTTP.
- [ ] Có ghi chú minh họa AI; PDF đề xuất cũ không bị giới thiệu là bộ 9 ảnh mới.
- [ ] README, brief và manifest khớp tài sản cuối; không lưu secret.

<!-- slug: nine-standalone-festival-images -->
