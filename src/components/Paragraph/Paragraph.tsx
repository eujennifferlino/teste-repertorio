interface ParagraphProps {
  content: string;
  id: string;
}

const Paragraph = ({ content }: ParagraphProps) => {
  return (
    <p className="paragraph">
      {content}
    </p>
  );
};

export default Paragraph; 