/**
 * サイト全体のナビゲーション定義(単一情報源)。
 * ページの追加・改名・削除時はこのファイルだけを更新する。
 */

export type MenuItem = { url: string; text: string }
export type BreadcrumbItem = { url: string; ruby: string }
export type ServiceLink = { title: string; description: string; url: string }

/** 会社情報セクションの下層ページ(サイドメニュー・ヘッダープルダウン共通) */
export const companyMenus: MenuItem[] = [
  { url: 'company', text: '会社概要' },
  { url: 'location', text: '所在地' },
  { url: 'history', text: '沿革' },
]

/** 事業案内ページのサイドメニュー(ページ内アンカー) */
export const serviceMenus: MenuItem[] = [
  { url: 'debug', text: 'デバッグ事業' },
  { url: 'ses', text: 'SES事業' },
]

/** 事業の一覧(トップページのカード・ヘッダープルダウン) */
export const serviceLinks: ServiceLink[] = [
  {
    title: 'デバッグサービス事業',
    description: 'Testify Solutions',
    url: '/services/#debug',
  },
  {
    title: 'SES事業',
    description: 'TechTalent Hub',
    url: '/services/#ses',
  },
]

/** パンくず(BreadCrumb)のページ別定義 */
const companyRoot: BreadcrumbItem = { url: 'company', ruby: '会社情報' }

export const breadcrumbs: Record<string, BreadcrumbItem[]> = {
  company: [companyRoot, { url: 'company', ruby: '会社概要' }],
  location: [companyRoot, { url: 'location', ruby: '所在地' }],
  history: [companyRoot, { url: 'history', ruby: '沿革' }],
  services: [{ url: 'services', ruby: 'サービス' }],
  recruit: [{ url: 'recruit', ruby: '求人情報' }],
  contact: [{ url: 'contact', ruby: 'お問い合わせ' }],
  privacyPolicy: [{ url: 'privacyPolicy', ruby: 'プライバシーポリシー' }],
}
