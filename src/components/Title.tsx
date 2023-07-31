import { FC } from "react";

type Props = {
  title: string;
};

export const Title: FC<Props> = ({ title }) => {
  return <div className="flex mx-auto pt-32 text-3xl font-bold">{title}</div>;
};
