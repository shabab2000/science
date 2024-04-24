import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tel, setTel] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const validatePassword = () => {
    // ใช้ regular expression เพื่อตรวจสอบความแข็งของรหัสผ่าน
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const isValid = validatePassword();


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!name) {
        toast.warning("กรุณากรอกชื่อ-สกุล!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!email) {
        toast.warning("กรุณากรอกอีเมล!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!password) {
        toast.warning("กรุณากรอกรหัสผ่าน !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!isValid) {
        toast.warning("รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และประกอบด้วยตัวอักษรตัวเลขและสัญลักษณ์ !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!tel) {
        toast.warning("กรุณากรอกเบอร์โทรศัพท์ !", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        setLoading(true);
        fetch("https://sciquiz.cloud/app/register.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            tel: tel,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            
            if (responseJson === "success") {
              setName("");
              setEmail("");
              setTel("");
              setPassword("");
              toast.success("ลงทะเบียนสำเร็จ!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.href = "/login" ; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
                },
              });
            } else {
              setLoading(false);
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

  return (
    <div className="container">
      <ToastContainer />
      <div className="row pt-5">
        <div className="col-10 col-lg-6 mx-auto">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title text-center">ลงทะเบียน</h3>
              <div className="form-group mt-3">
                <label>ชื่อ-สกุล</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="กรอกชื่อสกุล"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>อีเมล</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  placeholder="กรอกอีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>รหัสผ่าน</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="กรอกรหัสผ่าน"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group mt-3">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  className="form-control mt-1"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  value={tel}
                  maxLength={10}
                  onChange={(e) => setTel(e.target.value)}
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                {loading ? (
                  <button type="button" disabled className="btn btn-primary">
                    รอซักครู่...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary">
                    ลงทะเบียน
                  </button>
                )}
              </div>
              <p className="forgot-password text-right mt-2">
                มีบัญชีแล้ว ? <a href="/login">เข้าสู่ระบบ</a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
