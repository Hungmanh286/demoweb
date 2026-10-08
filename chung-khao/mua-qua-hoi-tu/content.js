const section = (heading, body = "", bullets = []) => ({ heading, body, bullets });

export const slides = [
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
    id: "slide-02", title: "Từ sản vật địa phương đến trải nghiệm quốc gia", type: "image",
    summary: "Festival là điểm hội tụ giữa quảng bá bản sắc, trải nghiệm sản phẩm và phát triển thị trường.",
    sections: [
      section("Bối cảnh theo đề bài", "Trái cây Việt Nam cần được khám phá bằng cả hương vị, câu chuyện và niềm tin. Theo bối cảnh đề bài, tiềm năng nông sản và trái cây Việt Nam chưa được kết nối trong một sự kiện tầm cỡ quốc gia."),
      section("Ba khoảng trống", "Giá trị chưa được kể trọn: người mua có thể biết tên quả nhưng chưa hiểu vùng trồng, mùa vụ và người tạo ra sản phẩm. Trải nghiệm và giao dịch còn tách rời: trưng bày cần nối tiếp bằng thử vị, tư vấn, mua hàng và gặp nhà cung cấp. Truyền thông cần một biểu tượng chung để các sản phẩm cùng góp phần tạo hình ảnh trái cây Việt Nam."),
      section("Mục tiêu", "Quảng bá bản địa · Tăng niềm tin · Kết nối thị trường.")
    ],
    notes: ["Bối cảnh được xây dựng theo yêu cầu đề thi.", "Không sử dụng số liệu thị trường chưa kiểm chứng."]
  },
  {
    id: "slide-03", title: "Mỗi trái ngọt, một vùng đất. Mỗi mùa quả, một cuộc hội tụ.", type: "image",
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
    id: "slide-04", title: "Một điểm hội tụ — năm không gian trải nghiệm", type: "image",
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
    id: "slide-05", title: "Không chỉ đến xem — đến để nếm, hiểu và kết nối", type: "image",
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
    id: "slide-06", title: "Hộ chiếu Vị Việt — mỗi trải nghiệm, một dấu kết nối", type: "image",
    summary: "Năm dấu giúp khách chủ động khám phá xuất xứ, người trồng, hương vị, sáng tạo và điểm mua.",
    sections: [
      section("Dấu vùng đất", "Khám phá xuất xứ và mùa vụ của sản phẩm."),
      section("Dấu người trồng", "Nghe câu chuyện từ người sản xuất."),
      section("Dấu hương vị", "Tham gia thử vị và ghi lại cảm nhận."),
      section("Dấu sáng tạo", "Trải nghiệm chế biến hoặc phối vị."),
      section("Dấu kết nối", "Lưu sản phẩm yêu thích, tìm điểm mua hoặc gửi nhu cầu mua hàng."),
      section("Giá trị", "Với khách: hành trình có mục tiêu và dấu ấn cá nhân. Với người bán: cơ hội giới thiệu sâu hơn, thay vì chỉ bán tại quầy. Với ban tổ chức: hỗ trợ phân luồng và đo mức độ tham gia."),
      section("Hoàn thành hành trình", "Có thể nhận quà nhỏ hoặc ưu đãi theo thể lệ công bố."),
      section("Ghi chú demo", "Trên website có thể thử đóng dấu và bắt đầu lại. Đây là demo tương tác, không phải hệ thống vận hành chính thức.")
    ],
    notes: ["Hộ chiếu có thể là bản giấy hoặc web.", "Quà, ưu đãi, đăng ký và đo lường chưa phải chức năng vận hành chính thức."]
  },
  {
    id: "slide-07", title: "Từ câu chuyện được xem đến trải nghiệm được chia sẻ", type: "image",
    summary: "Chiến dịch nội dung nhiều giai đoạn dẫn từ gợi tò mò đến kết nối sau festival.",
    sections: [
      section("Phim concept mở rộng", "“Từ hạt mầm đến hội tụ” · đề xuất khoảng 60 giây · ngang 16:9. Đây là concept chiến dịch có thể phát triển riêng; video intro của hồ sơ ở slide 1 dài 45 giây. Hành trình từ đất, bàn tay người trồng và trái chín đến không gian festival — nơi hương vị trở thành trải nghiệm và trải nghiệm mở ra kết nối."),
      section("Lời kết phim", "“Mỗi trái ngọt mang một câu chuyện. Mỗi cuộc gặp mở một kết nối. Việt Nam — Mùa Quả Hội Tụ.”"),
      section("Trước — gợi tò mò", "Chuỗi “Một quả — Một vùng đất — Một người trồng”, phim chủ đạo, giới thiệu từng trạm hộ chiếu. Mời tìm hiểu, đăng ký nhận tin và giữ chỗ workshop khi mở đăng ký."),
      section("Trong — khuyến khích trải nghiệm", "Creator khám phá theo hộ chiếu, video thử vị, nội dung từ người trồng và điểm chụp ảnh có câu chuyện. Mời trải nghiệm, lưu sản phẩm, chia sẻ cảm nhận."),
      section("Sau — duy trì kết nối", "Video tổng kết, danh mục đơn vị tham gia và theo dõi nhu cầu mua hàng. Mời tìm nhà cung cấp, tiếp tục mua và hợp tác."),
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
    id: "slide-08", title: "Bản địa trong câu chuyện — hiện đại trong ngôn ngữ thị giác", type: "image",
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
    id: "slide-09", title: "Một câu chuyện — nhiều điểm chạm", type: "image",
    summary: "Poster, brochure và web UI cùng dẫn người xem qua câu chuyện, không gian, hộ chiếu và sản phẩm.",
    sections: [
      section("Poster — thu hút trong một ánh nhìn", "Festival Trái Cây Việt Nam · Mùa Quả Hội Tụ · Nếm vị bản địa — Kết nối giá trị Việt. Khám phá vùng trồng, gặp người giữ mùa, thưởng thức trái ngọt, kết nối sản phẩm Việt. Thời gian và địa điểm đều ghi là dự kiến."),
      section("Brochure — dẫn dắt hành trình", "Câu chuyện festival · sơ đồ năm khu · hoạt động nổi bật · hướng dẫn Hộ chiếu Vị Việt · thông tin tham gia và kênh tìm hiểu."),
      section("Web UI — trước và sau sự kiện", "Xem phim quảng bá → Khám phá festival → Thử hộ chiếu → Xem sản phẩm → Tải proposal."),
      section("Nguyên tắc web", "Dùng chung nhận diện với ấn phẩm; có phụ đề video; responsive; nội dung rõ ràng. Mockup trong website là demo."),
      section("Trước khi xuất bản", "Thay thông tin thời gian, địa điểm khi được xác nhận; nếu chưa, trình bày rõ là dự kiến. Chỉ dùng QR khi có đường dẫn hoạt động.")
    ],
    notes: ["Mockup poster, brochure và giao diện là concept, chưa phải tài sản in hoặc website sự kiện.", "Không gắn QR hoặc URL giả."]
  },
  {
    id: "slide-10", title: "Từ ý tưởng sáng tạo đến một festival có thể thực hiện", type: "image",
    summary: "Bốn giai đoạn chuyển concept thành kế hoạch có địa điểm, đối tác, dự toán, kiểm soát và đánh giá.",
    sections: [
      section("Giai đoạn 1 — xác lập điều kiện", "Khảo sát địa điểm, xác nhận thời gian, nguồn cung, yêu cầu pháp lý và đối tác tham gia."),
      section("Giai đoạn 2 — hoàn thiện phương án", "Chốt quy mô, mặt bằng, hoạt động, ngân sách, tiêu chí gian hàng và cơ chế kết nối thương mại."),
      section("Giai đoạn 3 — sản xuất và truyền thông", "Triển khai nhận diện, video, ấn phẩm, website và chiến dịch thu hút khách."),
      section("Giai đoạn 4 — vận hành và đánh giá", "Tổ chức festival, đo trải nghiệm, ghi nhận giao dịch và theo dõi kết nối sau sự kiện."),
      section("Nguồn lực và kiểm soát", "Chi phí gồm địa điểm–hạ tầng, gian hàng, hoạt động, nhân sự, truyền thông, vệ sinh–an toàn và dự phòng. Hỗ trợ dự kiến từ gian hàng, tài trợ và hợp tác dịch vụ chưa phải nguồn thu cam kết. Ưu tiên an toàn thực phẩm, bảo quản, sức chứa, thời tiết và bảo vệ dữ liệu khách."),
      section("Đề nghị bước tiếp theo", "Thống nhất concept → Phê duyệt khảo sát → Hoàn thiện kế hoạch và dự toán chi tiết."),
      section("Sử dụng AI", "AI được sử dụng qua API được cung cấp để phát triển nội dung và tài sản sáng tạo; đầu ra cần biên tập, kiểm chứng và lưu dấu vết thực hiện.")
    ],
    notes: ["Chưa có ngân sách, tài trợ, doanh thu hoặc lịch tổ chức được cam kết.", "Các yêu cầu vận hành cần xác nhận với đối tác và cơ quan có thẩm quyền."]
  }
];
