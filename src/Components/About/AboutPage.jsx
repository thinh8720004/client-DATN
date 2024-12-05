import React from "react";
import "./AboutPage.css";

import about1 from "../../Assets/About/image-banner-9.png";
import about2 from "../../Assets/About/image-banner-10.webp";

import Services from "../../Components/Home/Services/Services";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

import brand1 from "../../Assets/Brands/brand1.png";
import brand2 from "../../Assets/Brands/brand2.png";
import brand3 from "../../Assets/Brands/brand3.png";
import brand4 from "../../Assets/Brands/brand4.png";
import brand5 from "../../Assets/Brands/brand5.png";
import brand6 from "../../Assets/Brands/brand6.png";
import brand7 from "../../Assets/Brands/brand7.png";

const AboutPage = () => {
  return (
    <>
      <div className="aboutSection">
        <h2>Giới thiệu</h2>
        <img src={about1} alt="" />
        <div className="aboutContent">
          <h3>Về Chúng Tôi</h3>
          <h6>
            Chào mừng bạn đến với Hiệu thuốc gia đình 24pf, đối tác đáng tin cậy
            của bạn trong lĩnh vực chăm sóc sức khỏe và nâng cao chất lượng cuộc
            sống. Chúng tôi cam kết mang đến dịch vụ y tế chất lượng cao, ứng
            dụng công nghệ hiện đại và sự quan tâm tận tình để cải thiện sức
            khỏe của bạn và gia đình.
          </h6>
          <h6>
            Tại Hiệu thuốc gia đình 24pf, chúng tôi tin rằng sức khỏe là nền
            tảng cho một cuộc sống trọn vẹn. Đội ngũ bác sĩ, chuyên gia và nhân
            viên y tế giàu kinh nghiệm của chúng tôi luôn sẵn sàng hợp tác để
            mang đến giải pháp chăm sóc sức khỏe toàn diện, phù hợp với nhu cầu
            riêng của từng bệnh nhân.
          </h6>

          <div className="content1">
            <div className="contentBox">
              <h5>Sứ Mệnh Của Chúng Tôi</h5>
              <p>
                Trao quyền cho mọi người bằng kiến thức, nguồn lực và sự chăm
                sóc tận tâm để họ có một cuộc sống khỏe mạnh và hạnh phúc hơn.
              </p>
            </div>
            <div className="contentBox">
              <h5>Tầm Nhìn Của Chúng Tôi</h5>
              <p>
                Trở thành đơn vị hàng đầu trong lĩnh vực cung cấp dịch vụ y tế,
                nơi hội tụ giữa sự đổi mới và lòng nhân ái, đảm bảo kết quả tốt
                nhất cho bệnh nhân.
              </p>
            </div>
          </div>
          <div className="content2">
            <div className="imgContent">
              <img src={about2} alt="" />
            </div>
            <div className="textContent">
              <h5>Tại Sao Chọn Chúng Tôi?</h5>
              <p>
                Đội ngũ chuyên gia giàu kinh nghiệm: Luôn tận tâm và đặt sức
                khỏe của bạn lên hàng đầu.
              </p>
              <p>
                Công nghệ tiên tiến: Ứng dụng các giải pháp y tế hiện đại để
                chẩn đoán và điều trị hiệu quả
              </p>
              <p>
                Dịch vụ cá nhân hóa: Chăm sóc theo từng nhu cầu riêng biệt của
                bệnh nhân.
              </p>
              <p>
                Cam kết chất lượng: Luôn đảm bảo sự an toàn, chính xác và tin
                cậy trong mọi dịch vụ.
              </p>
              <p>
                Hãy đồng hành cùng chúng tôi trên hành trình chăm sóc sức khỏe
                toàn diện cho bạn và gia đình!
              </p>
            </div>
          </div>
        </div>
      </div>
      <Services />
      <div className="companyPartners">
        <h5>Đối tác công ty</h5>
        <Swiper
          slidesPerView={1}
          loop={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 5,
            },

            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
          spaceBetween={10}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand1} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand2} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand3} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand4} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand5} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand6} alt="" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="aboutBrands">
              <img src={brand7} alt="" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default AboutPage;
