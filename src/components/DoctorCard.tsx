import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building, Video, Hospital, Globe, Clock, Award } from "lucide-react";
import { useState } from "react";
import AppointmentDialog from "./AppointmentDialog";

interface DoctorProps {
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

const DoctorCard = ({
  name,
  specialty,
  experience,
  fees,
  photo,
  doctor_introduction,
  languages,
  clinic,
  video_consult,
  in_clinic
}: DoctorProps) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const specialties = specialty || [];
  const doctorImg = photo || "https://via.placeholder.com/150";
  const clinicName = clinic?.name || "Clinic information unavailable";
  const clinicLocality = clinic?.address?.locality || "";
  const clinicCity = clinic?.address?.city || "";
  const clinicAddress = clinic?.address?.address_line1 || "";
  const doctorLanguages = languages || [];

  return (
    <>
      <Card 
        data-testid="doctor-card" 
        className="overflow-hidden border rounded-xl shadow-sm hover:shadow-md transition-all duration-200 bg-white w-full"
      >
        <div className="p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <img 
                src={doctorImg} 
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-100"
              />
            </div>
            
            <div className="flex-1">
              <h3 
                data-testid="doctor-name" 
                className="text-xl font-semibold text-gray-900"
              >
                {name}
              </h3>
              
              <div data-testid="doctor-specialty" className="mt-1 flex flex-wrap gap-1">
                {specialties.map((spec, index) => (
                  <Badge 
                    key={index} 
                    variant="outline" 
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>

              <div data-testid="doctor-experience" className="text-gray-600 mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{experience}</span>
              </div>

              {doctor_introduction && (
                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {doctor_introduction}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-start gap-2">
              <Building className="w-5 h-5 text-gray-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900">{clinicName}</p>
                <p className="text-sm text-gray-600">
                  {clinicLocality}{clinicLocality && clinicCity ? ", " : ""}{clinicCity}
                </p>
              </div>
            </div>
            
            {clinicAddress && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-600">{clinicAddress}</p>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Consultation Available:</p>
              <div className="flex gap-2">
                {video_consult && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Video className="w-3 h-3" />
                    Video Consult
                  </Badge>
                )}
                {in_clinic && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Hospital className="w-3 h-3" />
                    In Clinic
                  </Badge>
                )}
              </div>
            </div>

            {doctorLanguages && doctorLanguages.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-700">Languages:</p>
                <div className="flex gap-2">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="w-3 h-3" />
                    {doctorLanguages.join(", ")}
                  </Badge>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p data-testid="doctor-fee" className="text-lg font-semibold text-gray-900">{fees}</p>
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6"
              onClick={() => setIsBookingOpen(true)}
            >
              Book Appointment
            </Button>
          </div>
        </div>
      </Card>

      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        doctorName={name}
        clinicName={clinic?.name || ""}
      />
    </>
  );
};

export default DoctorCard;
