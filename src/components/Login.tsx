import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    console.log("제출한 formData", formData);
    console.log("요청 URL", import.meta.env.VITE_API_BASE_URL);

    setLoading(true);
    setError("");

    try {
      const response = await login(formData.email, formData.password);
      console.log("로그인 성공", response.token);

      localStorage.setItem("user", JSON.stringify(response.user));
      localStorage.setItem("token", response.token);

      navigate("/dashboard");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>로그인</h2>
      </div>
      <div>
        <div>
          <label>이메일</label>
          <input
            onChange={handleChange}
            value={formData.email}
            name="email"
            type="email"
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            onChange={handleChange}
            value={formData.password}
            name="password"
            type="password"
          />
        </div>
        <div>
          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "로딩 중..." : "로그인"}
          </button>
        </div>
      </div>
      {error && <div>{error}</div>}
      <div>
        <p>
          계정이 없으신가요? <Link to="/register">회원가입</Link>
        </p>
      </div>
    </div>
  );
};
