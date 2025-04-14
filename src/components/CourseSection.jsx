// src/components/CourseSection.jsx
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import CourseCard from "./CourseCard";

function CourseSection({ title, courses, type }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
  });

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className="py-8 w-full">
      <div className="mx-auto px-4 max-w-7xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

        <div className="relative">
          {/* Embla Carousel Container */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-2">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex-0 shrink-0 grow-0 min-w-[280px] sm:min-w-[300px] md:min-w-[320px] lg:min-w-[340px]"
                >
                  <CourseCard course={course} type={type} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 z-10"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 z-10"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseSection;
