import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Component } from "react";

interface AddressCardProps {
  name: string;
  phone: string;
  address: {
    province: string;
    regency: string;
    district: string;
    village: string;
    street: string;
    detail: string;
  };
  onChangeAddress?: () => void;
  buttonTag?: Component;
}

export default function CardAddress({
  name,
  phone,
  address,
  onChangeAddress,
  buttonTag,
}: AddressCardProps) {
  return (
    <Card className="w-full max-w-md border-2 border-blue-500">
      <CardContent className="pt-6 space-y-4">
        <div>
          <h3 className="font-bold text-2xl">{name}</h3>
          <p className="text-gray-600">{phone}</p>
        </div>
        <div className="space-y-1">
          <p>{address.village}</p>
          <p>{address.district}</p>
          <p>{address.regency}</p>
          <p>{address.province}</p>
          <p>{address.street}</p>
          {address.detail && <p>{address.detail}</p>}
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full border-2  hover:bg-blue-50"
          onClick={onChangeAddress}
        >
          {buttonTag}
        </Button>
      </CardFooter>
    </Card>
  );
}
