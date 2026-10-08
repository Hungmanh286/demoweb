#!/usr/bin/env python3
"""Generate the nine 16:9 content slides for the Vietnam Fruit Festival."""

import argparse
import base64
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

import requests


AI_API_BASE = "https://api.thucchien.ai/v1"
MODEL = "nano-banana-2"
REPO_ROOT = Path(__file__).resolve().parents[1]
ENV_FILE = REPO_ROOT / ".env"
DEFAULT_OUTPUT_DIR = REPO_ROOT / "chung-khao" / "assets" / "slide-images"

STYLE = """Thiết kế một slide thuyết trình tiếng Việt hoàn chỉnh, khổ ngang 16:9, chất lượng trình chiếu 1920x1080. Hệ nhận diện thống nhất cho Festival Trái Cây Việt Nam, concept “MÙA QUẢ HỘI TỤ”: xanh vườn #164B35, trắng ngà #FFF7E8, vàng mùa chín #F4C542, hồng thanh long #D93B79, cam quả chín #F58232. Phong cách biên tập hiện đại, giàu cảm xúc, tinh tế, có ảnh minh họa trái cây Việt Nam chân thực và họa tiết lát cắt quả/đường nét vườn cây. Bố cục rõ thứ bậc, khoảng trắng tốt, tương phản cao, chữ sans-serif hỗ trợ dấu tiếng Việt. Đặt chính xác các cụm từ tiếng Việt được yêu cầu, giữ nguyên dấu và chính tả; không tự thêm số liệu, logo, chứng nhận, đối tác, QR hay thông tin sự kiện không được nêu. Đây là đề xuất, không phải sự kiện đã xác nhận. Không thêm viền hoặc mockup màn hình quanh slide."""

SLIDES = [
    {
        "number": 2,
        "title": "Trái ngọt Việt cần một điểm hội tụ.",
        "prompt": """Nội dung slide 2. Bố cục: ảnh vườn trái cây Việt Nam ấm áp chiếm nửa trái; nửa phải là tiêu đề, ba mục tiêu dạng thẻ có icon nhỏ; dải chân trang ghi nhóm hưởng lợi. Chữ cần hiển thị chính xác:
Tiêu đề: “Trái ngọt Việt cần một điểm hội tụ.”
Thông điệp: “Tiềm năng phong phú cần một trải nghiệm quảng bá thống nhất.”
Ba mục tiêu: “Quảng bá bản địa — Đưa câu chuyện vùng trồng và người sản xuất đến gần công chúng”; “Tạo niềm tin — Giúp khách hiểu sản phẩm qua thông tin và trải nghiệm”; “Mở rộng thị trường — Nối khám phá với mua hàng và hợp tác”.
Chân trang: “Người sản xuất · Người tiêu dùng · Doanh nghiệp phân phối · Khách du lịch”.
Ghi chú nhỏ: “Bối cảnh theo yêu cầu đề thi.” Không đưa số liệu.""",
    },
    {
        "number": 3,
        "title": "Mỗi trái ngọt, một câu chuyện.",
        "prompt": """Nội dung slide 3. Kể chuyện bằng ba khung hình nối liền vùng đất — bàn tay người trồng — trái cây đến tay khách; bên dưới là hành trình giá trị dạng mũi tên. Chữ cần hiển thị chính xác:
Tiêu đề: “Mỗi trái ngọt, một câu chuyện.”
Tên concept nổi bật: “MÙA QUẢ HỘI TỤ”.
Ba ý: “Vùng đất — Khám phá xuất xứ, mùa vụ và điều làm nên đặc điểm sản phẩm”; “Người trồng — Gặp những người chăm sóc, thu hoạch và giữ gìn chất lượng”; “Kết nối — Biến hiểu biết và yêu thích thành lựa chọn mua hàng, giới thiệu và hợp tác”.
Hành trình: “Biết xuất xứ → Gặp người trồng → Nếm hương vị → Hiểu sản phẩm → Kết nối”.
Không gắn tên vùng, chứng nhận hoặc đặc tính cho một sản phẩm cụ thể.""",
    },
    {
        "number": 4,
        "title": "Một festival — Năm không gian khám phá.",
        "prompt": """Nội dung slide 4. Tạo infographic ngang với đúng 5 khu được đánh số 1–5, xếp thành một sơ đồ mặt bằng đơn giản nối bằng lối đi. Mỗi khu chỉ xuất hiện một lần. Không thêm khu, nhãn, chú thích hoặc chữ nào khác ngoài nội dung được liệt kê. Dải đầu trang nhấn thông số đề xuất. Chữ cần hiển thị chính xác:
Tiêu đề: “Một festival — Năm không gian khám phá.”
Thông số: “3 ngày · 60–80 gian hàng · 5 khu trải nghiệm”.
Địa bàn: “TP.HCM — địa bàn ưu tiên khảo sát”.
Năm khu: “Bản đồ Mùa Quả”; “Gặp Người Giữ Mùa”; “Phòng Thử Vị Việt”; “Bếp Sáng Tạo”; “Chợ Kết Nối”.
Nguyên tắc: “Luồng khách rõ ràng · Khu thử vị thuận tiện · Khu B2B riêng · Có phương án thời tiết”.
Ghi chú: “Quy mô sơ bộ; điều chỉnh theo mặt bằng, ngân sách và đơn vị tham gia. Sơ đồ minh họa, chưa phải bản vẽ kỹ thuật.”""",
    },
    {
        "number": 5,
        "title": "Đến để nếm — Ở lại để hiểu — Rời đi với kết nối.",
        "prompt": """Nội dung slide 5. Bố cục timeline ba cột Ngày 1, Ngày 2, Ngày 3, mỗi cột có một hình hoạt động nhỏ; dải dưới thể hiện hoạt động xuyên suốt. Chữ cần hiển thị chính xác:
Tiêu đề: “Đến để nếm — Ở lại để hiểu — Rời đi với kết nối.”
“Ngày 1 · Khám phá nguồn cội”: “Bản đồ vùng trồng · Giao lưu nhà vườn · Giới thiệu sản phẩm”.
“Ngày 2 · Đánh thức giác quan”: “Thử vị · Chọn và bảo quản quả · Workshop chế biến”.
“Ngày 3 · Kết nối giá trị”: “Tư vấn mua hàng · Gặp nhà phân phối · Tổng kết hành trình”.
Hoạt động xuyên suốt: “Hộ chiếu Vị Việt · Gian hàng sản phẩm · Điểm chụp ảnh · Gặp gỡ thương mại theo lịch”.
Chú thích cuối: “Lịch là đề xuất; cần xác nhận đối tác và điều kiện vận hành. Trải nghiệm đi cùng thông tin sản phẩm, vệ sinh thực phẩm và hướng dẫn an toàn.”""",
    },
    {
        "number": 6,
        "title": "Hộ chiếu Vị Việt.",
        "prompt": """Nội dung slide 6. Đặt hình hộ chiếu giấy mở, hoàn toàn trống chữ, ở trung tâm; năm con dấu tiếng Việt xếp thành vòng hành trình xung quanh; ba nhóm lợi ích ở chân trang. Không có bảng màu, chú giải màu, từ tiếng Anh, chữ trang trí hay nhãn nào ngoài các cụm từ được yêu cầu bên dưới. Tuyệt đối không dùng các từ “PASSPORT”, “GARDEN”, “IVORY”, “RIPE”, “PITAYA”. Không dùng QR. Chữ cần hiển thị chính xác:
Tiêu đề: “Hộ chiếu Vị Việt.”
Tiểu đề: “Năm dấu — Một hành trình”.
Năm dấu: “Vùng đất — Tìm hiểu xuất xứ”; “Người trồng — Nghe câu chuyện sản xuất”; “Hương vị — Thử và ghi cảm nhận”; “Sáng tạo — Tham gia workshop”; “Kết nối — Lưu sản phẩm, tìm điểm mua hoặc gửi nhu cầu”.
Ba lợi ích: “Khách — Có mục tiêu khám phá và dấu ấn cá nhân”; “Đơn vị sản xuất — Có cơ hội kể chuyện và giới thiệu sâu hơn”; “Ban tổ chức — Hỗ trợ phân luồng và đo mức độ tham gia”.
Ghi chú nhỏ: “Có thể triển khai bằng hộ chiếu giấy hoặc web đơn giản. Quà/ưu đãi, nếu có, theo thể lệ công bố.”""",
    },
    {
        "number": 7,
        "title": "Biến trải nghiệm thành câu chuyện được chia sẻ.",
        "prompt": """Nội dung slide 7. Thiết kế infographic phẳng gồm đúng ba cột TRƯỚC — TRONG — SAU, mỗi cột có một hình minh họa trái cây và khách tham gia. Không tạo mockup điện thoại, bài đăng, giao diện mạng xã hội, thẻ giao diện, hoặc chữ trang trí. Không có bất kỳ chữ tiếng Anh nào. Không lặp nội dung. Chỉ hiển thị các cụm từ tiếng Việt được liệt kê dưới đây; giữ chính xác chính tả và dấu:
Tiêu đề: “Biến trải nghiệm thành câu chuyện được chia sẻ.”
“TRƯỚC — Gợi tò mò”: “Phim intro · Một quả — Một vùng đất — Một người trồng · Giới thiệu trạm hộ chiếu”; mục tiêu “Tìm hiểu và đăng ký khi hệ thống mở”.
“TRONG — Tạo nội dung”: “Creator khám phá · Thử vị · Đóng dấu hộ chiếu · Chia sẻ chuyện nhà vườn”; mục tiêu “Trải nghiệm · Chia sẻ · Khám phá sản phẩm”.
“SAU — Giữ kết nối”: “Video tổng kết · Danh mục đơn vị tham gia · Theo dõi nhu cầu mua hàng”; mục tiêu “Tiếp tục mua và hợp tác”.
Kênh: “Mạng xã hội · Cộng đồng ẩm thực/gia đình · Kênh du lịch · Mạng lưới nhà mua hàng”.
Đo lường: “Đăng ký · Lượt vào cổng · Hoàn thành hộ chiếu · Nội dung do khách tạo · Nhu cầu mua hàng”.
Hashtag: “#MuaQuaHoiTu  #HoChieuViViet”. Không tự đặt KPI.""",
    },
    {
        "number": 8,
        "title": "Bản địa trong câu chuyện — Hiện đại trong hình ảnh.",
        "prompt": """Nội dung slide 8 là một brand board chỉn chu, không phải moodboard tham khảo: có key visual lát cắt trái cây hội tụ, mẫu họa tiết, bảng màu có swatch và mã màu, mẫu typography dễ đọc. Chữ cần hiển thị chính xác:
Tiêu đề: “Bản địa trong câu chuyện — Hiện đại trong hình ảnh.”
Key visual: “Lát cắt trái cây hội tụ thành nhịp mùa, kết hợp đường nét gợi vườn cây và phù sa.”
Bảng màu: “Xanh vườn #164B35”; “Trắng ngà #FFF7E8”; “Vàng mùa chín #F4C542”; “Hồng thanh long #D93B79”; “Cam quả chín #F58232”.
Typography đề xuất: “Be Vietnam Pro”.
Nguyên tắc: “Sản phẩm rõ nét · Con người có vai trò · Màu sắc nhất quán · Nội dung dễ đọc”.
Chỉ dùng hình trái cây và hình khối mới; không đưa logo thương hiệu có thật.""",
    },
    {
        "number": 9,
        "title": "Một câu chuyện — Nhiều điểm chạm.",
        "prompt": """Nội dung slide 9 là trang trình bày ba demo ấn phẩm: poster lớn bên trái, brochure mở ở giữa, thumbnail web desktop/mobile bên phải. Đây là các thiết kế phẳng có thể đọc được, phối cảnh chỉ phụ trợ. Dùng nhãn “DEMO” rõ ràng. Không tạo QR hoặc URL giả. Chữ cần hiển thị chính xác:
Tiêu đề: “Một câu chuyện — Nhiều điểm chạm.”
“POSTER — THU HÚT”: “Festival Trái Cây Việt Nam”; “MÙA QUẢ HỘI TỤ”; “Nếm vị bản địa — Kết nối giá trị Việt.”; “Thời gian và địa điểm: dự kiến”.
“BROCHURE — HƯỚNG DẪN”: “Câu chuyện festival · Năm khu trải nghiệm · Hoạt động · Hộ chiếu Vị Việt · Thông tin tham gia”.
“WEB UI — MỞ RỘNG”: “Xem phim → Khám phá festival → Thử hộ chiếu → Xem proposal”.
Chân trang: “Tất cả điểm chạm cùng kể câu chuyện Mùa Quả Hội Tụ.”""",
    },
    {
        "number": 10,
        "title": "Từ cuộc hội tụ đến giá trị bền lâu.",
        "prompt": """Nội dung slide 10 là slide kết đề xuất. Dàn trang thành đúng ba dải ngang: (1) tiêu đề và timeline bốn bước, (2) hai cột “Nguồn lực” và “Điều kiện thành công”, (3) một dải cuối có bước tiếp theo và câu kết. Mỗi mục chỉ xuất hiện một lần. Không tạo thêm tiêu đề phụ, bảng lặp, khối lặp hoặc nội dung nào khác. Chữ lớn, ngắn, dễ đọc, hoàn toàn bằng tiếng Việt.
Tiêu đề: “Từ cuộc hội tụ đến giá trị bền lâu.”
Timeline: “1 Khảo sát — Địa điểm, thời gian, nguồn cung, pháp lý”; “2 Hoàn thiện — Quy mô, đối tác, mặt bằng, dự toán”; “3 Sản xuất — Nhận diện, video, ấn phẩm, website”; “4 Vận hành — An toàn, trải nghiệm, kết nối, đánh giá”.
Cột trái “Nguồn lực”: “Hạ tầng · Gian hàng · Hoạt động · Nhân sự · Truyền thông · An toàn · Dự phòng”.
Cột phải “Điều kiện thành công”: “Nguồn cung đúng mùa · Đối tác xác nhận · An toàn thực phẩm · Phương án thời tiết · Đo lường minh bạch”.
Bước tiếp theo: “Thống nhất concept → Phê duyệt khảo sát → Hoàn thiện kế hoạch và dự toán”.
Câu kết: “Đưa giá trị phía sau trái cây đến gần thị trường.”""",
    },
]


def load_env_file(path: Path) -> None:
    """Load simple KEY=VALUE entries without overriding exported environment values."""
    if not path.is_file():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        stripped = line.strip()
        if not stripped or stripped.startswith("#"):
            continue
        if stripped.startswith("export "):
            stripped = stripped[7:].lstrip()
        key, separator, value = stripped.partition("=")
        key = key.strip()
        if not separator or not re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*", key):
            continue
        value = value.strip()
        if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
            value = value[1:-1]
        else:
            value = re.split(r"\s+#", value, maxsplit=1)[0].rstrip()
        os.environ.setdefault(key, value)


def generate_image(api_key: str, prompt: str, output_path: Path) -> None:
    response = requests.post(
        f"{AI_API_BASE}/images/generations",
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}",
        },
        json={"model": MODEL, "prompt": prompt, "aspect_ratio": "16:9"},
        timeout=(15, 240),
    )
    response.raise_for_status()
    result = response.json()
    images = result.get("data")
    if not isinstance(images, list) or not images or not images[0].get("b64_json"):
        raise ValueError("API response did not contain a base64 image in data[0].b64_json")

    image_data = base64.b64decode(images[0]["b64_json"], validate=True)
    if not image_data.startswith(b"\x89PNG\r\n\x1a\n"):
        raise ValueError("API response image is not a PNG")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    temp_path = output_path.with_suffix(".png.tmp")
    temp_path.write_bytes(image_data)
    temp_path.replace(output_path)


def save_manifest(path: Path, generated: list[dict]) -> None:
    manifest = {
        "concept": "Festival Trái Cây Việt Nam — Mùa Quả Hội Tụ",
        "model": MODEL,
        "aspect_ratio": "16:9",
        "generated_at_utc": datetime.now(timezone.utc).isoformat(),
        "assets": generated,
    }
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def parse_slide_numbers(value: str) -> list[int]:
    try:
        numbers = [int(part.strip()) for part in value.split(",")]
    except ValueError as error:
        raise argparse.ArgumentTypeError("Use comma-separated slide numbers from 2 to 10") from error
    if not numbers or any(number not in range(2, 11) for number in numbers):
        raise argparse.ArgumentTypeError("Slide numbers must be from 2 to 10")
    if len(set(numbers)) != len(numbers):
        raise argparse.ArgumentTypeError("Slide numbers must not repeat")
    return numbers


def main() -> int:
    parser = argparse.ArgumentParser(description="Generate the nine content slides (slides 2–10).")
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Directory for PNGs (default: {DEFAULT_OUTPUT_DIR.relative_to(REPO_ROOT)})",
    )
    parser.add_argument(
        "--slides",
        type=parse_slide_numbers,
        help="Comma-separated slide numbers to generate, for example 6,7,10 (default: all 2–10)",
    )
    args = parser.parse_args()

    load_env_file(ENV_FILE)
    api_key = os.environ.get("THUCCHIEN_API_KEY", "").strip()
    if not api_key:
        print(f"THUCCHIEN_API_KEY is missing or empty in {ENV_FILE}", file=sys.stderr)
        return 2

    output_dir = args.output_dir if args.output_dir.is_absolute() else REPO_ROOT / args.output_dir
    manifest_path = output_dir / "manifest.json"
    existing_assets = {}
    if manifest_path.is_file():
        try:
            for asset in json.loads(manifest_path.read_text(encoding="utf-8")).get("assets", []):
                existing_assets[asset["slide"]] = asset
        except (json.JSONDecodeError, KeyError, TypeError):
            print(f"Could not read existing manifest: {manifest_path}", file=sys.stderr)
            return 2

    slides_to_generate = set(args.slides) if args.slides else {slide["number"] for slide in SLIDES}

    for slide in SLIDES:
        if slide["number"] not in slides_to_generate:
            continue
        output_path = output_dir / f"slide-{slide['number']:02}.png"
        prompt = f"{STYLE}\n\n{slide['prompt']}"
        try:
            print(f"Generating slide {slide['number']}/10: {slide['title']}", flush=True)
            generate_image(api_key, prompt, output_path)
        except (requests.RequestException, ValueError, KeyError, json.JSONDecodeError) as error:
            message = str(error).replace(api_key, "[REDACTED]")
            if isinstance(error, requests.HTTPError) and error.response is not None:
                body = error.response.text[:1000].replace(api_key, "[REDACTED]")
                message = f"HTTP {error.response.status_code}: {body}"
            print(f"Failed to generate slide {slide['number']}: {message}", file=sys.stderr)
            return 1

        existing_assets[slide["number"]] = {
            "slide": slide["number"],
            "title": slide["title"],
            "file": output_path.name,
            "prompt": prompt,
        }
        save_manifest(manifest_path, sorted(existing_assets.values(), key=lambda asset: asset["slide"]))
        print(f"Saved {output_path}", flush=True)

    print(f"Generated {len(slides_to_generate)} slide images in {output_dir}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
