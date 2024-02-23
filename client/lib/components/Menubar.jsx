"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn-ui/dialog";

import { Separator } from "./shadcn-ui/separator";
import { Button } from "./shadcn-ui/button";
import { IoCreateOutline } from "react-icons/io5";
import CreateTimerForm from "./timer/CreateTimerForm";

const Menubar = () => {
  return (
    <>
      <nav className="flex justify-between py-3 px-12">
        <p></p>
        <div className="">
          <CreateTimerButtonDialog />
        </div>
      </nav>
      <Separator />
    </>
  );
};

const CreateTimerButtonDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold space-x-2">
          <IoCreateOutline />
          <p>新規作成</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>ポモドーロタイマー作成画面</DialogTitle>
        </DialogHeader>
        <CreateTimerForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default Menubar;
