/**
 * 備忘録: このファイルは、お問い合わせフォームを提供するコンポーネントです。
 *
 * このファイルは、以下のコンポーネントを提供します。
 * - ContactForm
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
  Form as BaseForm,
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
const validations = {
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
  const FormSchema = z.object(validations)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: ((obj) => {
      for (const key in validations) {
        obj[key] = ''
      }
      return obj
    })({}),
  })

  const [isDisabled, setDisabled] = useState(false)

  async function onSubmit(formData: z.infer<typeof FormSchema>) {
    const userId = import.meta.env.PUBLIC_EMAILJS_USER_ID
    const serviceId = import.meta.env.PUBLIC_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID

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
          '申し訳ございません。しばらく経ってから再度お問い合わせください',
        variant: 'destructive',
      })
    }
    setDisabled(false)
  }

  return (
    <BaseForm {...form}>
      <form className="w-2/3 space-y-6 mt-16 mb-32">
        {formUnit('company', '会社名')}
        <div className="flex gap-3">
          {formUnit('lastname', '姓')}
          {formUnit('firstname', '名')}
        </div>
        {formUnit('email', 'Eメール')}
        {formUnit('phone', '電話番号')}
        {formUnit('url', 'ウェブサイトURL')}
        {formUnit('message', 'お問い合わせ内容')}
        <div className="pt-8">
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            disabled={isDisabled}
          >
            送信 send
          </Button>
        </div>
      </form>
    </BaseForm>
  )

  function formUnit(name: keyof typeof validations, label: string) {
    const mandatory =
      name === 'url' ? '' : "after:content-['*'] after:text-destructive"
    const FormComponent = name === 'message' ? Textarea : Input
    return (
      <FormField
        disabled={isDisabled}
        control={form.control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              <div className={mandatory}>{label}</div>
            </FormLabel>
            <FormControl>
              <FormComponent {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    )
  }
}
