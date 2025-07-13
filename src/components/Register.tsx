import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";

export const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async () => {
    console.log("제출한 formdata", formData);
    console.log("API URL", import.meta.env.VITE_API_BASE_URL);

    setLoading(true);
    setError("");

    try {
      await register(formData.email, formData.password);
      navigate("/login");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h2>회원가입</h2>
      </div>
      <div>
        <div>
          <label>이메일:</label>
          <input
            name="email"
            onChange={handleChange}
            value={formData.email}
            type="email"
            required
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            name="password"
            onChange={handleChange}
            value={formData.password}
            type="password"
            required
          />
        </div>
        <div>
          <button onClick={handleSubmit} disabled={loading} type="submit">
            {loading ? "로딩 중..." : "회원가입"}
          </button>
        </div>
      </div>
      <div>
        {error && <div>{error}</div>}
        <p>
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
};
