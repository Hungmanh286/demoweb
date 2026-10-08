const awaiting = (alt) => ({
  status: "pending",
  src: null,
  poster: null,
  captions: null,
  alt,
  width: null,
  height: null,
  rightsNote: "Media cuối chưa được bàn giao và duyệt quyền sử dụng."
});

export const assetsBySlide = {
  "slide-01": {
    ...awaiting("Video intro về hành trình từ vùng đất và người trồng đến Mùa Quả Hội Tụ"),
    status: "approved", src: "assets/video/intro.mp4", poster: "assets/video/intro-poster.png",
    captions: "assets/video/intro.vi.vtt", width: 1280, height: 720,
    rightsNote: "Cảnh và lời dẫn được tạo qua AI Thực Chiến; ambience trích từ audio Veo, nhạc được sáng tác bằng script nội bộ và hậu kỳ bằng Remotion. Concept không phải tư liệu sự kiện thực tế."
  },
  "slide-02": {
    ...awaiting("Slide thiết kế về bối cảnh, mục tiêu và nhóm hưởng lợi"),
    status: "approved", src: "output/png/slide-02.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; nội dung không thêm số liệu chưa kiểm chứng."
  },
  "slide-03": {
    ...awaiting("Slide thiết kế về vùng đất, người trồng và hành trình giá trị"),
    status: "approved", src: "output/png/slide-03.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát. Ảnh minh họa vùng trồng có ghi nguồn trong IMAGE_CREDITS.md."
  },
  "slide-04": {
    ...awaiting("Slide thiết kế sơ đồ năm không gian trải nghiệm đề xuất"),
    status: "approved", src: "output/png/slide-04.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; quy mô và sơ đồ địa điểm được ghi rõ là đề xuất."
  },
  "slide-05": {
    ...awaiting("Slide thiết kế lịch trải nghiệm ba ngày"),
    status: "approved", src: "output/png/slide-05.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; lịch hoạt động được ghi rõ là đề xuất."
  },
  "slide-06": {
    ...awaiting("Slide thiết kế Hộ chiếu Vị Việt và năm dấu trải nghiệm"),
    status: "approved", src: "output/png/slide-06.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; hộ chiếu được ghi rõ là concept/demo."
  },
  "slide-07": {
    ...awaiting("Slide thiết kế kế hoạch truyền thông trước, trong và sau festival"),
    status: "approved", src: "output/png/slide-07.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; phim concept mở rộng 60 giây là storyboard riêng, khác video intro 45 giây ở slide 1."
  },
  "slide-08": {
    ...awaiting("Slide thiết kế hệ nhận diện Mùa Quả Hội Tụ"),
    status: "approved", src: "output/png/slide-08.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; Be Vietnam Pro được đề xuất nhưng chưa đóng gói."
  },
  "slide-09": {
    ...awaiting("Slide thiết kế poster, brochure và giao diện web"),
    status: "approved", src: "output/png/slide-09.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; thông tin ngày/địa điểm là dự kiến, không có QR giả."
  },
  "slide-10": {
    ...awaiting("Slide thiết kế lộ trình, nguồn lực và bước tiếp theo"),
    status: "approved", src: "output/png/slide-10.png", width: 1600, height: 900,
    rightsNote: "PNG 16:9 đã rà soát; ngân sách, đối tác và lộ trình đều được ghi là đề xuất."
  }
};

export const referenceAssets = [
  {
    src: "assets/fruit-market.jpg",
    width: 1800,
    height: 2700,
    status: "approved",
    rightsNote: "Ảnh minh họa Unsplash License; tác giả và trang nguồn có trong IMAGE_CREDITS.md."
  },
  {
    src: "assets/orchard.jpg",
    width: 1800,
    height: 1200,
    status: "approved",
    rightsNote: "Ảnh minh họa Unsplash License; tác giả và trang nguồn có trong IMAGE_CREDITS.md."
  },
  {
    src: "assets/mangoes.jpg",
    width: 1600,
    height: 1067,
    status: "approved",
    rightsNote: "Ảnh tham khảo trên Unsplash License, không dùng trong PDF/slide."
  }
];

export const deliverables = {
  pdf: {
    src: "output/pdf/mua-qua-hoi-tu.pdf",
    status: "approved",
    rightsNote: "PDF 10 trang, khổ ngang 16:9, đã mở và rà soát từng trang."
  },
  pngArchive: {
    src: null,
    status: "pending",
    rightsNote: "Chưa có file nén PNG; các trang PNG hiện có được liệt kê riêng bên dưới."
  },
  pngSlides: Array.from({ length: 10 }, (_, index) => ({
    src: `output/png/slide-${String(index + 1).padStart(2, "0")}.png`,
    status: "approved",
    title: `Slide ${String(index + 1).padStart(2, "0")}`
  }))
};
