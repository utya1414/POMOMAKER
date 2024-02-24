import React, { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/components/shadcn-ui/alert-dialog";
import { Button } from "@/lib/components/shadcn-ui/button";

import { RiDeleteBin6Line } from "react-icons/ri";

import { useToast } from "../shadcn-ui/use-toast";
import { DeleteTimer } from "@/api/timer";

const DeleteTimerBtn = ({ timer_id }) => {
  return (
    <div>
      <DeleteTimerDialog timer_id={timer_id} />
    </div>
  );
};

const DeleteTimerDialog = ({ timer_id }) => {
  const { toast } = useToast();
  const onClickHandler = () => {
    DeleteTimer(timer_id);
    toast({
      status: "success",
      description: (
        <>
          <p className="text-green-500 font-bold">タイマーを削除しました</p>
        </>
      ),
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="font-semibold space-x-2 w-24 h-12">
          <RiDeleteBin6Line />
          <span>削除</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ポモドーロタイマー削除画面</AlertDialogTitle>
          <AlertDialogDescription>本当に削除しますか？</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>戻る</AlertDialogCancel>
          <AlertDialogAction onClick={onClickHandler}>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTimerBtn;
