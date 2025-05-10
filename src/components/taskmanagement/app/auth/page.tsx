import AuthForm from "../../components/auth-form";  // Corrected relative import

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <AuthForm />
    </div>
  );
}
