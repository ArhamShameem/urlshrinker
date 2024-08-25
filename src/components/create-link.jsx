import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UrlState } from "@/context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import Error from "./error";


const createLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const longlink = searchParams.get("createNew");
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
        </DialogHeader>
        <Input id="title" placeholder="Short Link's Title"/>
        {/* <Error message={"some error"}/> */}
        <Input id="title" placeholder="Enter your Long Url"/>
        {/* <Error message={"some error"}/> */}
        <Card className="p-2">trimrr.in</Card>/
        <Input id="title" placeholder="Custom Link (optional)"/>
        {/* <Error message={"some error"}/> */}
      </DialogContent>
    </Dialog>
  );
};

export default createLink;
