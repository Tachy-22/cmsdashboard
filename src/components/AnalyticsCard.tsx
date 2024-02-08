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
          <p className="text-md">NextUI</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
};

export default AnalyticsCard;
