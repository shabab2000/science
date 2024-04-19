import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  // ฟังก์ชันสร้างหมายเลขหน้า
  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = totalPages; // จำนวนหน้าที่จะแสดงใน Pagination

    // หาหน้าแรกที่จะแสดง
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));

    // หาหน้าสุดท้ายที่จะแสดง
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    // หาว่าหน้าแรกจะถูกแสดงในกรณีที่หน้าปัจจุบันไม่ใช่หน้าแรก
    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    // สร้างอาร์เรย์ของหมายเลขหน้า
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  // สร้างหมายเลขหน้า
  const pageNumbers = generatePageNumbers();

  return (
    <div>
      <div
        className="btn-group"
        role="group"
        aria-label="Basic outlined example"
      >
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          type="button"
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          ก่อนหน้า
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            disabled={currentPage === pageNumber}
            type="button"
            className={
              currentPage === pageNumber
                ? "btn btn-secondary"
                : "btn btn-outline-secondary"
            }
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
          className="btn btn-primary"
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}

export default function Pretest() {
  const isLoggedIn = localStorage.getItem("uid");
  const [lesson, setLesson] = useState("");
  const [questions, setQuestions] = useState([]);
  const [les, setLes] = useState("");
  const [show, setShow] = useState(false);

  let { id } = useParams();

  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  const lessons = async () => {
    try {
      fetch("https://sciquiz.cloud/app/detail_lesson.php?id=" + id)
        .then((response) => response.json())
        .then((json) => setLesson(json))
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  const Question = async () => {
    try {
      setShow(true);
      fetch("https://sciquiz.cloud/app/question.php?id=" + id)
        .then((response) => response.json())
        .then((json) => {
          setQuestions(json);
          setShow(false);
        })
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  const checks = async () => {
    try {
      fetch(
        "https://sciquiz.cloud/app/detail_check_lesson.php?id=" +
          id +
          "&uid=" +
          isLoggedIn
      )
        .then((response) => response.json())
        .then((json) => setLes(json))
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  const onSubmit = async () => {
    try {
      setShow(true);
      const formData = {
        uid: isLoggedIn,
        les_id: id,
        answer: selectedAnswer,
      };

      fetch("https://sciquiz.cloud/app/pre.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data === "success") {
            toast.success("ทำแบบทดสอบก่อนเรียนสำเร็จ!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              onClose: () => {
                window.location.href = "/learn/" + id; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
              },
            });
          } else {
            console.log("Error:", data);
            // จัดการกรณีไม่ผ่านตามต้องการ
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    lessons();
    checks();
    Question();
  }, []);

  //console.log(lesson);

  // สถานะของคำถามที่ถูกเลือก
  const [selectedAnswer, setSelectedAnswer] = useState({});
  // หน้าปัจจุบันของการทดสอบ
  const [currentPage, setCurrentPage] = useState(1);

  // ฟังก์ชันเมื่อเลือกตัวเลือกคำตอบ
  const handleOptionSelect = (questionId, selectedOption) => {
    setSelectedAnswer({ ...selectedAnswer, [questionId]: selectedOption });
  };

  // ฟังก์ชันสำหรับการย้ายไปยังหน้าถัดไป
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // ฟังก์ชันสำหรับการย้อนกลับไปที่หน้าก่อนหน้า
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const totalPages = questions.length; // จำนวนหน้าทั้งหมด

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  console.log(selectedAnswer);

  return (
    <div className="container">
      <Navbars />
      <Modal
        show={show}
        //onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header>
          <Modal.Title>รอสักครู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>กำลังโหลด...</Modal.Body>
      </Modal>
      <ToastContainer />
      <h3 className="pt-5 text-center">
        แบบทดสอบก่อนเรียนบทที่ {lesson?.chapter}
      </h3>
      <div className="row mt-5">
        <div className="col-12">
          <div className="col-lg-6 col-10 mx-auto">
            {questions.length > 0
              ? questions
                  .slice((currentPage - 1) * 1, currentPage * 1)
                  .map((question) => (
                    <div key={question.id}>
                      <h3>{question.question}</h3>
                      {question.options.map((option, index) => (
                        <div key={index} className="form-check">
                          <input
                            className="form-check-input"
                            onChange={() =>
                              handleOptionSelect(question.id, option)
                            }
                            checked={selectedAnswer[question.id] === option}
                            value={option}
                            type="radio"
                            name={`question-${question.id + index}`}
                            id={`question-${question.id + index}`}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`question-${question.id + index}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ))
              : ""}
          </div>
          <div className="mt-5" style={{ textAlign: "center" }}>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>

          <div className="mt-5" style={{ textAlign: "center" }}>
            <button
              onClick={() => onSubmit()}
              disabled={Object.keys(selectedAnswer).length !== questions.length}
              className="btn btn-success"
            >
              ส่งคำตอบ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
