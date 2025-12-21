import { Header } from "../components/Header";

export default function HostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full flex flex-col">
      <Header />
      <div className="w-full flex-1">{children}</div>
    </div>
  )
}