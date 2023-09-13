export default function SectionWrapper({ className, backGround, content }) {
  return (
    <section className={className}>
      <div className="section-border">
        <div className="section-background">{backGround}</div>
      </div>
      <div className="section-content-wrapper">
        <div className="section-content">{content}</div>
      </div>
    </section>
  );
}
