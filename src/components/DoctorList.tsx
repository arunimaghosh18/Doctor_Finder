import DoctorCard from "./DoctorCard";

interface Doctor {
  id: string;
  name: string;
  name_initials: string;
  specialty: string[];
  experience: string;
  fees: string;
  consultation_type: string;
  photo: string;
  doctor_introduction: string;
  languages: string[];
  clinic: {
    name: string;
    address: {
      locality: string;
      city: string;
      address_line1: string;
      location: string;
      logo_url: string;
    };
  };
  video_consult: boolean;
  in_clinic: boolean;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList = ({ doctors }: DoctorListProps) => {
  if (doctors.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-center">
        <div className="text-gray-500">
          <p className="text-xl font-medium">No doctors found</p>
          <p className="text-sm mt-1">Try adjusting your search filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} {...doctor} />
      ))}
    </div>
  );
};

export default DoctorList;
