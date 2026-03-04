import type { CoursePart } from "../types";
import Part from "./Part";

type ContentProps = {
  courseParts: CoursePart[];
};

const Content = ({ courseParts }: ContentProps) => {
  return (
    <div>
      {courseParts.map((coursePart, index) => (
        <Part key={index} coursePart={coursePart} />
      ))}
    </div>
  );
};

export default Content;
