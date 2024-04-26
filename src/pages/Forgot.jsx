import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");

  const [loading, setLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const [otps, setOtps] = useState(false);
  const [otp, setOtp] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const navigate = useNavigate();

  const validatePassword = () => {
    // ใช้ regular expression เพื่อตรวจสอบความแข็งของรหัสผ่าน
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const isValid = validatePassword();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!email) {
        toast.warning("กรุณากรอกอีเมลที่ลงทะเบียน!", {
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
        toast.warning("กรุณากรอกเบอร์โทรศัพท์ที่ลงทะเบียน!", {
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
        fetch("https://sciquiz.cloud/app/forgot.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            tel: tel,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            setLoading(false);
            if (responseJson.result === "success") {
              setOtps(true);
              setUid(responseJson.user.id);
            } else {
              setLoading(false);
              toast.warning(responseJson.result, {
                position: "top-right",
                autoClose: 3000,
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

  const handleOtp = async (event) => {
    event.preventDefault();

    try {
      if (!otp) {
        toast.warning("กรุณากรอกรหัส OTP!", {
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
        fetch("https://sciquiz.cloud/app/otp.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp: otp,
            uid: uid,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "success") {
                setLoading(false);
              toast.success("OTP ถูกต้อง!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                   setOtps(false);
                   setReset(true);
                },
              });
            } else {
              setLoading(false);
              toast.warning(responseJson.result, {
                position: "top-right",
                autoClose: 3000,
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

  const handleSubmits = async (event) => {
    event.preventDefault();

    try {
      if (!password) {
        toast.warning("กรุณากรอกรหัสผ่านใหม่!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (!repassword) {
        toast.warning("กรุณากรอกยืนยันรหัสผ่านใหม่!", {
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
        toast.warning(
          "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว และประกอบด้วยตัวอักษรตัวเลขและสัญลักษณ์ !",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
      } else if (password !== repassword) {
        toast.warning("กรุณากรอกยืนยันรหัสผ่านให้ตรงกัน!", {
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
        fetch("https://sciquiz.cloud/app/reset.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
            uid: uid,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            if (responseJson === "success") {
              toast.success("เปลี่ยนรหัสผ่านสำเร็จ!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                  window.location.href = "/login"; // ส่งผู้ใช้ไปยังหน้าเพจ /learn
                },
              });
            } else {
              setLoading(false);
              toast.warning(responseJson.result, {
                position: "top-right",
                autoClose: 3000,
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
          {otps ? (
            <form className="Auth-form" onSubmit={handleOtp}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title text-center">ยืนยัน OTP</h3>
                <div className="form-group mt-3">
                  <label>กรอก OTP</label>
                  <input
                    name="otp"
                    value={otp}
                    type="number"
                    className="form-control mt-1"
                    placeholder="กรอก OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    style={{
                        WebkitAppearance: 'none', /* ซ่อนลูกศรใน Chrome, Safari */
                        MozAppearance: 'textfield', /* กำหนดลูกศรแบบเป็นช่องข้อความใน Firefox */
                    }}
                  />
                </div>
                
                <div className="d-grid gap-2 mt-3">
                  {loading ? (
                    <button disabled type="button" className="btn btn-info">
                      รอซักครู่...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-info">
                      ยืนยัน OTP
                    </button>
                  )}
                </div>
                <p className="forgot-password text-right mt-2">
                  กลับไป <a href="/login">เข้าสู่ระบบ</a>
                </p>
              </div>
            </form>
          ) : reset ? (
            <form className="Auth-form" onSubmit={handleSubmits}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title text-center">รีเซ็ตรหัสผ่าน</h3>
                <div className="form-group mt-3">
                  <label>รหัสผ่านใหม่</label>
                  <input
                    name="password"
                    value={password}
                    type="password"
                    className="form-control mt-1"
                    placeholder="กรอกรหัสผ่านใหม่"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>ยืนยันรหัสผ่าน</label>
                  <input
                    name="repassword"
                    value={repassword}
                    type="password"
                    className="form-control mt-1"
                    placeholder="กรอกยืนยันรหัสผ่าน"
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  {loading ? (
                    <button disabled type="button" className="btn btn-info">
                      รอซักครู่...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-info">
                      รีเซ็ตรหัสผ่าน
                    </button>
                  )}
                </div>
                <p className="forgot-password text-right mt-2">
                  กลับไป <a href="/login">เข้าสู่ระบบ</a>
                </p>
              </div>
            </form>
          ) : (
            <form className="Auth-form" onSubmit={handleSubmit}>
              <div className="Auth-form-content">
                <h3 className="Auth-form-title text-center">ลืมรหัสผ่าน</h3>
                <div className="form-group mt-3">
                  <label>อีเมล</label>
                  <input
                    type="email"
                    className="form-control mt-1"
                    placeholder="กรอกอีเมลที่ลงทะเบียน"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group mt-3">
                  <label>เบอร์โทรศัพท์</label>
                  <input
                    type="phone"
                    maxLength={10}
                    minLength={10}
                    className="form-control mt-1"
                    placeholder="กรอกเบอร์โทรศัพท์ที่ลงทะเบียน"
                    onChange={(e) => setTel(e.target.value)}
                  />
                </div>
                <div className="d-grid gap-2 mt-3">
                  {loading ? (
                    <button disabled type="button" className="btn btn-primary">
                      รอซักครู่...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary">
                      ลืมรหัสผ่าน
                    </button>
                  )}
                </div>
                <p className="forgot-password text-right mt-2">
                  กลับไป <a href="/login">เข้าสู่ระบบ</a>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
