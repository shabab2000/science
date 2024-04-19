import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

export default function Learning() {
  const isLoggedIn = localStorage.getItem("uid");
  const [lesson, setLesson] = useState("");
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

  const checks = async () => {
    try {
      fetch(
        "https://sciquiz.cloud/app/learn_check_lesson.php?id=" +
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

  const onPretest = async () => {
    try {
      console.log("555");
      setShow(true);
      window.location.href = "/pretest/" + id;
      // fetch(
      //   "https://sciquiz.cloud/app/detail_check_lesson.php?id=" +
      //     id +
      //     "&uid=" +
      //     isLoggedIn
      // )
      //   .then((response) => response.json())
      //   .then((json) => setLes(json))
      //   .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    lessons();
    checks();
  }, []);

  //console.log(lesson);

  return (
    <div className="container">
      <Navbars />
      <Modal
        show={show}
        //onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>รอสักครู่</Modal.Title>
        </Modal.Header>
        <Modal.Body>กำลังโหลด...</Modal.Body>
      </Modal>
      <h3 className="pt-5 text-center">บทเรียน {id}</h3>
      <div className="row ">
        <div className="col-lg-8 col-12">
          <div style={{ textAlign: "center" }}>
            <div class="single-video">
              <iframe
                width="100%"
                height="330"
                src="https://www.youtube-nocookie.com/embed/8LWZSGNjuF0?rel=0&amp;controls=0&amp;showinfo=0"
                frameborder="0"
                allow="autoplay; encrypted-media"
                allowfullscreen=""
              ></iframe>
              {/* <iframe width="100%" height="450" class="embed-responsive-item" src="https://youtube.com/embed/<?php echo $rowe['youtube']; ?>?autoplay=1&mute=1" allowfullscreen></iframe> */}
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <ul className="list-group">
            <li className="list-group-item">บทที่ {lesson?.chapter}</li>
            <li className="list-group-item">เรื่อง {lesson?.title}</li>
            <li className="list-group-item">รายละเอียด {lesson?.details}</li>
            <li className="list-group-item">ระยะเวลา {lesson?.period}</li>
            <li className="list-group-item">
              สถานะ {" "}
              {les?.after ?
              <span className="badge text-bg-primary">ทำแบบทดสอบหลังเรียนแล้ว</span>
              
              :les?.afters ?
              <span className="badge text-bg-warning">ทำแบบทดสอบหลังเรียนยังไม่ผ่าน</span>
              :
              <span className="badge text-bg-warning">รอทำแบบทดสอบหลังเรียน</span>}
            </li>
          </ul>
          <div style={{ textAlign: "center" }}>
            {les?.before ==false ? (
              <button
                className="btn btn-warning mt-3"
                onClick={() => onPretest()}
              >
                ทำแบบทดสอบก่อนเรียน
              </button>
            ) : les?.after ? (
              <span className="badge text-bg-info">ทำแบบทดสอบหลังเรียนแล้ว</span>
            ):(
              <a href={"/posttest/"+id} className="btn btn-success mt-3">
                ทำแบบทดสอบหลังเรียน
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
