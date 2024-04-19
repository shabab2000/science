import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email) {
        toast.warning("กรุณากรอกอีเมล !", {
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
      } else {
        setLoading(true);
        fetch("https://sciquiz.cloud/app/login.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
           
            if (responseJson.result === "success") {
              localStorage.setItem("uid", responseJson.user.id);
              setEmail("");
              setPassword("");
              toast.success("เข้าสู่ระบบสำเร็จ!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.href = "/" ; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
                },
              });
            } else {
              setLoading(false);
              toast.warning(responseJson.result, {
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

  return (
    <div className="container">
      <ToastContainer />
      <div className="row pt-5">
        <div className="col-10 col-lg-6 mx-auto">
          <form className="Auth-form" onSubmit={handleSubmit}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title text-center">เข้าสู่ระบบ</h3>
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
              <div className="d-grid gap-2 mt-3">
                {loading ? (
                  <button disabled type="button" className="btn btn-success">
                    รอซักครู่...
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success">
                    เข้าสู่ระบบ
                  </button>
                )}
              </div>
              <div className="row">
                <div className="col-6">
                  <p className="forgot-password mt-3">
                    ยังไม่ลงทะเบียน ?<a href="/register"> ลงทะเบียน </a>
                  </p>
                </div>
                <div className="col-6" style={{textAlign:"right"}}>
                  <p className="forgot-password mt-3">
                    <a href="/forgot">ลืมรหัสผ่าน?</a>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
