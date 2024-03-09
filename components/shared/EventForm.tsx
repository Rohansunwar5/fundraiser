"use client"

import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import { eventDefaultValues } from '@/constants'
import Dropdown from './Dropdown'
import { Textarea } from '../ui/textarea'
import FileUploader from './FileUploader'
import Image from 'next/image'


type EventFormProps = {
  userId: string
  type: "Create" | "Update"
  // event?: IEvent,
  // eventId?: string
}

const EventForm = ({ userId, type,  }: EventFormProps) => {
  const [files, setFiles] = useState<File[]>([])
  const initialValues = eventDefaultValues;
    const form = useForm<z.infer<typeof eventFormSchema>>({
      resolver: zodResolver(eventFormSchema),
      defaultValues: initialValues
    })
    


  function onSubmit(values: z.infer<typeof eventFormSchema>){
    console.log(values);
    
  }

  return (
    <Form {...form}> 
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="Event title" {...field} className="input-field" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="categoryId"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Dropdown onChangeHandler={field.onChange} value={field.value} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
              <Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="imageUrl"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="h-72">
              <FileUploader 
                onFieldChange={field.onChange}
                imageUrl={field.value}
                setFiles={setFiles}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      </div>
      
      <div className="flex flex-col gap-5 md:flex-row">
      <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                      <Image
                        src="/assets/icons/location-grey.svg"
                        alt="calendar"
                        width={24}
                        height={24}
                      />

                      <Input placeholder="Event location or Online" {...field} className="input-field" />
                    </div>

                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
      </div>

      </form>
    </Form>
  )
}

export default EventForm