import React, { useState, useEffect } from "react";
import Navbars from "../Navbar";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
  const isLoggedIn = localStorage.getItem("uid");
  const [lesson, setLesson] = useState("");
  const [les, setLes] = useState("");
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleInputChanges = (e, setState) => {
    setState(e.target.value);
  };

  let { id } = useParams();

  if (!isLoggedIn) {
    window.location.href = "/login";
    return null;
  }

  const [user, setUser] = useState("");

  const load = async () => {
    try {
      let uid = await localStorage.getItem("uid");
      console.log("uid: " + uid);
      if (uid !== null) {
        //setEmail(email)
        fetch("https://sciquiz.cloud/app/profile.php?uid=" + uid)
          .then((response) => response.json())
          .then((json) => setUser(json))
          .catch((error) => console.error(error));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdateProfile = () => {
    try {
      if (!user.name) {
        alert("กรุณากรอกชื่อ-สกุล!");
      } else if (!user.email) {
        alert("กรุณากรอกอีเมล!");
      } else if (!user.tel) {
        alert("กรุณากรอกเบอร์โทรศัพท์ !");
      } else if (user.tel.length !== 10) {
        alert("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 ตัว !");
      } else {
        setShow(true);
        fetch("https://sciquiz.cloud/app/update_profile.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: user.name,
            email: user.email,
            tel: user.tel,
            uid: isLoggedIn,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setShow(false);
            console.log(responseJson);
            if (responseJson === "success") {
              toast.success("แก้ไขโปรไฟล์สำเร็จ!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.href = "/profile/"; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
                },
              });
            } else {
              setShow(false);
              alert("แจ้งเตือน!", responseJson);
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    } catch (error) {
      console.error("มีข้อผิดพลาดในการเชื่อมต่อ API:", error);
    }
  };

  const handleChangePassword = () => {
    try {
      if (!currentPassword) {
        toast.warning("กรุณากรอกรหัสผ่านปัจจุบัน!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!newPassword) {
        toast.warning("กรุณากรอกรหัสผ่านใหม่ !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!confirmNewPassword) {
        toast.warning("กรุณากรอกยืนยันรหัสผ่านใหม่ !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (newPassword !== confirmNewPassword) {
        toast.warning("กรุณากรอกยืนยันรหัสผ่านให้ตรงกัน !", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setShow(true);
        fetch("https://sciquiz.cloud/app/update_password.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: currentPassword,
            new_password: newPassword,
            uid: isLoggedIn,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson.result === "success") {
              toast.success("แก้ไขรหัสผ่านสำเร็จ!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.href = "/profile/"; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
                },
              });
            } else {
              setShow(false);
              toast.error(responseJson.result, {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    } catch (error) {
      console.error("มีข้อผิดพลาดในการเชื่อมต่อ API:", error);
    }
  };

  useEffect(() => {
    load();
  }, []);

  console.log(currentPassword);

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
      <div className="container">
        <div className="main-body mt-5">
          <h3 style={{ textAlign: "center" }}>โปรไฟล์</h3>
          <div className="row ">
            <div className="col-lg-4 ">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar6.png"
                      alt="Admin"
                      className="rounded-circle p-1 bg-primary"
                      width="110"
                    />
                    <div className="mt-3">
                      <h4>{user?.name}</h4>
                      <p className="text-secondary mb-1">{user?.email}</p>
                      <p className="text-muted font-size-sm">{user?.tel}</p>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
            </div>
            <div className="col-lg-8 ">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">ชื่อ</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={user?.name}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">อีเมล</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        value={user?.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">เบอร์โทรศัพท์</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        name="tel"
                        type="number"
                        className="form-control"
                        value={user?.tel}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <button
                        onClick={() => handleUpdateProfile()}
                        type="button"
                        className="btn btn-success px-4"
                      >
                        แก้ไขโปรไฟล์
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card mt-3">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">รหัสผ่านปัจจุบัน</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="กรอกรหัสผ่านปัจจุบัน"
                        //value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">รหัสผ่านใหม่</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="กรอกรหัสผ่านใหม่"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">ยืนยันรหัสผ่านใหม่</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="กรอกยืนยันรหัสผ่านใหม่"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-9 text-secondary">
                      <button
                        onClick={() => handleChangePassword()}
                        type="button"
                        className="btn btn-primary px-4"
                      >
                        เปลี่ยนรหัสผ่าน
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
