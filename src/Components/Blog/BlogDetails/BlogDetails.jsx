import React from "react";

import "./BlogDetails.css";

import blogdetail1 from "../../../Assets/Blog/Huyết áp cao.webp";
import blogimage1 from "../../../Assets/Blog/Huyết áp cao 2.webp";
import blogimage2 from "../../../Assets/Blog/Huyết áp cao 3.webp";

import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const BlogDetails = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="blogDetailsSection">
        <div className="blogDetailsSectionContainer">
          <div className="blogDetailsHeading">
            <h2>3 dấu hiệu khi đi vệ sinh chứng tỏ đường huyết tăng cao</h2>
            <div className="blogDetailsMetaData">
              <span>Kiến thức y khoa</span>
              <span>May 19, 2023</span>
              <span>Phòng bệnh & Sống khoẻ</span>
            </div>
          </div>
          <div className="blogDetailsFeaturedImg">
            <img src={blogdetail1} alt="" />
          </div>
          <div className="blogDetailsContent">
            <p>
              Nếu bạn gặp phải những triệu chứng lạ trong quá trình đi vệ sinh,
              đó có thể là dấu hiệu cho thấy mức đường huyết của bạn đang tăng
              cao. Hãy cùng tìm hiểu 3 dấu hiệu khi đi vệ sinh mà bạn không nên
              bỏ qua, giúp phát hiện sớm nguy cơ tăng đường huyết.
            </p>
            <h5>Nước tiểu có bọt</h5>
            <p>
              Thông thường, nước tiểu của người khỏe mạnh có màu vàng nhạt,
              trong suốt và không tạo bọt. Nếu có bọt, chúng thường nhỏ, ít và
              biến mất nhanh chóng sau khi xuất hiện. Đây là hiện tượng hoàn
              toàn bình thường, thường không liên quan đến vấn đề sức khỏe
              nghiêm trọng. Theo chuyên trang sức khỏe Aboluowang, lượng đường
              trong máu tăng cao có thể gây ra sự thay đổi trong tính chất của
              nước tiểu, dẫn đến hiện tượng bọt kéo dài.
            </p>
            <div className="blogDetailsContentBullets">
              <div className="blogDetailsContentBulletscontent">
                <h5>Nguyên nhân tiềm ẩn:</h5>
                <p>
                  <ul>
                    <li>
                      Nhiễm trùng đường tiết niệu (UTI): Khi vi khuẩn xâm nhập
                      vào đường tiết niệu, chúng có thể gây viêm và làm thay đổi
                      thành phần nước tiểu. Hiện tượng bọt kéo dài đôi khi là
                      dấu hiệu đầu tiên cho thấy bạn có thể đang bị nhiễm trùng
                      đường tiết niệu.
                    </li>
                    <li>
                      Bệnh thận do tiểu đường: Tiểu đường không được kiểm soát
                      tốt có thể dẫn đến tổn thương thận, hay còn gọi là bệnh
                      thận do tiểu đường. Thận đóng vai trò quan trọng trong
                      việc lọc máu và bài tiết chất thải qua nước tiểu. Khi chức
                      năng thận suy giảm, protein có thể rò rỉ vào nước tiểu,
                      gây hiện tượng bọt bất thường.
                    </li>
                  </ul>
                </p>
              </div>
              <div className="blogDetailsContentBulletscontent">
                <h5>Mùi đặc biệt trong nước tiểu</h5>
                <p>
                  <ol>
                    <li>
                      Một trong những hiện tượng dễ nhận thấy chứng tỏ đường
                      huyết tăng cao là mùi đặc biệt trong nước tiểu, điều này
                      có thể phản ánh sự thay đổi trong lượng đường trong máu.
                    </li>
                    <li>
                      Khi lượng đường trong máu của bạn tăng cao, lượng glucose
                      trong nước tiểu cũng sẽ theo đó tăng lên. Điều này xảy ra
                      vì cơ thể không thể hấp thụ hết lượng đường dư thừa trong
                      máu, khiến chúng bị đào thải qua nước tiểu. Khi glucose
                      trong nước tiểu kết hợp với các chất khác, quá trình lên
                      men có thể bắt đầu, tạo ra một mùi đặc trưng, thậm chí còn
                      gây khó chịu.
                    </li>
                  </ol>
                </p>
              </div>
            </div>
            <p>
              Đây có thể là dấu hiệu cho thấy bạn đang gặp phải tình trạng rối
              loạn chuyển hóa, chẳng hạn như tiểu đường. Khi cơ thể không thể
              kiểm soát được lượng đường trong máu, nó sẽ có xu hướng đào thải
              lượng đường dư thừa qua nước tiểu, gây ra tình trạng đi tiểu nhiều
              hơn. Khi mức đường huyết cao, cơ thể sẽ phản ứng bằng cách thay
              đổi thói quen đi vệ sinh, như đi tiểu nhiều hơn, mùi đặc biệt
              trong nước tiểu hoặc nước tiểu có bọt. Hy vọng qua nội dung bài
              viết bạn đã hiểu rõ hơn về 3 dấu hiệu khi đi vệ sinh chứng tỏ
              đường huyết tăng cao mà bạn cần chú ý, từ đó giúp phát hiện sớm
              tình trạng tăng đường huyết và phòng ngừa các biến chứng nguy hiểm
              của bệnh tiểu đường.
            </p>
          </div>
          <div className="blogDetailsContentImg">
            <img src={blogimage1} alt="" style={{ width: "50%" }} />
            <img src={blogimage2} alt="" style={{ width: "50%" }} />
          </div>
          <div className="blogDetailsContent">
            <p>
              Nước tiểu là một chỉ báo quan trọng giúp cơ thể điều chỉnh các
              chức năng sinh lý và duy trì sự cân bằng nội môi. Thông thường,
              đối với người trưởng thành, số lần đi tiểu trong ngày dao động từ
              4 đến 6 lần, và số lần đi tiểu vào ban đêm thường rơi vào khoảng 0
              đến 2 lần. Tuy nhiên, khi cơ thể gặp phải sự thay đổi về mức đường
              huyết, các dấu hiệu như thay đổi tần suất và lượng nước tiểu có
              thể xuất hiện, đây là những tín hiệu mà bạn không nên bỏ qua. Khi
              lượng đường trong máu tăng cao, cơ thể sẽ cố gắng thải bỏ phần dư
              thừa glucose thông qua nước tiểu. Quá trình này dẫn đến việc tăng
              cường bài tiết nước tiểu, khiến bạn đi tiểu nhiều hơn so với bình
              thường. Lượng nước tiểu cũng có thể tăng do cơ thể cần loại bỏ các
              chất dư thừa khác, tạo ra một hiện tượng gọi là "tiểu nhiều" hoặc
              "đái tháo đường".
            </p>
            <p>
              Tình trạng này có thể làm bạn cảm thấy đi tiểu thường xuyên, kể cả
              vào ban ngày hay ban đêm. Điều này không chỉ gây khó chịu mà còn
              ảnh hưởng đến giấc ngủ và chất lượng cuộc sống của bạn. Việc đi
              tiểu nhiều lần cũng có thể khiến cơ thể bị mất nước, dẫn đến các
              vấn đề về sức khỏe như mệt mỏi, khô miệng và mất cân bằng điện
              giải.
            </p>
          </div>
          <div className="share-buttons">
            <button className="share-button facebook">
              <FaFacebookF /> Chia sẻ trên Facebook
            </button>
            <button className="share-button twitter">
              <FaXTwitter />
              Chia sẻ trên Twitter
            </button>
            <button className="share-button pinterest">
              <FaPinterest /> Chia sẻ trên Pinterest
            </button>
            <button className="share-button more">
              <FaPlus size={20} />
            </button>
          </div>
          <div className="blogDetailsNextPrev">
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon"
                onClick={scrollToTop}
              >
                <GoChevronLeft size={20} />
                <p>Bài đăng trước</p>
              </div>
            </div>
            <div className="blogDetailsNextPrevContainer">
              <div
                className="blogDetailsNextPrevContainerIcon2"
                onClick={scrollToTop}
              >
                <p>Bài đăng sau</p>
                <GoChevronRight size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
