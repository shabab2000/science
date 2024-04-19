import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import moment from "moment";

export default function Report_quiz() {
  const isLoggedIn = localStorage.getItem("uid");
  const [lesson, setLesson] = useState("");
  const date = "2022-04-10 20:00:00";
  const formattedDate = moment(date).locale("th").fromNow();

  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  const lessons = async () => {
    try {
      fetch("https://sciquiz.cloud/app/report_quiz.php?uid=" + isLoggedIn)
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

  console.log(formattedDate);

  return (
    <div className="container">
      <Navbars />
      <h3 className="pt-5 text-center">ประวัติการทำแบบทดสอบ</h3>
      <div className="row ">
      <div className="col-11 col-lg-12 mx-auto">
        {lesson.length <= 0 ? (
          <div className="alert alert-warning" role="alert">
            ยังไม่มีการแจ้งเตือน!
          </div>
        ) : (
          <div className="list-group mt-3 ">
            <div class="table-responsive">
              <table class="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th className="text-center" scope="col">#</th>
                    <th className="text-center text-nowrap" scope="col">บทเรียน</th>
                    <th className="text-center text-nowrap" scope="col">ประเภท</th>
                    <th className="text-center text-nowrap" scope="col">คะแนน</th>
                    <th className="text-center text-nowrap" scope="col">สถานะ</th>
                    <th className="text-center text-nowrap" scope="col">วันที่ทำแบบทดสอบ</th>
                  </tr>
                </thead>
                <tbody>
                  {lesson
                    ? lesson.map((les, key) => (
                        <tr key={les.id}>
                          <th className="text-center" scope="row">{key+1}</th>
                          <td className="text-center text-nowrap">{les.name}</td>
                          <td className="text-center text-nowrap">{les.types ==='before'? 'ก่อนเรียน':'หลังเรียน'}</td>
                          <td className="text-center text-nowrap">{les.score}/{les.full} คะแนน</td>
                          <td className="text-center text-nowrap">
                            {les.status === "ผ่าน"
                              ? <span class="badge rounded-pill text-bg-success">ผ่าน</span>
                              : <span class="badge rounded-pill text-bg-warning">ไม่ผ่าน</span>
                              }
                          </td>
                          <td className="text-center text-nowrap">{les.date}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
