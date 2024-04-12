"use client";

interface HeadingProps {
  title: string;
  description: string;
}

function Heading(props: HeadingProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-4xl">{props.title}</h2>
      <p className="text-muted-foreground">{props.description}</p>
    </div>
  );
}

export default Heading;
