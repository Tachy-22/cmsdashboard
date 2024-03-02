import React from "react";
import AddTestimonialModal from "../AddTestimonialModal";
import TestimonialTable from "../TestimonialTable";

const Testimonial = () => {
  return (
    <div className="flex gap-4 flex-col">
      <AddTestimonialModal />
      <TestimonialTable />
    </div>
  );
};

export default Testimonial;
