/**
 * Auth Layout — tối giản, không header/sidebar.
 * Chỉ căn giữa nội dung (form login/register) trên nền gradient.
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      {children}
    </div>
  );
}
