const InfoSection = ({ title, content}) => {
    return (
      <section className="mb-8">
        <blockquote className="border-l-4 border-blue-500 pl-4 italic">
          <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        </blockquote>
        <p className="text-justify">{content}</p>
      </section>
    );
};

export default InfoSection;