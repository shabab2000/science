import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import moment from "moment";

export default function Notification() {
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
      fetch("https://sciquiz.cloud/app/notification.php?uid=" + isLoggedIn)
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

  //console.log(formattedDate);

  return (
    <div className="container">
      <Navbars />
      <h3 className="pt-5 text-center">การแจ้งเตือน</h3>
      <div className="row ">
      <div className="col-11 col-lg-12 mx-auto">
        {lesson.length <= 0 ? (
          <div className="alert alert-warning" role="alert">
            ยังไม่มีการแจ้งเตือน!
          </div>
        ) : (
          <div className="list-group mt-3">
            {lesson
              ? lesson.map((les) => (
                  <a key={les.id}
                    href="#"
                    className="list-group-item list-group-item-action "
                    aria-current="true"
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{les.name}</h5>
                      <small>{moment(les.date).locale("th").fromNow()}</small>
                    </div>
                    <p className="mb-1">
                      {les.details}
                    </p>
                   
                  </a>
                ))
              : ""}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
