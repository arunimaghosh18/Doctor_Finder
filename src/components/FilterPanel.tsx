
import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string | null;
  sortBy: string | null;
  onSpecialtyChange: (specialties: string[]) => void;
  onConsultationChange: (type: string | null) => void;
  onSortChange: (sort: string | null) => void;
}

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationChange,
  onSortChange,
}: FilterPanelProps) => {
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      onSpecialtyChange(selectedSpecialties.filter((s) => s !== specialty));
    } else {
      onSpecialtyChange([...selectedSpecialties, specialty]);
    }
  };

  const clearAllFilters = () => {
    onSpecialtyChange([]);
    onConsultationChange(null);
    onSortChange(null);
  };

  // Function to convert specialty name to test ID format
  const getSpecialtyTestId = (specialty: string) => {
    // Replace spaces with hyphens and handle special characters
    return `filter-specialty-${specialty.replace(/\s+/g, '-').replace(/[\/&]/g, '-')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-lg text-gray-900">Filters</h2>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-800 text-sm" 
          onClick={clearAllFilters}
        >
          Clear All
        </Button>
      </div>
    
      {/* Consultation Type Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-moc" 
          className="font-medium text-lg mb-3 text-gray-900"
        >
          Consultation Mode
        </h3>
        <RadioGroup
          value={consultationType || ""}
          onValueChange={(value) => onConsultationChange(value || null)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              data-testid="filter-video-consult" 
              value="Video Consult" 
              id="video-consult" 
            />
            <Label htmlFor="video-consult">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              data-testid="filter-in-clinic" 
              value="In Clinic" 
              id="in-clinic" 
            />
            <Label htmlFor="in-clinic">In Clinic</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Specialty Filter */}
      <div className="mb-6">
        <h3 
          data-testid="filter-header-speciality" 
          className="font-medium text-lg mb-3 text-gray-900"
        >
          Speciality
        </h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={specialty}
                data-testid={getSpecialtyTestId(specialty)}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={() => handleSpecialtyChange(specialty)}
              />
              <Label htmlFor={specialty} className="text-sm">
                {specialty}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 
          data-testid="filter-header-sort" 
          className="font-medium text-lg mb-3 text-gray-900"
        >
          Sort
        </h3>
        <RadioGroup
          value={sortBy || ""}
          onValueChange={(value) => onSortChange(value || null)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              data-testid="sort-fees" 
              value="fees" 
              id="fees" 
            />
            <Label htmlFor="fees">Fees (Ascending)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem 
              data-testid="sort-experience" 
              value="experience" 
              id="experience" 
            />
            <Label htmlFor="experience">Experience (Descending)</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterPanel;
