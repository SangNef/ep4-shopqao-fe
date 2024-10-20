import React, { useState } from 'react';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import { FacebookOutlined, TwitterOutlined, MailOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api/auth';

const { Title, Paragraph } = Typography;

const Login = () => {
    const navigate = useNavigate();
    const [error, setError] = useState(null); // State để lưu lỗi

    const onFinish = async (values) => {
        try {
            const response = await login(values);
            console.log(response);

            // Giả sử response có một thuộc tính `status` để kiểm tra trạng thái
            if (response.status === 400) {
                setError("Invalid data. Please try again.");
            } else {
                // Lưu user vào localStorage
                localStorage.setItem("user", JSON.stringify(response));
                navigate("/"); // Điều hướng về trang chính
            }
        } catch (error) {
            console.error("Error during login:", error);
            // Cập nhật state lỗi để hiển thị thông báo lỗi
            setError(error.response?.data || "Login failed. Please try again.");
        }
    };

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
                    {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>} {/* Hiển thị thông báo lỗi nếu có */}

                    <Form onFinish={onFinish}>
                        <div style={styles.socialSignIn}>
                            <Title level={4} style={styles.signInTitle}>Sign in with</Title>
                            <Button shape="circle" icon={<FacebookOutlined />} style={styles.socialButton} />
                            <Button shape="circle" icon={<TwitterOutlined />} style={styles.socialButton} />
                            <Button shape="circle" icon={<MailOutlined />} style={styles.socialButton} />
                        </div>

                        <div style={styles.divider}>
                            <Paragraph style={styles.dividerText}>Or</Paragraph>
                        </div>

                        {/* Username input */}
                        <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                            <Input placeholder="Enter your username" />
                        </Form.Item>

                        {/* Password input */}
                        <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                            <Input.Password placeholder="Enter password" />
                        </Form.Item>

                        <div style={styles.checkboxContainer}>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a href="#!" style={styles.forgotPassword}>Forgot password?</a>
                        </div>

                        <div style={styles.buttonContainer}>
                            <Button type="primary" htmlType='submit' style={styles.loginButton}>Login</Button>
                            <Paragraph style={styles.registerText}>
                                Don't have an account? <Link to="/register" style={styles.registerLink}>Register</Link>
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
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        padding: '20px',
    },
    imageContainer: {
        flex: 1,
        padding: '10px',
    },
    image: {
        maxWidth: '100%',
        height: 'auto',
    },
    formContainer: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    socialSignIn: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    signInTitle: {
        margin: '0 10px 0 0',
    },
    socialButton: {
        marginLeft: '10px',
    },
    divider: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 0',
    },
    dividerText: {
        margin: '0',
    },
    checkboxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    forgotPassword: {
        color: '#1890ff',
    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    loginButton: {
        width: '100%',
        padding: '10px',
    },
    registerText: {
        marginTop: '10px',
    },
    registerLink: {
        color: '#ff4d4f',
    },
};

export default Login;
