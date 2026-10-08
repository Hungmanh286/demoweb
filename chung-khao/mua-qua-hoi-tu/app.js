import { slides } from "./content.js";
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
const pageFragments = new Set(["home", "story", "experience", "proposal"]);

let activeIndex = -1;
let lastImageButton = null;
let currentStageImage = null;
let currentVideo = null;

const pad = (value) => String(value).padStart(2, "0");

function make(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
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

  if (slide.transcript?.length) {
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
    readingContent.append(transcript);
  }

  if (slide.notes?.length) {
    const notes = make("aside", "slide-notes");
    notes.setAttribute("aria-label", "Ghi chú của slide");
    notes.append(make("h3", "", "Ghi chú"));
    const list = make("ul", "");
    for (const note of slide.notes) list.append(make("li", "", note));
    notes.append(list);
    readingContent.append(notes);
  }
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
      : "Bản nội dung — chờ ảnh thiết kế";
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
    video.preload = "metadata";
    video.setAttribute("aria-label", `${slide.title} — video intro`);
    if (asset.poster && (!asset.posterStatus || asset.posterStatus === "approved")) video.poster = asset.poster;
    if (asset.captions) {
      const track = make("track", "");
      track.kind = "captions";
      track.srclang = "vi";
      track.label = "Tiếng Việt";
      track.src = asset.captions;
      video.append(track);
    }
    video.addEventListener("error", () => {
      if (activeIndex === slides.indexOf(slide)) {
        media.replaceWith(renderFallback(slide, asset, "Không thể tải video. Bản lời dẫn vẫn ở bên dưới."));
        navigationStatus.textContent = "Video không tải được. Transcript vẫn có thể đọc bên dưới.";
      }
    }, { once: true });
    currentVideo = video;
    media.append(video);
    video.src = asset.src;
    video.load();
    return media;
  }

  const image = make("img", "slide-image");
  image.alt = asset.alt;
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
  if (announce) navigationStatus.textContent = `Slide ${pad(activeIndex + 1)} trên ${pad(slides.length)}: ${slide.title}`;
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
    button.setAttribute("aria-label", `Slide ${pad(index + 1)}: ${slide.title}`);
    button.append(make("span", "thumbnail-number", pad(index + 1)), make("span", "thumbnail-title", slide.title));
    button.addEventListener("click", () => navigate(index));
    fragment.append(button);
  }
  thumbnails.replaceChildren(fragment);
}

function openImageDialog() {
  if (!currentStageImage || !currentStageImage.complete || !currentStageImage.naturalWidth) return;
  lastImageButton = openImageButton;
  const slide = slides[activeIndex];
  dialogImage.src = currentStageImage.currentSrc || currentStageImage.src;
  dialogImage.alt = currentStageImage.alt;
  dialogCaption.textContent = `Slide ${pad(activeIndex + 1)} · ${slide.title}`;
  imageDialog.showModal();
  closeImageButton.focus();
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

  const approvedPngCount = (deliverables.pngSlides || []).filter((file) => file.status === "approved" && file.src).length;
  assetStatusText.textContent = `PDF 10 trang và ${approvedPngCount} PNG đã rà soát · video intro 45 giây đã tích hợp · phim concept mở rộng 60 giây vẫn ở mức storyboard.`;
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
