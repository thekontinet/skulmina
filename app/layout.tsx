import clsx from 'clsx'
import './globals.css'
import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'

const font = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Skulmina',
  description: 'School Management App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={clsx([font.className, 'bg-secondary text-foreground dark'])}>{children}</body>
    </html>
  )
}
