-- Seed the project archive with Adil's shipped work.
-- Safe to run more than once: rows are upserted on slug.

insert into public.projects
  (slug, title, summary, tech_stack, image_path, repo_url, live_url, featured, sort_order, year)
values
  (
    'playport',
    'PlayPort',
    'A video sharing platform built with React, Express, Node.js, and MongoDB.',
    array['React', 'Express.js', 'Node.js', 'MongoDB'],
    '/projects/playport.jpg',
    'https://github.com/adil-khursheed/playport',
    'https://playport.vercel.app',
    true,
    1,
    2024
  ),
  (
    'disney-plus-clone',
    'Disney+ Clone',
    'A Disney+ interface rebuilt with React, Redux, styled-components, and Firebase.',
    array['React', 'Redux', 'Styled Components', 'Firebase'],
    '/projects/disney-plus-clone.jpg',
    'https://github.com/adil-khursheed/disney-plus-clone',
    'https://disneyplusclone-d0c28.web.app/',
    true,
    2,
    2023
  ),
  (
    'little-lemon',
    'Little Lemon',
    'A landing page for the Little Lemon Mediterranean restaurant, built with React.',
    array['React', 'JavaScript'],
    '/projects/little-lemon.jpg',
    'https://github.com/adil-khursheed/little-lemon',
    'https://little-lemon-tau.vercel.app/',
    true,
    3,
    2023
  ),
  (
    'product-page',
    'E-commerce Product Page',
    'An e-commerce product page built with React.',
    array['React', 'JavaScript'],
    '/projects/product-page.jpg',
    'https://github.com/adil-khursheed/product-page',
    'https://product-page-blue.vercel.app/',
    false,
    4,
    2023
  ),
  (
    'calculator',
    'Calculator',
    'A calculator built with HTML, CSS, and JavaScript.',
    array['HTML', 'CSS', 'JavaScript'],
    '/projects/calculator.jpg',
    'https://github.com/adil-khursheed/calculator',
    'https://calculator-roan-ten.vercel.app/',
    false,
    5,
    2023
  ),
  (
    'tip-calculator',
    'Tip Calculator',
    'A tip splitter built with HTML, CSS, and vanilla JavaScript.',
    array['HTML', 'CSS', 'JavaScript'],
    '/projects/tip-calculator.jpg',
    'https://github.com/adil-khursheed/tip-calculator',
    'https://tip-calculator-ten-sepia.vercel.app/',
    false,
    6,
    2023
  ),
  (
    'sign-up-form',
    'Sign Up Form',
    'An intro component with a sign-up form, built with HTML, CSS, and vanilla JavaScript.',
    array['HTML', 'CSS', 'JavaScript'],
    '/projects/sign-up-form.jpg',
    'https://github.com/adil-khursheed/sign-up-form',
    'https://sign-up-form-jade.vercel.app/',
    false,
    7,
    2022
  ),
  (
    'news-homepage',
    'News Homepage',
    'A news homepage built with HTML, CSS, and JavaScript.',
    array['HTML', 'CSS', 'JavaScript'],
    '/projects/news-homepage.jpg',
    'https://github.com/adil-khursheed/news-homepage',
    'https://news-homepage-beta.vercel.app/',
    false,
    8,
    2022
  ),
  (
    'notifications-page',
    'Notifications Page',
    'A notifications page built with HTML, CSS, and vanilla JavaScript.',
    array['HTML', 'CSS', 'JavaScript'],
    '/projects/notifications-page.jpg',
    'https://github.com/adil-khursheed/notifications-page',
    'https://notifications-page-sigma.vercel.app/',
    false,
    9,
    2022
  ),
  (
    'testimonials-grid-section',
    'Testimonial Page',
    'A testimonial grid built with HTML and CSS.',
    array['HTML', 'CSS'],
    '/projects/testimonials-grid-section.jpg',
    'https://github.com/adil-khursheed/Testimonials-grid-section',
    'https://testimonials-grid-section-pi.vercel.app/',
    false,
    10,
    2022
  )
on conflict (slug) do update set
  title = excluded.title,
  summary = excluded.summary,
  tech_stack = excluded.tech_stack,
  image_path = excluded.image_path,
  repo_url = excluded.repo_url,
  live_url = excluded.live_url,
  featured = excluded.featured,
  sort_order = excluded.sort_order,
  year = excluded.year,
  updated_at = now();
