import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Thêm state để hiển thị lỗi
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Xóa lỗi trước khi thử đăng nhập

    const response = await fetch("https://opulent-space-system-97554gv97rr43xw97-4000.app.github.dev/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation {
            login(input: { username: "${username}", password: "${password}" }) {
              success
              message
              data {
                jwt
              }
            }
          }
        `,
      }),
    });

    const result = await response.json();

    if (result.data?.login?.success) {
      const token = result.data.login.data.jwt;
      localStorage.setItem("token", token); // Lưu token vào localStorage
      navigate("/souvenirs"); // Chuyển hướng sau khi đăng nhập thành công
    } else {
      setError(result.data?.login?.message || "Sai tài khoản hoặc mật khẩu!");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">Đăng nhập</h2>
      {error && <p className="text-red-500">{error}</p>}
      <input
        type="text"
        className="border p-2 w-full mb-2"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Tên đăng nhập"
      />
      <input
        type="password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded w-full"
      >
        Đăng nhập
      </button>
    </div>
  );
}
