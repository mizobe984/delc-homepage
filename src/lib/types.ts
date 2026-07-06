export type SideMenuParams = {
  companyName: string
  pageTitle: string
  pageTitleRuby: string
  tabTitle: string
  menuTitle: string
  menus: { url: string; text: string }[]
  showMenu: boolean
  mainBlockSize: number
  anchor: boolean
  destinationURLs: { url: string; ruby: string }[]
}
