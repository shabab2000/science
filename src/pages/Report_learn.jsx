import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import moment from "moment";

export default function Report_learn() {
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
      fetch("https://sciquiz.cloud/app/report_learn.php?uid=" + isLoggedIn)
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
      <h3 className="pt-5 text-center">ประวัติการเข้าเรียน</h3>
      <div className="row ">
        <div className="col-11 col-lg-12 mx-auto">
          {lesson.length <= 0 ? (
            <div className="alert alert-warning" role="alert">
              ยังไม่มีประวัติการเข้าเรียน!
            </div>
          ) : (
            <div className="list-group mt-3">
              <div class="table-responsive">
                <table class="table table-striped table-bordered">
                  <thead>
                    <tr>
                      <th scope="col" className="text-center text-nowrap">
                        #
                      </th>
                      <th scope="col" className="text-center text-nowrap">
                        บทเรียน
                      </th>
                      <th scope="col" className="text-center text-nowrap">
                        สถานะ
                      </th>
                      <th scope="col" className="text-center text-nowrap">
                        วันที่เรียน
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {lesson
                      ? lesson.map((les, key) => (
                          <tr key={les.id}>
                            <th className="text-center text-nowrap" scope="row">
                              {key + 1}
                            </th>
                            <td className="text-center text-nowrap">
                              {les.name}
                            </td>
                            <td className="text-center text-nowrap">
                              {les.status === "learn" ? (
                                <span className="badge rounded-pill text-bg-warning">
                                  กำลังเรียน
                                </span>
                              ) : les.status === "after" ? (
                                <span className="badge rounded-pill text-bg-info">
                                  ทำแบบทดสอบหลังเรียน
                                </span>
                              ) : (
                                <span className="badge rounded-pill text-bg-success">
                                  เรียนแล้ว
                                </span>
                              )}
                            </td>
                            <td className="text-center text-nowrap">
                              {les.date}
                            </td>
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
