import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn-ui/dialog";

import { Input } from "../shadcn-ui/input";
import { Textarea } from "../shadcn-ui/textarea";
import { Button } from "../shadcn-ui/button";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteTimerBtn = ({ timer_id }) => {
  return (
    <div>
      <EditTimerDialog timer_id={timer_id} />
    </div>
  );
};

const EditTimerDialog = ({ timer_id }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="font-semibold space-x-2 w-24 h-12">
          <RiDeleteBin6Line />
          <span>削除</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>ポモドーロタイマー編集画面</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteTimerBtn;
