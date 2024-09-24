import { Inter, Poppins, Style_Script, Pixelify_Sans} from 'next/font/google';
 
export const interFont = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})
 
export const poppinsFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
})

export const stylex = Style_Script({
  weight: [ '400'],
  subsets: ['latin'],
  
})

export const pixelify = Pixelify_Sans({
  weight: ['400', '500', '600'],
  subsets: ['latin']
})
   

    