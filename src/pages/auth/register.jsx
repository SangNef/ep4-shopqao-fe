import React, { useEffect, useState } from "react"; // Thêm useState
import { Button, Checkbox, Form, Input, Typography } from "antd";
import { FacebookOutlined, TwitterOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const { Title, Paragraph } = Typography;

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null); // State để lưu lỗi

  const onFinish = async (values) => {
    try {
      const response = await register(values);
      console.log(response);
      if (response.status === 400) {
        setError("Invalid data. Please try again.");
      } else {
        localStorage.setItem("user", JSON.stringify(response));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      // Cập nhật state lỗi để hiển thị thông báo lỗi
      setError(error.response?.data || "Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    document.title = "Register - XShop";
  }, []);

  return (
    <section style={styles.section}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            style={styles.image}
            alt="Sample"
          />
        </div>
        <div style={styles.formContainer}>
          {error && <div style={{ color: "red" }}>{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}
          <div style={styles.socialSignIn}>
            <Title level={4} style={styles.signInTitle}>
              Register with
            </Title>
            <Button shape="circle" icon={<FacebookOutlined />} style={styles.socialButton} />
            <Button shape="circle" icon={<TwitterOutlined />} style={styles.socialButton} />
            <Button shape="circle" icon={<MailOutlined />} style={styles.socialButton} />
          </div>
          <div style={styles.divider}>
            <Paragraph style={styles.dividerText}>Or</Paragraph>
          </div>
          <Form onFinish={onFinish}>
            {/* Full Name input */}
            <Form.Item name="fullname" rules={[{ required: true, message: "Please input your full name!" }]}>
              <Input placeholder="Full Name" size="large" />
            </Form.Item>

            {/* Email input */}
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "The input is not valid E-mail!" },
              ]}
            >
              <Input placeholder="Enter a valid email address" size="large" />
            </Form.Item>

            {/* Username input */}
            <Form.Item name="username" rules={[{ required: true, message: "Please input your username!" }]}>
              <Input placeholder="Username" size="large" />
            </Form.Item>

            {/* Password input */}
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input.Password placeholder="Enter password" size="large" />
            </Form.Item>

            {/* Confirm Password input */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("The two passwords that you entered do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" size="large" />
            </Form.Item>

            <div style={styles.checkboxContainer}>
              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[{ required: true, message: "You must accept the terms and conditions" }]}
              >
                <Checkbox>I have read the terms and conditions</Checkbox>
              </Form.Item>
            </div>

            <div style={styles.buttonContainer}>
              <Button htmlType="submit" type="primary" style={styles.registerButton}>
                Register
              </Button>
              <Paragraph style={styles.loginText}>
                Already have an account?{" "}
                <Link to="/login" style={styles.loginLink}>
                  Login
                </Link>
              </Paragraph>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    padding: "20px",
  },
  imageContainer: {
    flex: 1,
    padding: "10px",
  },
  image: {
    maxWidth: "100%",
    height: "auto",
  },
  formContainer: {
    flex: 1,
    padding: "20px",
    backgroundColor: "#f5f5f5",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  socialSignIn: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  signInTitle: {
    margin: "0 10px 0 0",
  },
  socialButton: {
    marginLeft: "10px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0",
  },
  dividerText: {
    margin: "0",
  },
  checkboxContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  registerButton: {
    width: "100%",
    padding: "10px",
  },
  loginText: {
    marginTop: "10px",
  },
  loginLink: {
    color: "#ff4d4f",
  },
};

export default Register;
