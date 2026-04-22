import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  // Use 'local' in development, and 'github' for production
  storage: {
    kind: 'local',
  },
  collections: {
    news: collection({
      label: 'News & Announcements',
      slugField: 'title',
      path: 'src/content/news/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        date: fields.date({ label: 'Date' }),
        image: fields.image({
          label: 'Cover Image (Optional)',
          directory: 'public/images/news',
          publicPath: '/images/news',
        }),
        content: fields.text({ label: 'Content', multiline: true }),
        isFeatured: fields.checkbox({ label: 'Feature on Homepage?', defaultValue: false }),
      },
    }),
    loanRates: collection({
      label: 'Loan Rates',
      slugField: 'title',
      path: 'src/content/loanRates/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Loan Type (e.g., Gold Loan)' } }),
        rate: fields.text({ label: 'Interest Rate' }),
        description: fields.text({ label: 'Short Description' }),
        backgroundImage: fields.image({
          label: 'Card Background Image (Optional)',
          description: 'Upload an image to replace the solid color background.',
          directory: 'public/images/loans',
          publicPath: '/images/loans',
        }),
        icon: fields.select({
          label: 'Icon (Fallback if no image is used)',
          options: [
            { label: 'Gold', value: 'Coins' },
            { label: 'Home', value: 'Home' },
            { label: 'Business', value: 'Briefcase' },
            { label: 'Tractor', value: 'Tractor' },
            { label: 'Student', value: 'GraduationCap' },
            { label: 'General', value: 'BadgePercent' },
          ],
          defaultValue: 'BadgePercent',
        }),
      },
    }),
    depositRates: collection({
      label: 'Deposit Rates',
      slugField: 'title',
      path: 'src/content/depositRates/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Deposit Type (e.g., Fixed Deposit)' } }),
        rate: fields.text({ label: 'Interest Rate' }),
        duration: fields.text({ label: 'Duration/Lock-in period' }),
        backgroundImage: fields.image({
          label: 'Card Background Image (Optional)',
          directory: 'public/images/deposits',
          publicPath: '/images/deposits',
        }),
      },
    }),
    photoGallery: collection({
      label: 'Photo Gallery',
      slugField: 'title',
      path: 'src/content/photoGallery/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Album/Photo Title' } }),
        date: fields.date({ label: 'Date' }),
        image: fields.image({
          label: 'Main Image',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery',
        }),
      },
    }),
    videoGallery: collection({
      label: 'Video Gallery',
      slugField: 'title',
      path: 'src/content/videoGallery/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Video Title' } }),
        videoUrl: fields.text({ 
          label: 'YouTube Embed Link or MP4 URL',
          description: 'Example: https://www.youtube.com/embed/xxxxx'
        }),
      },
    }),
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage Design',
      path: 'src/content/homepage',
      format: { data: 'json' },
      schema: {
        heroImages: fields.array(fields.image({
          label: 'Hero Background Image',
          directory: 'public/images/hero',
          publicPath: '/images/hero',
        }), {
          label: 'Hero Image Carousel',
          itemLabel: props => props.value ? `Image selected` : 'Please select an image',
        }),
        heroVideoUrl: fields.text({ 
          label: 'Alternative Hero Video URL (Optional)',
          description: 'If you want a video background instead of images, paste the MP4 URL here.'
        }),
      }
    }),
    about: singleton({
      label: 'About Us Page',
      path: 'src/content/about',
      format: { data: 'json' },
      schema: {
        heroTitle: fields.text({ label: 'Hero Title', defaultValue: 'Our Legacy' }),
        heroSubtitle: fields.text({ label: 'Hero Subtitle', defaultValue: 'Nattika Service Cooperative Bank' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/images/about',
          publicPath: '/images/about',
        }),
        stats: fields.object({
          deposits: fields.text({ label: 'Total Deposits', defaultValue: '₹480+ Cr' }),
          loans: fields.text({ label: 'Total Loans Given', defaultValue: '₹350+ Cr' }),
          capital: fields.text({ label: 'Working Capital', defaultValue: '₹550+ Cr' }),
          members: fields.text({ label: 'Total Members', defaultValue: '25,000+' }),
        }, { label: 'Bank Statistics' }),
        history: fields.text({ label: 'Bank History (Story)', multiline: true }),
        mission: fields.text({ label: 'Our Mission', multiline: true }),
        vision: fields.text({ label: 'Our Vision', multiline: true }),
        board: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            designation: fields.text({ label: 'Designation' }),
            image: fields.image({
              label: 'Photo',
              directory: 'public/images/board',
              publicPath: '/images/board',
            }),
          }),
          {
            label: 'Board of Directors',
            itemLabel: props => props.fields.name.value || 'New Director',
          }
        ),
        staff: fields.array(
          fields.object({
            name: fields.text({ label: 'Name' }),
            designation: fields.text({ label: 'Designation' }),
            image: fields.image({
              label: 'Photo',
              directory: 'public/images/staff',
              publicPath: '/images/staff',
            }),
          }),
          {
            label: 'Bank Staff',
            itemLabel: props => props.fields.name.value || 'New Staff Member',
          }
        ),
      }
    }),
    settings: singleton({
      label: 'Bank Settings',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        marqueeText: fields.text({ label: 'Live Ticker / Marquee Text' }),
        workingHours: fields.text({ label: 'Working Hours' }),
        phoneNumber: fields.text({ label: 'Primary Phone Number' }),
      },
    }),
  },
});
