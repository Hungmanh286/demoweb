import { slides, imageStories } from "./content.js";
import { assetsBySlide, deliverables } from "./assets-manifest.js";

const stage = document.getElementById("presentation");
const thumbnails = document.getElementById("thumbnail-track");
const previousButton = document.getElementById("previous-slide");
const nextButton = document.getElementById("next-slide");
const position = document.getElementById("slide-position");
const controlTitle = document.getElementById("control-title");
const openImageButton = document.getElementById("open-image");
const readingSummary = document.getElementById("reading-summary");
const readingContent = document.getElementById("slide-reading-content");
const navigationStatus = document.getElementById("navigation-status");
const imageDialog = document.getElementById("image-dialog");
const dialogImage = document.getElementById("dialog-image");
const dialogCaption = document.getElementById("dialog-caption");
const closeImageButton = document.getElementById("close-image");
const pdfLink = document.getElementById("pdf-link");
const pngFiles = document.getElementById("png-files");
const pngFileLinks = document.getElementById("png-file-links");
const assetStatusText = document.getElementById("asset-status-text");
const pageFragments = new Set(["home", "intro-video", "story", "experience", "gallery", "proposal"]);

let activeIndex = -1;
let lastImageButton = null;
let currentStageImage = null;
let currentVideo = null;
let currentVideoObserver = null;

const pad = (value) => String(value).padStart(2, "0");

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function appendTranscript(container, slide) {
  if (!slide.transcript?.length) return;

  const transcript = make("section", "transcript");
  transcript.setAttribute("aria-labelledby", "transcript-title");
  transcript.append(make("h3", "", slide.transcriptTitle || "Lời dẫn concept"));
  transcript.querySelector("h3").id = "transcript-title";
  const lines = make("ol", "transcript-lines");
  for (const line of slide.transcript) {
    const item = make("li", "");
    item.append(make("span", "transcript-time", line.time), make("p", "", line.text));
    lines.append(item);
  }
  transcript.append(lines);
  container.append(transcript);
}

function appendNotes(container, notes) {
  if (!notes?.length) return;

  const aside = make("aside", "slide-notes");
  aside.setAttribute("aria-label", "Ghi chú của slide");
  aside.append(make("h3", "", "Ghi chú"));
  const list = make("ul", "");
  for (const note of notes) list.append(make("li", "", note));
  aside.append(list);
  container.append(aside);
}

function renderReading(slide) {
  readingSummary.textContent = slide.summary;
  readingContent.replaceChildren();

  for (const item of slide.sections) {
    const article = make("article", "reading-section");
    article.append(make("h3", "", item.heading));
    if (item.body) article.append(make("p", "", item.body));
    if (item.bullets?.length) {
      const list = make("ul", "");
      for (const bullet of item.bullets) list.append(make("li", "", bullet));
      article.append(list);
    }
    readingContent.append(article);
  }

  appendTranscript(readingContent, slide);
  appendNotes(readingContent, slide.notes);
}

function renderFallback(slide, asset, errorMessage = "") {
  const isVideo = slide.type === "video";
  const fallback = make("article", `slide-sheet${isVideo ? " slide-sheet-video" : ""}`);
  fallback.setAttribute("aria-label", `${slide.title}, ${isVideo ? "video intro" : "bản nội dung đang chờ ảnh thiết kế"}`);

  const copy = make("div", "stage-copy");
  const label = isVideo
    ? asset?.status === "approved" ? "Video intro 45 giây" : "Video intro đang được sản xuất"
    : asset?.status === "review"
      ? "Ảnh đang được rà soát"
      : "Câu chuyện — ảnh chưa sẵn sàng";
  copy.append(make("p", "stage-eyebrow", label));
  const title = make("h2", "stage-title", slide.title);
  copy.append(title, make("p", "stage-summary", slide.summary));
  if (isVideo) {
    copy.append(make("p", "stage-tagline", "Nếm vị bản địa — Kết nối giá trị Việt"));
  }
  if (errorMessage) copy.append(make("p", "stage-error", errorMessage));

  const motif = make("div", "fruit-motif");
  motif.setAttribute("aria-hidden", "true");
  motif.append(make("span", "fruit-motif-core"));
  fallback.append(copy, motif);
  return fallback;
}

function renderApprovedMedia(slide, asset) {
  const media = make("div", "approved-media");
  if (slide.type === "video") {
    const video = make("video", "slide-video");
    video.controls = true;
    video.playsInline = true;
    video.preload = "none";
    video.setAttribute("aria-label", `${slide.title} — video intro`);
    if (asset.poster && (!asset.posterStatus || asset.posterStatus === "approved")) video.poster = asset.poster;
    let sourceAssigned = false;
    let captionsTrack = null;
    if (asset.captions) {
      captionsTrack = make("track", "");
      captionsTrack.kind = "captions";
      captionsTrack.srclang = "vi";
      captionsTrack.label = "Tiếng Việt";
      video.append(captionsTrack);
    }
    const loadSource = () => {
      if (sourceAssigned || activeIndex !== slides.indexOf(slide) || !video.isConnected) return;
      sourceAssigned = true;
      video.preload = "metadata";
      if (captionsTrack) captionsTrack.src = asset.captions;
      video.src = asset.src;
      video.load();
      currentVideoObserver?.disconnect();
      currentVideoObserver = null;
    };
    video.addEventListener("error", () => {
      if (activeIndex === slides.indexOf(slide)) {
        media.replaceWith(renderFallback(slide, asset, "Không thể tải video. Bản lời dẫn vẫn ở bên dưới."));
        navigationStatus.textContent = "Video không tải được. Transcript vẫn có thể đọc bên dưới.";
      }
    }, { once: true });
    currentVideo = video;
    media.append(video);
    if ("IntersectionObserver" in window) {
      currentVideoObserver = new IntersectionObserver((entries) => {
        if (entries.some((entry) => entry.isIntersecting)) loadSource();
      });
      currentVideoObserver.observe(media);
      video.addEventListener("pointerdown", loadSource, { once: true });
    } else {
      loadSource();
    }
    return media;
  }

  const image = make("img", "slide-image");
  image.alt = asset.alt;
  if (asset.width) image.width = asset.width;
  if (asset.height) image.height = asset.height;
  image.decoding = "async";
  image.loading = "eager";
  image.addEventListener("load", () => {
    if (image.naturalWidth > 0 && activeIndex === slides.indexOf(slide)) {
      currentStageImage = image;
      openImageButton.hidden = false;
      openImageButton.disabled = false;
    }
  }, { once: true });
  image.addEventListener("error", () => {
    if (activeIndex === slides.indexOf(slide)) {
      media.replaceWith(renderFallback(slide, asset, "Không thể tải ảnh. Nội dung đầy đủ vẫn ở bên dưới."));
      currentStageImage = null;
      openImageButton.hidden = true;
      navigationStatus.textContent = "Ảnh không tải được. Nội dung tương đương vẫn có thể đọc bên dưới.";
    }
  }, { once: true });
  media.append(image);
  image.src = asset.src;
  return media;
}

function renderStage(slide) {
  const asset = assetsBySlide[slide.id];
  currentVideoObserver?.disconnect();
  currentVideoObserver = null;
  currentStageImage = null;
  currentVideo = null;
  openImageButton.hidden = true;
  openImageButton.disabled = true;

  if (asset?.status === "approved" && asset.src) {
    stage.replaceChildren(renderApprovedMedia(slide, asset));
  } else {
    stage.replaceChildren(renderFallback(slide, asset));
  }
}

function setHash(slide, mode) {
  if (mode === "preserve") return;
  const hash = `#${slide.id}`;
  if (location.hash === hash) return;
  if (mode === "push") history.pushState({ slide: slide.id }, "", hash);
  else history.replaceState({ slide: slide.id }, "", hash);
}

function closeDialogAndRestoreFocus() {
  if (imageDialog.open) imageDialog.close();
  if (lastImageButton && !lastImageButton.hidden && !lastImageButton.disabled) lastImageButton.focus();
}

function navigate(index, { historyMode = "push", announce = true } = {}) {
  const nextIndex = Math.max(0, Math.min(slides.length - 1, index));
  const previousSlide = slides[activeIndex];
  if (nextIndex === activeIndex && stage.childElementCount) {
    setHash(slides[nextIndex], "replace");
    return;
  }

  if (currentVideo && previousSlide?.id !== slides[nextIndex].id) currentVideo.pause();
  if (imageDialog.open) closeDialogAndRestoreFocus();

  activeIndex = nextIndex;
  const slide = slides[activeIndex];
  renderStage(slide);
  renderReading(slide);
  const currentNumber = make("span", "", pad(activeIndex + 1));
  const divider = make("span", "", "/");
  divider.setAttribute("aria-hidden", "true");
  position.replaceChildren(currentNumber, document.createTextNode(" "), divider, document.createTextNode(" "), make("span", "", pad(slides.length)));
  controlTitle.textContent = slide.title;
  previousButton.disabled = activeIndex === 0;
  nextButton.disabled = activeIndex === slides.length - 1;
  thumbnails.querySelectorAll("button").forEach((button, buttonIndex) => {
    if (buttonIndex === activeIndex) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  });
  setHash(slide, historyMode);
  if (announce) navigationStatus.textContent = `${activeIndex === 0 ? "Video" : `Ảnh ${pad(activeIndex)}`} trên hành trình: ${slide.title}`;
}

function readHash() {
  const match = /^#(slide-\d{2})$/.exec(location.hash);
  if (!match && pageFragments.has(location.hash.slice(1))) return;
  const index = match ? slides.findIndex((slide) => slide.id === match[1]) : -1;
  if (index === -1) {
    navigate(0, { historyMode: "replace", announce: false });
    return;
  }
  navigate(index, { historyMode: "replace", announce: true });
  document.getElementById("proposal")?.scrollIntoView({ block: "start" });
}

function buildThumbnails() {
  const fragment = document.createDocumentFragment();
  for (const [index, slide] of slides.entries()) {
    const button = make("button", "thumbnail");
    button.type = "button";
    const label = index === 0 ? "Video" : `Ảnh ${pad(index)}`;
    button.setAttribute("aria-label", `${label}: ${slide.title}`);
    const asset = assetsBySlide[slide.id];
    const preview = make("img", "thumbnail-preview");
    preview.src = index === 0 ? asset.poster : asset.src;
    preview.alt = "";
    preview.loading = "lazy";
    preview.width = 160;
    preview.height = 90;
    button.append(preview, make("span", "thumbnail-number", label), make("span", "thumbnail-title", slide.title));
    button.addEventListener("click", () => navigate(index));
    fragment.append(button);
  }
  thumbnails.replaceChildren(fragment);
}

function openImageDialog() {
  if (!currentStageImage || !currentStageImage.complete || !currentStageImage.naturalWidth) return;
  lastImageButton = openImageButton;
  const slide = slides[activeIndex];
  showImage(slide, openImageButton);
}

function showImage(story, trigger) {
  const asset = assetsBySlide[story.id];
  lastImageButton = trigger;
  dialogImage.src = asset.original || asset.src;
  dialogImage.alt = asset.alt;
  dialogCaption.textContent = story.title;
  imageDialog.showModal();
  closeImageButton.focus();
}

function buildGallery() {
  const gallery = document.getElementById("story-gallery");
  const fragment = document.createDocumentFragment();
  for (const [index, story] of imageStories.entries()) {
    const asset = assetsBySlide[story.id];
    const article = make("article", "gallery-story");
    const button = make("button", "gallery-image-button");
    button.type = "button";
    button.setAttribute("aria-label", `Xem ảnh lớn: ${story.title}`);
    button.setAttribute("aria-haspopup", "dialog");
    button.disabled = true;
    const image = make("img", "gallery-image");
    image.alt = asset.alt;
    image.width = asset.width || 1376;
    image.height = asset.height || 768;
    image.loading = "lazy";
    image.decoding = "async";
    const error = make("p", "gallery-error", "Ảnh chưa tải được. Bạn vẫn có thể đọc câu chuyện bên dưới.");
    error.hidden = true;
    image.addEventListener("load", () => { button.disabled = false; }, { once: true });
    image.addEventListener("error", () => { error.hidden = false; }, { once: true });
    image.src = asset.src;
    button.append(image, make("span", "gallery-open-label", "Xem ảnh lớn"));
    button.addEventListener("click", () => showImage(story, button));
    const copy = make("div", "gallery-story-copy");
    copy.append(make("span", "gallery-number", pad(index + 1)), make("h3", "", story.title), make("p", "", story.summary));
    const link = make("a", "gallery-story-link", "Đọc câu chuyện");
    link.href = `#${story.id}`;
    copy.append(link);
    article.append(button, error, copy);
    fragment.append(article);
  }
  gallery.replaceChildren(fragment);
}

function onPresentationKeydown(event) {
  if (imageDialog.open || !stage.contains(event.target)) return;
  if (event.target.closest("button, a, input, textarea, select, video, audio, [contenteditable='true']")) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === "ArrowRight") {
    event.preventDefault();
    navigate(activeIndex + 1);
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    navigate(activeIndex - 1);
  } else if (event.key === "Home") {
    event.preventDefault();
    navigate(0);
  } else if (event.key === "End") {
    event.preventDefault();
    navigate(slides.length - 1);
  }
}

function configureDeliverables() {
  const pdf = deliverables.pdf;
  if (pdf?.src) {
    pdfLink.href = pdf.src;
    pdfLink.title = pdf.rightsNote || "PDF hiện có trong thư mục";
    pdfLink.hidden = false;
  } else {
    pdfLink.hidden = true;
    pdfLink.removeAttribute("href");
  }

  const pngSlides = deliverables.pngSlides || [];
  const availablePngs = pngSlides.filter((file) => file.src);
  if (availablePngs.length) {
    const links = document.createDocumentFragment();
    for (const file of availablePngs) {
      const link = make("a", "", `${file.title} PNG`);
      link.href = file.src;
      links.append(link);
    }
    pngFileLinks.replaceChildren(links);
    pngFiles.hidden = false;
  } else {
    pngFiles.hidden = true;
    pngFileLinks.replaceChildren();
  }

  assetStatusText.textContent = "9 ảnh không chữ và video intro 45 giây · PDF/PNG là hồ sơ đề xuất riêng.";
}

previousButton.addEventListener("click", () => navigate(activeIndex - 1));
nextButton.addEventListener("click", () => navigate(activeIndex + 1));
openImageButton.addEventListener("click", openImageDialog);
closeImageButton.addEventListener("click", closeDialogAndRestoreFocus);
imageDialog.addEventListener("close", () => {
  dialogImage.removeAttribute("src");
  if (lastImageButton && !lastImageButton.hidden && !lastImageButton.disabled) lastImageButton.focus();
});
stage.addEventListener("keydown", onPresentationKeydown);
window.addEventListener("popstate", readHash);
window.addEventListener("hashchange", readHash);

buildThumbnails();
buildGallery();
configureDeliverables();
const initialMatch = /^#(slide-\d{2})$/.exec(location.hash);
const initialIndex = initialMatch ? slides.findIndex((slide) => slide.id === initialMatch[1]) : -1;
if (initialIndex < 0) {
  const isPageFragment = pageFragments.has(location.hash.slice(1));
  navigate(0, { historyMode: isPageFragment ? "preserve" : "replace", announce: false });
} else {
  navigate(initialIndex, { historyMode: "replace", announce: false });
  document.getElementById("proposal")?.scrollIntoView({ block: "start" });
}
