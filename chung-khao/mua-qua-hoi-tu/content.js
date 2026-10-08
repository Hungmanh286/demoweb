const section = (heading, body = "", bullets = []) => ({ heading, body, bullets });

export const proposalSlides = [
  {
    id: "slide-01", title: "Từ một vùng đất đến một cuộc hội tụ", type: "video",
    summary: "Video intro 45 giây dẫn từ vùng đất và bàn tay người trồng đến cuộc hội tụ kết nối những giá trị trái cây Việt.",
    sections: [
      section("Tên festival", "Festival Trái Cây Việt Nam — Việt Nam, Mùa Quả Hội Tụ."),
      section("Thông điệp", "Nếm vị bản địa — Kết nối giá trị Việt."),
      section("Câu chuyện", "Từ sự chăm chút trên mỗi vùng đất, qua bàn tay người trồng và hương vị trái chín, đến một cuộc hội tụ kết nối người trồng, người thưởng thức và những cơ hội mới."),
      section("Ghi chú hình ảnh", "Các cảnh vùng trồng và festival là hình ảnh minh họa ý tưởng được tạo bằng AI; không phải tư liệu của sự kiện thực tế. Chữ tiếng Việt được thêm ở hậu kỳ.")
    ],
    notes: ["Hồ sơ đề xuất; sự kiện chưa được xác nhận.", "Video 16:9 dài 45 giây, có lời dẫn, phụ đề và keyframe bìa.", "Hình ảnh minh họa bằng AI; không dùng logo đối tác hoặc nhân vật chưa được phép."],
    transcriptTitle: "Transcript video intro · 45 giây",
    transcript: [
      { time: "00:00–00:03", text: "Một trái ngọt bắt đầu từ đâu?" },
      { time: "00:06–00:11", text: "Từ đất, từ nắng, từ bàn tay chăm chút qua từng mùa." },
      { time: "00:14–00:21", text: "Mỗi hương vị mang một vùng đất. Mỗi mùa quả lưu một câu chuyện." },
      { time: "00:22–00:27", text: "Hãy đến để nếm, để hiểu, và gặp những người làm nên trái ngọt." },
      { time: "00:31–00:38", text: "Để mỗi cuộc gặp mở thêm cơ hội, mỗi sản phẩm tìm thấy kết nối mới." },
      { time: "00:38–00:44", text: "Festival Trái Cây Việt Nam. Mùa Quả Hội Tụ. Nếm vị bản địa — Kết nối giá trị Việt." }
    ]
  },
  {
    id: "slide-02", title: "Trái ngọt Việt cần một điểm hội tụ", type: "image",
    summary: "Festival là điểm hội tụ giữa quảng bá bản sắc, trải nghiệm sản phẩm và phát triển thị trường.",
    sections: [
      section("Bối cảnh theo đề bài", "Trái cây Việt Nam cần được khám phá bằng cả hương vị, câu chuyện và niềm tin. Theo bối cảnh đề bài, tiềm năng nông sản và trái cây Việt Nam chưa được kết nối trong một sự kiện tầm cỡ quốc gia."),
      section("Ba khoảng trống", "Giá trị chưa được kể trọn: người mua có thể biết tên quả nhưng chưa hiểu vùng trồng, mùa vụ và người tạo ra sản phẩm. Trải nghiệm và giao dịch còn tách rời: trưng bày cần nối tiếp bằng thử vị, tư vấn, mua hàng và gặp nhà cung cấp. Truyền thông cần một biểu tượng chung để các sản phẩm cùng góp phần tạo hình ảnh trái cây Việt Nam."),
      section("Mục tiêu", "Quảng bá bản địa · Tăng niềm tin · Kết nối thị trường."),
      section("Nhóm hưởng lợi", "Người sản xuất · Người tiêu dùng · Doanh nghiệp phân phối · Khách du lịch.")
    ],
    notes: ["Bối cảnh được xây dựng theo yêu cầu đề thi.", "Không sử dụng số liệu thị trường chưa kiểm chứng."]
  },
  {
    id: "slide-03", title: "Mỗi trái ngọt, một câu chuyện", type: "image",
    summary: "Mùa Quả Hội Tụ kể câu chuyện trái cây Việt qua vùng đất, người trồng và những kết nối tiếp nối giá trị.",
    sections: [
      section("Concept", "Mùa Quả Hội Tụ."),
      section("Vùng đất — nơi hương vị bắt đầu", "Điều kiện tự nhiên, mùa vụ và cách canh tác góp phần tạo nên đặc điểm của từng sản phẩm."),
      section("Người trồng — người giữ nhịp mùa", "Phía sau mỗi trái ngọt là lao động, kinh nghiệm và sự chăm sóc của người sản xuất."),
      section("Kết nối — nơi giá trị được tiếp nối", "Khi hiểu sản phẩm và gặp người làm ra nó, khách có thêm cơ sở để lựa chọn, mua và giới thiệu."),
      section("Hành trình", "Khám phá xuất xứ → Gặp người trồng → Nếm hương vị → Hiểu giá trị → Kết nối mua hàng."),
      section("Nguyên tắc kể chuyện", "Không gán đặc tính, nguồn gốc hoặc chứng nhận cho sản phẩm nếu chưa kiểm chứng.")
    ],
    notes: ["Dữ liệu vùng trồng, mùa vụ, canh tác và chứng nhận phải được xác minh trước khi gắn với sản phẩm cụ thể."]
  },
  {
    id: "slide-04", title: "Một festival — Năm không gian khám phá", type: "image",
    summary: "Quy mô sơ bộ 3 ngày, 60–80 gian hàng, 5 khu; TP.HCM là địa bàn ưu tiên khảo sát.",
    sections: [
      section("Quy mô và địa bàn", "03 ngày · 60–80 gian hàng · 05 khu trải nghiệm. Ưu tiên khảo sát tại TP.HCM. Một địa điểm tập trung gồm khu có mái che và ngoài trời; luồng khách theo hành trình khám phá."),
      section("Năm không gian", "Bản đồ Mùa Quả: vùng trồng, mùa vụ, chuyện sản phẩm. Gặp Người Giữ Mùa: nhà vườn, hợp tác xã và đơn vị sản xuất. Phòng Thử Vị Việt: thử vị có hướng dẫn, chọn và bảo quản quả. Bếp Sáng Tạo: workshop, trình diễn chế biến và ứng dụng trái cây. Chợ Kết Nối: mua hàng, tìm nhà cung cấp, gặp nhà mua hàng."),
      section("Nhóm khách trọng tâm", "Gia đình và người tiêu dùng · Người trẻ yêu ẩm thực · Khách du lịch · Nhà mua hàng."),
      section("Kết nối thương mại", "Bố trí riêng khu gặp gỡ theo lịch để hỗ trợ các cuộc hẹn."),
      section("Chú thích", "Quy mô sơ bộ; điều chỉnh theo mặt bằng, ngân sách và đối tác. Sơ đồ là minh họa, chưa phải bản vẽ kỹ thuật được phê duyệt.")
    ],
    notes: ["Địa điểm TP.HCM là phương án ưu tiên khảo sát, chưa được xác nhận.", "Số ngày, gian hàng và mặt bằng đều là đề xuất sơ bộ."]
  },
  {
    id: "slide-05", title: "Đến để nếm — Ở lại để hiểu — Rời đi với kết nối", type: "image",
    summary: "Ba ngày đưa khách từ khám phá vùng đất, qua trải nghiệm giác quan, đến kết nối sau festival.",
    sections: [
      section("Ngày 1 — Khám phá nguồn cội", "Mở câu chuyện vùng đất và người trồng.", ["Ra mắt Bản đồ Mùa Quả.", "Giao lưu “Người giữ nhịp mùa”.", "Thử vị theo nhóm sản phẩm.", "Gặp nhà cung cấp và nhà mua hàng theo lịch."]),
      section("Ngày 2 — Đánh thức giác quan", "Biến trái cây thành trải nghiệm đáng nhớ.", ["Thử vị có hướng dẫn: hương, kết cấu, độ chín.", "Workshop chọn, bảo quản và sử dụng trái cây.", "Trình diễn món ăn và sản phẩm chế biến.", "Hộ chiếu Vị Việt cho khách tham quan."]),
      section("Ngày 3 — Kết nối giá trị", "Đưa trải nghiệm tiếp tục sau festival.", ["Tư vấn sản phẩm, tiếp nhận nhu cầu mua.", "Kết nối hợp tác xã, doanh nghiệp và nhà phân phối.", "Tổng kết hành trình hộ chiếu.", "Chia sẻ câu chuyện nổi bật và kênh tìm mua."]),
      section("Xuyên suốt ba ngày", "Gian hàng · điểm chụp ảnh · thử vị · thông tin sản phẩm · hoạt động thương mại."),
      section("Điều kiện", "Lịch đề xuất; cần xác nhận đơn vị tham gia và điều kiện vận hành.")
    ],
    notes: ["Lịch hoạt động, đối tác và điều kiện vận hành chưa được xác nhận.", "An toàn thực phẩm và bảo quản sản phẩm cần có hướng dẫn phù hợp."]
  },
  {
    id: "slide-06", title: "Hộ chiếu Vị Việt", type: "image",
    summary: "Năm dấu giúp khách chủ động khám phá xuất xứ, người trồng, hương vị, sáng tạo và điểm mua.",
    sections: [
      section("Dấu vùng đất", "Khám phá xuất xứ và mùa vụ của sản phẩm."),
      section("Dấu người trồng", "Nghe câu chuyện từ người sản xuất."),
      section("Dấu hương vị", "Tham gia thử vị và ghi lại cảm nhận."),
      section("Dấu sáng tạo", "Trải nghiệm chế biến hoặc phối vị."),
      section("Dấu kết nối", "Lưu sản phẩm yêu thích, tìm điểm mua hoặc gửi nhu cầu mua hàng."),
      section("Giá trị", "Với khách: hành trình có mục tiêu và dấu ấn cá nhân. Với người bán: cơ hội giới thiệu sâu hơn, thay vì chỉ bán tại quầy. Với ban tổ chức: hỗ trợ phân luồng và đo mức độ tham gia."),
      section("Hoàn thành hành trình", "Có thể nhận quà nhỏ hoặc ưu đãi theo thể lệ công bố."),
      section("Ghi chú demo", "Hộ chiếu có thể triển khai bằng thẻ giấy hoặc trang web đơn giản. Hình ảnh trong hồ sơ là concept; website hiện tại chỉ trình chiếu proposal, chưa có demo tương tác hoặc hệ thống đăng ký.")
    ],
    notes: ["Hộ chiếu có thể là bản giấy hoặc web.", "Quà, ưu đãi, đăng ký và đo lường chưa phải chức năng vận hành chính thức."]
  },
  {
    id: "slide-07", title: "Biến trải nghiệm thành câu chuyện được chia sẻ", type: "image",
    summary: "Chiến dịch nội dung nhiều giai đoạn dẫn từ gợi tò mò đến kết nối sau festival.",
    sections: [
      section("Phim concept mở rộng", "“Từ hạt mầm đến hội tụ” · đề xuất khoảng 60 giây · ngang 16:9. Đây là concept chiến dịch có thể phát triển riêng; video intro của hồ sơ ở slide 1 dài 45 giây. Hành trình từ đất, bàn tay người trồng và trái chín đến không gian festival — nơi hương vị trở thành trải nghiệm và trải nghiệm mở ra kết nối."),
      section("Lời kết phim", "“Mỗi trái ngọt mang một câu chuyện. Mỗi cuộc gặp mở một kết nối. Việt Nam — Mùa Quả Hội Tụ.”"),
      section("Trước — gợi tò mò", "Chuỗi “Một quả — Một vùng đất — Một người trồng”, phim chủ đạo, giới thiệu từng trạm hộ chiếu. Mời tìm hiểu, đăng ký nhận tin và giữ chỗ workshop khi mở đăng ký."),
      section("Trong — khuyến khích trải nghiệm", "Creator khám phá theo hộ chiếu, video thử vị, nội dung từ người trồng và điểm chụp ảnh có câu chuyện. Mời trải nghiệm, lưu sản phẩm, chia sẻ cảm nhận."),
      section("Sau — duy trì kết nối", "Video tổng kết, danh mục đơn vị tham gia và theo dõi nhu cầu mua hàng. Mời tìm nhà cung cấp, tiếp tục mua và hợp tác."),
      section("Kênh", "Mạng xã hội · cộng đồng ẩm thực và gia đình · kênh du lịch · mạng lưới nhà mua hàng."),
      section("Đo lường và hashtag", "Đăng ký · lượt vào cổng · tỷ lệ hoàn thành hộ chiếu · nội dung do khách tạo · nhu cầu mua hàng. Hashtag đề xuất: #MuaQuaHoiTu · #HoChieuViViet."),
      section("Tình trạng", "Phim concept mở rộng đang ở mức storyboard; cảnh minh họa không phải tư liệu sự kiện đã diễn ra.")
    ],
    transcriptTitle: "Lời dẫn phim concept · 60 giây",
    transcript: [
      { time: "00–12 giây", text: "Mỗi mùa quả bắt đầu từ một vùng đất và những bàn tay chăm sóc." },
      { time: "12–26 giây", text: "Phía sau trái ngọt là kinh nghiệm, công sức và nhịp mùa của người trồng." },
      { time: "26–42 giây", text: "Đến để nghe câu chuyện, thử vị và khám phá những điều làm nên mỗi sản phẩm." },
      { time: "42–54 giây", text: "Khi gặp nhau, trải nghiệm trở thành niềm tin và mở ra kết nối mới." },
      { time: "54–60 giây", text: "Mỗi trái ngọt mang một câu chuyện. Mỗi cuộc gặp mở một kết nối. Việt Nam — Mùa Quả Hội Tụ." }
    ],
    notes: ["Phim 60 giây là concept mở rộng, tách biệt video intro 45 giây ở slide 1.", "Cảnh concept không phải tư liệu sự kiện đã diễn ra.", "KPI và hashtag là đề xuất."]
  },
  {
    id: "slide-08", title: "Bản địa trong câu chuyện — Hiện đại trong hình ảnh", type: "image",
    summary: "Một hệ nhận diện từ lát cắt quả, hạt, lá và nét gợi phù sa, dùng nhất quán trên web, video và không gian.",
    sections: [
      section("Ý tưởng hình ảnh", "Lát cắt trái cây hội tụ thành nhịp mùa. Múi, hạt, lá và đường nét gợi phù sa được tổ chức thành ngôn ngữ chung."),
      section("Bảng màu", "Xanh vườn #164B35: nền chính. Trắng ngà #FFF7E8: khoảng thở và nền nội dung. Vàng mùa chín #F4C542: điểm nhấn. Hồng thanh long #D93B79: chi tiết trẻ trung. Cam quả chín #F58232: hoạt động và lời kêu gọi."),
      section("Typography", "Be Vietnam Pro được đề xuất làm font chính: rõ ràng, hiện đại và hỗ trợ tiếng Việt. Tiêu đề đậm, ngắn; nội dung thoáng; tạo điểm nhấn bằng tương phản kích thước."),
      section("Nguyên tắc hình ảnh", "Sản phẩm rõ nét · con người có vai trò · màu sắc nhất quán · không tô vẽ nguồn gốc."),
      section("Trước khi đóng gói", "Kiểm tra giấy phép font thực tế và bảo đảm độ tương phản khi đặt chữ trên nền màu.")
    ],
    notes: ["Be Vietnam Pro là font được đề xuất trong concept, chưa được đóng gói trong bản demo.", "Kiểm tra tương phản và giấy phép trước khi phát hành."]
  },
  {
    id: "slide-09", title: "Một câu chuyện — Nhiều điểm chạm", type: "image",
    summary: "Poster, brochure và web UI cùng dẫn người xem qua câu chuyện, không gian, hộ chiếu và sản phẩm.",
    sections: [
      section("Poster — thu hút trong một ánh nhìn", "Festival Trái Cây Việt Nam · Mùa Quả Hội Tụ · Nếm vị bản địa — Kết nối giá trị Việt. Khám phá vùng trồng, gặp người giữ mùa, thưởng thức trái ngọt, kết nối sản phẩm Việt. Thời gian và địa điểm đều ghi là dự kiến."),
      section("Brochure — dẫn dắt hành trình", "Câu chuyện festival · sơ đồ năm khu · hoạt động nổi bật · hướng dẫn Hộ chiếu Vị Việt · thông tin tham gia và kênh tìm hiểu."),
      section("Web UI — trước và sau sự kiện", "Luồng trải nghiệm đề xuất: xem phim quảng bá → khám phá festival → thử hộ chiếu → xem sản phẩm → tải proposal. Website hiện tại trình chiếu hồ sơ, không phải hệ thống vận hành festival."),
      section("Nguyên tắc web", "Dùng chung nhận diện với ấn phẩm; có phụ đề video; responsive; nội dung rõ ràng. Mockup trong website là demo."),
      section("Trước khi xuất bản", "Thay thông tin thời gian, địa điểm khi được xác nhận; nếu chưa, trình bày rõ là dự kiến. Chỉ dùng QR khi có đường dẫn hoạt động.")
    ],
    notes: ["Mockup poster, brochure và giao diện là concept, chưa phải tài sản in hoặc website sự kiện.", "Không gắn QR hoặc URL giả."]
  },
  {
    id: "slide-10", title: "Từ cuộc hội tụ đến giá trị bền lâu", type: "image",
    summary: "Bốn giai đoạn chuyển concept thành kế hoạch có địa điểm, đối tác, dự toán, kiểm soát và đánh giá.",
    sections: [
      section("Giai đoạn 1 — xác lập điều kiện", "Khảo sát địa điểm, xác nhận thời gian, nguồn cung, yêu cầu pháp lý và đối tác tham gia."),
      section("Giai đoạn 2 — hoàn thiện phương án", "Chốt quy mô, mặt bằng, hoạt động, ngân sách, tiêu chí gian hàng và cơ chế kết nối thương mại."),
      section("Giai đoạn 3 — sản xuất và truyền thông", "Triển khai nhận diện, video, ấn phẩm, website và chiến dịch thu hút khách."),
      section("Giai đoạn 4 — vận hành và đánh giá", "Tổ chức festival, đo trải nghiệm, ghi nhận giao dịch và theo dõi kết nối sau sự kiện."),
      section("Điều kiện thành công và kiểm soát", "Nguồn cung phù hợp mùa vụ · đối tác tham gia được xác nhận · an toàn thực phẩm · bảo quản · sức chứa · phương án thời tiết · đo lường minh bạch · bảo vệ dữ liệu khách."),
      section("Nhóm ngân sách", "Địa điểm và hạ tầng · gian hàng · hoạt động · nhân sự · truyền thông · vệ sinh và an toàn · dự phòng. Hỗ trợ dự kiến từ gian hàng, tài trợ và hợp tác dịch vụ chưa phải nguồn thu cam kết."),
      section("Đề nghị bước tiếp theo", "Thống nhất concept → Phê duyệt khảo sát → Hoàn thiện kế hoạch và dự toán chi tiết."),
      section("Sử dụng AI", "AI được sử dụng qua API được cung cấp để phát triển nội dung và tài sản sáng tạo; đầu ra cần biên tập, kiểm chứng và lưu dấu vết thực hiện.")
    ],
    notes: ["Chưa có ngân sách, tài trợ, doanh thu hoặc lịch tổ chức được cam kết.", "Các yêu cầu vận hành cần xác nhận với đối tác và cơ quan có thẩm quyền."]
  }
];

// Short image stories power the microsite gallery; proposalSlides remain the
// complete, ordered content contract for the 10-slide viewer.
export const imageStories = [
  {
    "id": "slide-02",
    "imageId": "01-orchard-dawn",
    "alt": "Một quả xoài vàng trên cành giữa tán lá và ánh nắng sớm trong vườn, hình minh họa AI.",
    "title": "Nơi vị ngọt bắt đầu",
    "type": "image",
    "summary": "Từ đất, từ nắng, một mùa quả bắt đầu.",
    "sections": [
      {
        "heading": "Vùng đất",
        "body": "Ánh sáng, đất và nhịp mùa mở đầu câu chuyện. Mỗi sản phẩm có xuất xứ riêng cần được xác minh trước khi giới thiệu.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-03",
    "imageId": "02-grower-care",
    "alt": "Người làm vườn nhẹ nhàng kiểm tra quả xoài trên cây dưới ánh sáng xuyên tán lá, hình minh họa AI.",
    "title": "Bàn tay giữ nhịp mùa",
    "type": "image",
    "summary": "Phía sau trái ngọt là những bàn tay chăm chút.",
    "sections": [
      {
        "heading": "Người giữ mùa",
        "body": "Gặp người làm ra sản phẩm để hiểu hơn việc chăm sóc và thu hoạch. Người trong ảnh là nhân vật minh họa AI.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-04",
    "imageId": "03-harvest-table",
    "alt": "Xoài, thanh long và bưởi cùng nhãn và chôm chôm được bày trên bàn gỗ với giỏ tre, hình minh họa AI.",
    "title": "Mỗi hương vị, một câu chuyện",
    "type": "image",
    "summary": "Xoài, thanh long, bưởi: những sắc vị cùng gặp nhau.",
    "sections": [
      {
        "heading": "Hương vị bản địa",
        "body": "Festival mời khách khám phá trái cây bằng cả hương vị và câu chuyện. Không gán chứng nhận hoặc nguồn gốc chưa kiểm chứng cho sản phẩm trong ảnh.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-05",
    "imageId": "04-festival-pavilion",
    "alt": "Không gian festival ý tưởng có quầy trái cây bằng gỗ, mái che, cây xanh và lối đi thoáng, hình minh họa AI.",
    "title": "Một cuộc hội tụ giữa sắc xanh",
    "type": "image",
    "summary": "Một điểm dừng để khám phá, nếm thử và gặp gỡ.",
    "sections": [
      {
        "heading": "Năm không gian đề xuất",
        "body": "Bản đồ Mùa Quả · Gặp Người Giữ Mùa · Phòng Thử Vị Việt · Bếp Sáng Tạo · Chợ Kết Nối. Quy mô sơ bộ: 3 ngày, 60–80 gian hàng; TP.HCM là địa bàn ưu tiên khảo sát, chưa được xác nhận.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-06",
    "imageId": "05-guided-tasting",
    "alt": "Người hướng dẫn đưa một đĩa nhỏ có xoài và thanh long cho khách trưởng thành tại bàn thử vị, hình minh họa AI.",
    "title": "Nếm chậm để hiểu sâu",
    "type": "image",
    "summary": "Nếm một miếng quả, nghe thêm một câu chuyện.",
    "sections": [
      {
        "heading": "Nếm và hiểu",
        "body": "Thử vị có hướng dẫn để khám phá hương, kết cấu và độ chín; kết hợp thông tin về cách chọn và bảo quản. Hoạt động cần hướng dẫn vệ sinh và an toàn thực phẩm phù hợp.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-07",
    "imageId": "06-tasting-passport",
    "alt": "Bàn tay đóng dấu hình lá lên cuốn hộ chiếu trải nghiệm không chữ cạnh đĩa trái cây, hình minh họa AI.",
    "title": "Mỗi trải nghiệm, một dấu nhớ",
    "type": "image",
    "summary": "Giữ lại hành trình bằng những dấu trải nghiệm.",
    "sections": [
      {
        "heading": "Hộ chiếu Vị Việt",
        "body": "Năm dấu đề xuất: vùng đất, người trồng, hương vị, sáng tạo và kết nối. Hộ chiếu trong ảnh là vật phẩm concept không chữ; thể lệ, quà và hình thức triển khai cần được xác nhận.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-08",
    "imageId": "07-fruit-kitchen",
    "alt": "Người hướng dẫn và khách trưởng thành cùng hoàn thiện món trái cây tại bàn workshop, hình minh họa AI.",
    "title": "Sáng tạo từ vị bản địa",
    "type": "image",
    "summary": "Từ trái chín đến những cách thưởng thức mới.",
    "sections": [
      {
        "heading": "Bếp Sáng Tạo",
        "body": "Workshop và trình diễn chế biến giúp khách khám phá cách sử dụng trái cây. Lịch và đơn vị hướng dẫn vẫn là đề xuất.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-09",
    "imageId": "08-grower-buyer",
    "alt": "Người trồng và người mua trò chuyện bên bàn có xoài và bưởi trong không gian vườn, hình minh họa AI.",
    "title": "Cuộc gặp mở thêm cơ hội",
    "type": "image",
    "summary": "Lắng nghe, hiểu sản phẩm, mở một kết nối mới.",
    "sections": [
      {
        "heading": "Chợ Kết Nối",
        "body": "Không gian gặp gỡ giữa người sản xuất, người tiêu dùng và nhà mua hàng. Ảnh minh họa một cuộc trò chuyện, không khẳng định hợp đồng, doanh thu hoặc giao dịch đã hoàn tất.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  },
  {
    "id": "slide-10",
    "imageId": "09-fruit-convergence",
    "alt": "Các múi xoài, thanh long, bưởi và lá tạo vòng hội tụ trên nền xanh vườn, hình minh họa AI.",
    "title": "Mùa Quả Hội Tụ",
    "type": "image",
    "summary": "Nếm vị bản địa — Kết nối giá trị Việt.",
    "sections": [
      {
        "heading": "Một nhịp mùa chung",
        "body": "Múi quả, hạt và lá gợi cuộc hội tụ; xanh vườn, vàng xoài và hồng thanh long nối ảnh với video và website. Đây là hình concept, không phải logo chính thức.",
        "bullets": []
      }
    ],
    "notes": [
      "Hình minh họa ý tưởng được tạo bằng AI, không phải tư liệu sự kiện thực tế.",
      "Ảnh không chứa chữ; tiêu đề và nội dung được trình bày riêng trên website."
    ]
  }
];

export const slides = proposalSlides;
