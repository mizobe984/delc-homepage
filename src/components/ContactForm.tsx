/**
 * 備忘録: このファイルは、お問い合わせフォームを提供するコンポーネントです。
 *
 * このファイルは、以下のコンポーネントを提供します。
 * - ContactForm <- ベタ打ち (フォームのスタイリングにtailwindcssが上手く利かず)
 *
 * このファイルは、以下のファイルからインポートされます。
 * - src/pages/contact.astro
 *
 * このファイルは、以下のライブラリを使用します。
 * - @emailjs/browser <- EmailJSを使用してメール送信 別途アカウント登録が必要(月200件まで無料)
 *                      https://dashboard.emailjs.com/admin
 *                      登録情報は.envファイルに記載してください
 *                      https://docs.astro.build/ja/guides/environment-variables/
 *                      静的サイトでビルドする場合は、API_ROUTEにfetchしてサーバー側でメール送信できないため、EmailJSを使用しています。
 * - react-hook-form
 * - zod
 * - @hookform/resolvers/zod
 * - @components/ui/form <- shadcn-uiで生成 zodとreact-hook-formを使ってフォーム構築
 * - @components/ui/input <- shadcn-uiで生成
 * - @components/ui/textarea <- shadcn-uiで生成
 * - @components/ui/use-toast <- shadcn-uiで生成 Toast通知 別途Toasterをレイアウトに組み込む
 * - @components/ui/button <- shadcn-uiで生成　onClickイベントを使用(onSubmit) Enterキーで送信できないようにするため
 * 
 */
'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'
import { init, send } from '@emailjs/browser'
import { useState } from 'react'

const MESSEGE_MAX_LENGTH = 999
const paramSchema = {
  company: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(20, { message: '20文字以内で入力して下さい' }),

  firstname: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(10, { message: '10文字以内で入力して下さい' }),

  lastname: z
    .string()
    .min(1, { message: '必須項目です' })
    .max(10, { message: '10文字以内で入力して下さい' }),

  email: z
    .string()
    .min(1, { message: '必須項目です' })
    .email({ message: '無効なメールアドレスです' }),

  phone: z
    .string()
    .min(1, { message: '必須項目です' })
    .regex(/^\d+$/, { message: '半角数字のみ入力して下さい' })
    .min(10, { message: '10文字以上で入力して下さい' }),

  url: z.string().url({ message: '無効なURLです' }).or(z.literal('')),

  message: z
    .string()
    .min(10, { message: '必須項目です 10文字以上で入力して下さい' })
    .max(MESSEGE_MAX_LENGTH, {
      message: `${MESSEGE_MAX_LENGTH}文字以内で入力して下さい`,
    }),
}

export function ContactForm() {
  const formSchema = z.object(paramSchema)
  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: ((obj) => {
      for (const key in paramSchema) {
        obj[key] = ''
      }
      return obj
    })({}),
  })

  const [isDisabled, setDisabled] = useState(false)

  async function onSubmit(formData: FormData) {

    const {
      PUBLIC_EMAILJS_USER_ID: userId,
      PUBLIC_EMAILJS_SERVICE_ID: serviceId,
      PUBLIC_EMAILJS_TEMPLATE_ID: templateId,
    } = import.meta.env

    if (userId && serviceId && templateId) {
      setDisabled(true)
      init(userId)
      await send(serviceId, templateId, formData)
      toast({
        title: 'お問い合わせ完了',
        description:
          'お問い合わせありがとうございました。 内容を確認後、ご返信致しますので今しばらくお待ちください。',
      })
      form.reset()
    } else {
      toast({
        title: 'エラー',
        description:
          // '申し訳ございません。しばらく経ってから再度お問い合わせください',
          `${userId} ${serviceId} ${templateId}`,
        variant: 'destructive',
      })
    }
    setDisabled(false)
  }

  const mandatoryStyle = 'after:content-["*"] after:text-destructive'

  return (
    <Form {...form}>
      <form className="space-y-6 mt-16 mb-32 w-5/6 ml-8 max-w-[32rem]">

        <FormField disabled={isDisabled} control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className={mandatoryStyle}>会社名</div>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex gap-3">
          <FormField disabled={isDisabled} control={form.control} name="lastname" render={({ field }) => (
            <FormItem className='w-1/2'>
              <FormLabel>
                <div className={mandatoryStyle}>姓</div>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField disabled={isDisabled} control={form.control} name="firstname" render={({ field }) => (
            <FormItem className='w-1/2'>
              <FormLabel>
                <div className={mandatoryStyle}>名</div>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField disabled={isDisabled} control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className={mandatoryStyle}>Eメール</div>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField disabled={isDisabled} control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className={mandatoryStyle}>電話番号</div>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField disabled={isDisabled} control={form.control} name="url" render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div>ウェブサイトURL</div>
            </FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField disabled={isDisabled} control={form.control} name="message" render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className={mandatoryStyle}>お問い合わせ内容</div>
            </FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="pt-8">
          <Button type="button" onClick={form.handleSubmit(onSubmit)} disabled={isDisabled}>
            送信 send
          </Button>
        </div>

      </form>
    </Form>
  )
}
