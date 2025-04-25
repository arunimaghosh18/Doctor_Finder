
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import SearchBar from "@/components/SearchBar";
import FilterPanel from "@/components/FilterPanel";
import DoctorList from "@/components/DoctorList";

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

interface ApiDoctor {
  id: string;
  name: string;
  name_initials: string;
  specialities: Array<{ name: string }>;
  experience: string;
  fees: string;
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

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allDoctors, setAllDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter state
  const [searchTerm, setSearchTerm] = useState(searchParams.get("name") || "");
  const [consultationType, setConsultationType] = useState<string | null>(
    searchParams.get("consultation")
  );
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialties")
      ? searchParams.get("specialties")!.split(",")
      : []
  );
  const [sortBy, setSortBy] = useState<string | null>(
    searchParams.get("sort") || null
  );
  
  // Get unique specialties from the data
  const [allSpecialties, setAllSpecialties] = useState<string[]>([]);

  // Function to convert API data to our app format
  const transformApiData = (apiData: ApiDoctor[]): Doctor[] => {
  return apiData.map(doctor => ({
    id: doctor.id,
    name: doctor.name,
    name_initials: doctor.name_initials,
    specialty: doctor.specialities.map(spec => spec.name),
    experience: doctor.experience,
    fees: doctor.fees,
    consultation_type: doctor.video_consult && doctor.in_clinic ? "Both" : 
                      doctor.video_consult ? "Video Consult" : "In Clinic",
    photo: doctor.photo,
    doctor_introduction: doctor.doctor_introduction,
    languages: doctor.languages,
    clinic: doctor.clinic,
    video_consult: doctor.video_consult,
    in_clinic: doctor.in_clinic
  }));
};

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        const transformedData = transformApiData(data);
        setAllDoctors(transformedData);
        
        // Extract unique specialties
        const specialtiesSet = new Set<string>();
        transformedData.forEach((doctor: Doctor) => {
          if (doctor.specialty && Array.isArray(doctor.specialty)) {
            doctor.specialty.forEach((spec: string) => {
              specialtiesSet.add(spec);
            });
          }
        });
        setAllSpecialties(Array.from(specialtiesSet).sort());
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
        toast.error("Failed to load doctors data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Apply filters and update URL
  useEffect(() => {
    if (allDoctors.length === 0) return;

    let filtered = [...allDoctors];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (consultationType) {
      filtered = filtered.filter((doctor) => 
        doctor.consultation_type === consultationType ||
        (consultationType === "Both" && 
          (doctor.consultation_type === "Video Consult" || 
           doctor.consultation_type === "In Clinic"))
      );
    }

    // Apply specialty filter
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        doctor.specialty.some((spec) => selectedSpecialties.includes(spec))
      );
    }

    // Apply sorting - fixed to compare string values
    if (sortBy === "fees") {
      filtered.sort((a, b) => {
        // Extract numeric values from fee strings (remove currency symbols, spaces, etc.)
        const feeA = parseFloat(a.fees.replace(/[^0-9.]/g, '')) || 0;
        const feeB = parseFloat(b.fees.replace(/[^0-9.]/g, '')) || 0;
        return feeA - feeB;
      });
    } else if (sortBy === "experience") {
      filtered.sort((a, b) => {
        // Extract numeric experience values if possible
        const expA = parseInt(a.experience.match(/\d+/)?.[0] || "0", 10);
        const expB = parseInt(b.experience.match(/\d+/)?.[0] || "0", 10);
        return expB - expA; // Higher experience first
      });
    }

    setFilteredDoctors(filtered);

    // Update URL params
    const params = new URLSearchParams();
    if (searchTerm) params.set("name", searchTerm);
    if (consultationType) params.set("consultation", consultationType);
    if (selectedSpecialties.length > 0)
      params.set("specialties", selectedSpecialties.join(","));
    if (sortBy) params.set("sort", sortBy);

    setSearchParams(params, { replace: true });
  }, [allDoctors, searchTerm, consultationType, selectedSpecialties, sortBy, setSearchParams]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-700 shadow-sm py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Find a Doctor
          </h1>
          <SearchBar
            doctors={allDoctors}
            onSearch={handleSearch}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-80 lg:w-72 flex-shrink-0">
            <FilterPanel
              specialties={allSpecialties}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onSpecialtyChange={setSelectedSpecialties}
              onConsultationChange={setConsultationType}
              onSortChange={setSortBy}
            />
          </div>

          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading doctors...</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-800">
                    {filteredDoctors.length} Doctors found
                  </h2>
                </div>
                <DoctorList doctors={filteredDoctors} />
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
