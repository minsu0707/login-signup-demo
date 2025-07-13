import { useEffect, useState } from "react";
import { UserType } from "../types/auth";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData) as UserType);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("user");
    console.log("로그인 화면으로 이동합니다.");

    navigate("/login");
  };

  return (
    <div>
      <div>
        <h2>대시보드</h2>
      </div>
      <div>
        <p>로그인이 성공했습니다!</p>
        <p>사용자 이메일: {user?.email}</p>
      </div>
      <div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};
