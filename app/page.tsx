import Image from "next/image";
import LeadForm from './components/LeadForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <LeadForm />
    </main>
  );
}
