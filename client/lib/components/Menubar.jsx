"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./shadcn-ui/dialog";

import {
  Form,
  FormDescription,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./shadcn-ui/form";

import { Input } from "./shadcn-ui/input";
import { Textarea } from "./shadcn-ui/textarea";
import { Slider } from "./shadcn-ui/slider";
import { Button } from "./shadcn-ui/button";
import { Switch } from "./shadcn-ui/switch";
import { Separator } from "./shadcn-ui/separator";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "./shadcn-ui/use-toast";
import { CreateTimer } from "@/api/timer";

// zod による form のバリデーション
const formSchema = z.object({
  timer_name: z
    .string()
    .min(1, { message: "1文字以上で入力してください" })
    .max(50, { message: "50文字以内で入力してください" }),
  timer_description: z
    .string()
    .max(200, { message: "200文字以内で入力してください" })
    .nullable(),
  work_length: z.number().min(1).max(60),
  break_length: z.number().min(1).max(60),
  rounds: z.number().min(1).max(10),
  work_sound_source: z.string().nullable(),
  break_sound_source: z.string().nullable(),
  isPublic: z.boolean(),
});

const formProps = {
  timer_name: {
    name: "timer_name",
    label: "Timer Name",
    placeholder: "Timer Name",
    type: "text",
    description: "タイマー名を入力してください",
  },
  timer_description: {
    name: "timer_description",
    label: "Timer Description",
    placeholder: "Timer Description",
    type: "text",
    description: "タイマーの説明を入力してください",
  },
  work_length: {
    name: "work_length",
    label: "Work Length",
    placeholder: "Work Length",
    type: "number",
    description: "作業時間を設定してください",
  },
  break_length: {
    name: "break_length",
    label: "Break Length",
    placeholder: "Break Length",
    type: "number",
    description: "休憩時間を設定してください",
  },
  rounds: {
    name: "rounds",
    label: "Rounds",
    placeholder: "Rounds",
    type: "number",
    description: "ラウンド数を設定してください",
  },
  work_sound_source: {
    name: "work_sound_source",
    label: "Work Sound Source",
    placeholder: "Work Sound Source",
    type: "text",
    description: "作業中の音源を設定してください",
  },
  break_sound_source: {
    name: "break_sound_source",
    label: "Break Sound Source",
    placeholder: "Break Sound Source",
    type: "text",
    description: "休憩中の音源を設定してください",
  },
  isPublic: {
    name: "isPublic",
    label: "Public",
    description: "公開するかどうかを設定してください",
  },
};

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
        <Button variant="outline" className="font-semibold">
          新規作成
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

const CreateTimerForm = ({ setOpen }) => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      timer_name: "",
      timer_description: "",
      work_length: 25,
      break_length: 5,
      rounds: 4,
      work_sound_source: "",
      break_sound_source: "",
      isPublic: false,
    },
  });

  const onSubmit = (data) => {
    CreateTimer(data);
    setOpen(false);
    toast({
      status: "success",
      description: (
        <>
          <p className="text-green-500 font-bold">タイマーを作成しました</p>
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        </>
      ),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <InputForm form={form} {...formProps.timer_name} />
        <TextareaForm form={form} {...formProps.timer_description} />
        <div className="flex space-x-8">
          <InputForm form={form} {...formProps.work_length} />
          <InputForm form={form} {...formProps.break_length} />
        </div>
        <div className="flex space-x-8">
          <InputForm form={form} {...formProps.work_sound_source} />
          <InputForm form={form} {...formProps.break_sound_source} />
        </div>
        <InputForm form={form} {...formProps.rounds} />
        <SwitchForm form={form} {...formProps.isPublic} />
        <Button type="submit">作成</Button>
      </form>
    </Form>
  );
};
const InputForm = ({ form, name, label, placeholder, type, description }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const TextareaForm = ({
  form,
  name,
  label,
  placeholder,
  type,
  description,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} {...field} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SwitchForm = ({ form, name, label, description }) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Menubar;
