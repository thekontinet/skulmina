"use client";
import DashboardLayout from "@/components/layout.tsx/dashboardLayout";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
import { ExamType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";

const ExaminationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth({ middleware: "auth" });

  const Exams: ExamType[] = [];

  return (
    <DashboardLayout>
      <section className="p-4 text-center md:text-left md:px-12 md:py-8 w-full md:block flex flex-col  ">
        <h1 className="text-2xl font-bold md:text-4xl md:font-extrabold mb-14">
          Web Development (Introduction to Node.js)
        </h1>
        <div className="space-y-5 mb-14">
          <h1 className="text-xl md:text-2xl font-semibold">
            Exam Description
          </h1>
          <h1>
            Lorem ipsum dolor sit amet consectetur. Auctor placerat consectetur
            sagittis a enim. Nulla pharetra in vulputate blandit. Non porta vel
            sit dictum. Risus aliquet sed arcu augue. Lacus diam mauris a nulla
            dignissim velit id vitae. Velit magna consequat at sit massa
            consectetur. Quis fames lectus porta leo amet. Interdum in et
            laoreet massa. Tortor amet arcu malesuada mattis fringilla tellus.
            Vestibulum morbi massa amet vulputate sem felis egestas odio.
            Viverra in cursus a id dolor. Nibh imperdiet velit tincidunt rhoncus
            aliquam vel et. Quam varius tellus adipiscing commodo purus accumsan
            condimentum aliquam. Semper amet habitasse fringilla egestas amet
            praesent tincidunt. A quis sem viverra posuere. Et netus massa
            sollicitudin sed sollicitudin posuere ut nunc adipiscing. Facilisis
            rhoncus aliquet orci purus. Gravida non nisi accumsan amet. Aenean
            cum enim semper enim sapien egestas egestas elementum.
          </h1>
        </div>
        {user?.role === "teacher" ? (
          <Button className="w-full md:w-fit md:float-right">
            <Link href={`/examinations/${id}/edit`}>Edit Examination</Link>
          </Button>
        ) : (
          <Button className="w-full md:w-fit md:float-right">
            <Link href={`/examinations/${id}/start`}>Start Examination</Link>
          </Button>
        )}
      </section>
    </DashboardLayout>
  );
};

export default ExaminationDetails;
