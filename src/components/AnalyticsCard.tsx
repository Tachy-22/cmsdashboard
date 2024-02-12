import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { DollarSign } from "lucide-react";
import { textStyle } from "@/lib/twStyles";

const AnalyticsCard = () => {
  return (
    <Card
      className={`  ${textStyle} max-h-[12rem] shadow-none drop-shadow-none border-0none`}
    >
      <CardHeader className="flex gap-3">
        <DollarSign className={textStyle} />
        <div className="flex flex-col">
          <p className="text-md">Frame 1</p>
          <p className="text-small text-default-500">template</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>These are modern beatiful components, just a template lol </p>
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
