import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";

export default function Home() {
  const isLoggedIn = localStorage.getItem("uid");
  const [lesson, setLesson] = useState("");

  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  const lessons = async () => {
    try {
      fetch("https://sciquiz.cloud/app/lesson.php")
        .then((response) => response.json())
        .then((json) => setLesson(json))
        .catch((error) => console.error(error));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    lessons();
  }, []);

  //console.log(lesson);

  return (
    <div className="container">
      <Navbars />
      <h3 className="pt-5 text-center">บทเรียนทั้งหมด</h3>
      <div className="row mt-3">
      
        {lesson
          ? lesson.map((les) => (
              <div key={les.id} className="col-lg-3 col-12">
                <div className="card mb-3">
                  <img src={les?.img} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">บทที่ {les.chapter}</h5>
                    <p className="card-text">{les.title}</p>
                    <a href={`/details/${les.id}`} className="btn btn-primary">
                      รายละเอียด
                    </a>
                  </div>
                </div>
              </div>
            ))
          : ""}
      
      </div>
    </div>
  );
}
