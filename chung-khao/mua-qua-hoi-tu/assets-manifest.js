import { imageStories } from "./content.js";

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
  ...Object.fromEntries(imageStories.map((story) => [story.id, {
    status: "approved",
    src: `assets/generated/${story.imageId}.webp`,
    original: `assets/generated/${story.imageId}.png`,
    alt: story.alt,
    width: 1376,
    height: 768,
    rightsNote: "Hình minh họa concept được tạo bằng AI Thực Chiến với nano-banana-2; không phải tư liệu sự kiện thực tế. Prompt và provenance nằm trong assets/generated/manifest.json."
  }]))
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
