import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Clock } from "lucide-react";

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctorName: string;
  clinicName: string;
}

interface AppointmentForm {
  name: string;
  phone: string;
  email: string;
}

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
];

const AppointmentDialog = ({ isOpen, onClose, doctorName, clinicName }: AppointmentDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const form = useForm<AppointmentForm>();

  const handleSubmit = (data: AppointmentForm) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select date and time for your appointment");
      return;
    }

    // Here you would typically make an API call to book the appointment
    toast.success("Appointment booked successfully!", {
      description: `Your appointment with ${doctorName} is scheduled for ${selectedDate.toLocaleDateString()} at ${selectedTime}`
    });
    onClose();
    form.reset();
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Book Appointment</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6 py-4">
          <div>
            <h3 className="font-medium mb-2">{doctorName}</h3>
            <p className="text-sm text-gray-500">{clinicName}</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input required placeholder="Enter your name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          required 
                          type="tel" 
                          placeholder="Enter your phone number"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          required 
                          type="email" 
                          placeholder="Enter your email"
                          {...field} 
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <FormLabel>Select Date</FormLabel>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date() || date.getDay() === 0}
                  />
                </div>

                {selectedDate && (
                  <div>
                    <FormLabel>Select Time</FormLabel>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          type="button"
                          variant={selectedTime === time ? "default" : "outline"}
                          className="flex items-center gap-2"
                          onClick={() => setSelectedTime(time)}
                        >
                          <Clock className="w-4 h-4" />
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppointmentDialog;