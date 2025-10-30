import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import family from "../assets/family.png";
import family2 from "../assets/family2.png";
import family3 from "../assets/family3.png";
import familyBg from "../assets/family-bg.png";

const images = [
  { src: family, caption: "Keluarga adalah tempat pertama kita belajar arti cinta dan kebersamaan." },
  { src: family2, caption: "Hubungan darah tak hanya soal keturunan, tapi juga ikatan hati yang abadi." },
  { src: family3, caption: "Setiap nama dalam silsilah membawa cerita dan perjuangan yang tak ternilai." },
];

export default function HomePage() {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section
        className="position-relative d-flex flex-column justify-content-center align-items-center text-center"
        style={{ height: "90vh" }}
      >
        <img
          src={familyBg}
          alt="Family Background"
          className="position-absolute w-100 h-110"
          style={{ objectFit: "cover", opacity: 0.3, zIndex: -1 }}
        />
        <h1 className="display-4 fw-bold text-primary">
          Selamat Datang di <span className="text-dark">ICR Pedigree</span>
        </h1>
        <p className="lead text-primary mt-3">
          Lacak, pahami, dan abadikan garis keturunan Anda secara digital.
        </p>
      </section>


      {/* ===== INTRO TEXT SECTION ===== */}
      <section className="py-5 bg-light text-center">
        <div className="container">
          <h2 className="display-6 text-primary mb-4">Kenali Garis Keturunan Anda</h2>
          <p className="lead text-secondary mb-3">
            ICR Pedigree hadir untuk membantu Anda memetakan dan memahami akar keluarga dengan cara yang modern, aman, dan mudah diakses.
            Sistem ini memungkinkan Anda menyimpan informasi penting tentang setiap anggota keluarga, mulai dari nama, tanggal lahir, hingga hubungan antar anggota keluarga.
          </p>
          <p className="lead text-secondary mb-3">
            Dengan platform digital ini, Anda tidak hanya mengabadikan sejarah keluarga, tetapi juga mempermudah pencarian informasi
            bagi generasi mendatang. Setiap data tersimpan dengan rapi dan dapat diperbarui secara berkala sesuai perubahan keluarga.
          </p>
          <p className="lead text-secondary mb-3">
            ICR Pedigree juga membantu Anda melihat pola hubungan keluarga, melacak garis keturunan, dan memahami bagaimana sejarah keluarga
            membentuk identitas Anda. Semua ini dilakukan dengan tampilan yang intuitif, desain yang bersih, dan navigasi yang mudah digunakan.
          </p>
          <p className="lead text-secondary mb-0">
            Mulai dari keluarga inti hingga garis keturunan yang lebih luas, ICR Pedigree menjadi alat yang tepat untuk menjaga warisan
            keluarga agar tetap hidup, dikenang, dan dapat diakses kapan saja oleh setiap anggota keluarga.
          </p>
        </div>
      </section>


      {/* ===== CAROUSEL SECTION ===== */}
      <section className="py-5 d-flex justify-content-center">
        <div className="position-relative" style={{ width: "90%", maxWidth: "900px", height: "450px" }}>
          {images.map((item, index) => (
            <div
              key={index}
              className={`position-absolute w-100 h-100 d-flex flex-column justify-content-center align-items-center ${index === current ? "d-flex" : "d-none"
                }`}
            >
              <img
                src={item.src}
                alt={`Slide ${index}`}
                className="w-100 h-100 rounded-3"
                style={{ objectFit: "cover" }}
              />
              <div
                className="position-absolute bottom-0 w-100 text-white text-center p-3"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  borderBottomLeftRadius: "1rem",
                  borderBottomRightRadius: "1rem",
                }}
              >
                <p className="fst-italic">{item.caption}</p>
              </div>
            </div>
          ))}
          <button onClick={prevSlide} className="btn btn-light position-absolute top-50 start-0 translate-middle-y">
            &#10094;
          </button>
          <button onClick={nextSlide} className="btn btn-light position-absolute top-50 end-0 translate-middle-y">
            &#10095;
          </button>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="display-5 text-primary mb-3">Tentang ICR Pedigree</h2>
          <p className="text-secondary lead">
            ICR Pedigree hadir untuk membantu Anda mengenal akar keluarga dengan mudah dan modern.
            Kami berkomitmen untuk menjaga jejak keturunan agar dapat diwariskan lintas generasi
            dengan tampilan digital yang elegan dan aman.
          </p>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-5 text-center text-white" style={{ backgroundColor: "#0d6efd" }}>
        <h3 className="display-6 mb-3">Mulai Lacak Keluarga Anda Sekarang</h3>
        <p className="lead mb-4">Bangun, simpan, dan kenali akar keluarga Anda bersama kami.</p>
        <a href="/register" className="btn btn-light btn-lg">
          Daftar Sekarang
        </a>
      </section>
    </div>
  );
}
