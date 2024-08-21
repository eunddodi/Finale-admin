import { login } from "@/api/auth";

export default async function Login() {
  await login()
  return (
    <div>
      <h1>카카오톡 로그인 화면으로 이동 중입니다</h1>
    </div>
  );
}
