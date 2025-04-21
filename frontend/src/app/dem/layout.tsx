import { AuthProvider } from "./_providers/AuthProvider";
import { DataProvider } from "./_providers/DataProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-gray-100">
          {/* ここに共通のナビゲーションやサイドバーを入れることも可能 */}
          {children}
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
